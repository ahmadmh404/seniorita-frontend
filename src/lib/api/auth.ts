"use server";

import z from "zod";
import { LoginSchema } from "../schema";
// import { client } from "./client";
import { User } from "../types";
import { getCookie, setCookie } from "../cookies-store";
import { redirect } from "next/navigation";
import { client } from "./client";
import { getUserById, getUsers } from "./users";

/**
 * Login server action
 * @param unsafe
 * @param redirectUrl
 * @returns Use object onsuccess and error message on failure
 */
export async function login(
  unsafe: z.infer<typeof LoginSchema>,
  redirectUrl: string | null
) {
  const { data, success } = LoginSchema.safeParse(unsafe);

  if (!success) return { error: "هناك خطأ في البيانات المدخلة " };

  try {
    const response = await fetch(`${process.env.API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const userData = (await response.json()) as { user: User; jwt: string };
    const tokenName = crypto.randomUUID();

    // insert the token into user record
    const { error } = await insertJWT(
      userData.user.id,
      `${tokenName}@${userData.jwt}`
    );
    if (error) return { error };

    // set the admin token to the value returned
    await setCookie(tokenName, `${tokenName}@${userData.jwt}`);

    // redirect the user to dashboard page
  } catch (error) {
    console.log("LOGIN_ERROR: ", error);
    return { error: "حدث خطأ ما, الرجاء المحاولة مرة أخرى" };
  }

  // redirect the user to dashboard page
  redirect(redirectUrl ?? "/dashboard");
}

/**
 *  Insert the token into user admin record
 * @param userId
 * @param jwt
 * @returns error if something went wrong
 */
export async function insertJWT(userId: number, jwt: string) {
  try {
    const user = await getUserById(userId);

    if (user == null) {
      return { error: "حدث خطأ ما أثناء محاولة تسجيل الدهول" };
    }

    await client.collection("users").update(userId, {
      jwt,
    });

    return { error: null };
  } catch (error) {
    console.log("INSERT_JWT_TOKEN_INTO_USER: ", error);
    return { error: "حدث خطأ ما أثناء محاولة تسجيل الدهول" };
  }
}

/**
 * verify admin access via token verification
 * @param token
 * @returns true if valid and false if not
 */
export async function verifyAccess(): Promise<
  { valid: false } | { valid: true; token: string }
> {
  try {
    const user = (await getUsers()).at(0);

    if (user == null || user.jwt == null) {
      return { valid: false };
    }

    const [tokenName, tokenValue] = user.jwt.split("@");
    if (tokenName == null || tokenValue == null) {
      return { valid: false };
    }

    if (
      await getCookie(tokenName).then((value) => {
        return value != null && value === tokenValue;
      })
    ) {
      return { valid: false };
    }

    return { valid: true, token: tokenValue };
  } catch (error) {
    console.log("verify_token_error: ", error);
    return { valid: false };
  }
}
