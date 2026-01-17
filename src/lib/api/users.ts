"use server";

import { User } from "../types";
import { client } from "./client";

// Users API

/**
 * users API Handler
 */
const users = client.collection("users");

/**
 * Get Users
 */

export async function getUsers() {
  const response = await users.find({});

  // @ts-expect-error the data returned from the response is direct data
  return response as User[];
}

/**
 * Get User By ID
 * @param number
 */

export async function getUserById(userId: number) {
  const response = await users.findOne(userId);

  // @ts-expect-error the data returned from the response is direct data
  return response as User;
}

/**
 * Update Use Info
 */

export async function updateUser(userId: number, data: Partial<User>) {
  try {
    await users.update(userId, data);
  } catch (error) {
    console.log("UPDATE_USER_ERROR: ", error);
    return { error: "حدث خطأ أثناء تسجيل الدخول" };
  }
}
