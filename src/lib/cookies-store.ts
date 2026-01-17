import { cookies } from "next/headers";

export async function getCookie(name: string) {
  // define the cookies store
  const cookieStore = await cookies();

  // get the cookie value
  const cookie = cookieStore.get(name);

  // return the cookie value
  return cookie?.value ?? null;
}

export async function setCookie(name: string, value: string) {
  // define the cookies store
  const cookieStore = await cookies();

  // set ehe value to the cookie of the nae
  cookieStore.set(name, value);
}
