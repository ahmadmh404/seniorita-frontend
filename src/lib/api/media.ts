// Media API

import { strapi } from "@strapi/client";
import { verifyAccess } from "./auth";

/**
 * Products API
 */

const API_BASE_URL = process.env.API_URL!;

const authClient = (token: string) => {
  return strapi({ baseURL: API_BASE_URL, auth: token });
};

/**
 * upload media to strapi backend
 * @param file
 * @returns image documentId
 */

export async function uploadMedia(file: File) {
  try {
    const authorized = await verifyAccess();

    if (!authorized.valid) {
      return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
    }
    // upload the file
    const response = await authClient(authorized.token).files.upload(file);
    const image = response.at(0);

    if (image == null) return { error: "حدث خطأ أثناء رفع الصورة" };

    return { id: image.documentId };
  } catch (error) {
    console.log("UPLOAD_FILES_ERROR: ", error);
    return { error: "حدث خطأ أثناء رفع الصورة" };
  }
}

export async function deleteMedia(mediaId: number) {
  try {
    const authorized = await verifyAccess();

    if (!authorized.valid) {
      return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
    }

    await authClient(authorized.token).files.delete(mediaId);

    return { error: null };
  } catch (error) {
    console.log("DELETE_FILES_ERROR: ", error);
    return { error: "حدث خطأ أثناء حذف الصورة" };
  }
}
