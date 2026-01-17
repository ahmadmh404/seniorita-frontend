"use server";

import { strapi } from "@strapi/client";
import { Category, Product, Offer } from "../types";
import {
  getCategoriesTag,
  getCategoryTag,
  getProductsTag,
  getProductTag,
} from "../data-cache";
import { revalidateTag } from "next/cache";
import { getProduct } from "./products";
import { getCategory, getCategoryByName } from "./categories";
import { CategorySchema, OfferSchema, ProductSchema } from "../schema";
import z from "zod";
import { verifyAccess } from "./auth";
import { getOffer, getOfferByTitle, getOffers } from "./offers";
import { redirect } from "next/navigation";
import { deleteMedia, uploadMedia } from "./media";

/**
 * Products API
 */

const API_BASE_URL = process.env.API_URL!;

const authClient = (token: string) => {
  return strapi({ baseURL: API_BASE_URL, auth: token });
};

/**
 * Create New Product
 * @param data which is the newProductSchema type
 * @returns created Product
 */
export async function createProduct({
  unsafe,
  images,
}: {
  unsafe: z.infer<typeof ProductSchema>;
  images: File[];
}) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  const { success, data } = ProductSchema.safeParse(unsafe);

  if (!success) return { error: "هناك خطأ في البيانات المدخلة " };

  const response = await Promise.all(
    images.map(async (image) => {
      return await uploadMedia(image);
    })
  );

  const imagesUploadIds = response.map((response) => response.id);

  console.log("unsafe: ", unsafe);

  if (
    !response.some((res) => res.error != null) &&
    imagesUploadIds.every((id) => id != null)
  ) {
    const { colors, ...productData } = data;
    const productColors = colors?.split(",").map((color) => ({ color }));

    const response = await authClient(authorized.token)
      .collection("products")
      .create({
        ...productData,
        colors: productColors,
        images: imagesUploadIds,
      });

    const product = response.data as Product;

    // revalidate cache
    revalidateTag(getProductsTag(), "max");
    return { product };
  }

  return { error: "فشل رقع المنتج" };
}

/**
 * Update Product
 * @param id
 * @param data
 * @returns updated Product
 */
export async function updateProduct(
  slug: string,
  unsafe: Partial<Omit<Product, "images">>,
  images: File[]
) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  const { success, data } = ProductSchema.safeParse(unsafe);

  if (!success) return { error: "هناك خطأ في البيانات المدخلة " };

  // checking the existence of the product
  const { product: existingProduct } = await getProduct(slug);

  if (existingProduct == null) return { error: "المنتج غير موجود" };

  // Deleting Existing Media files
  if (images.length > 0) {
    existingProduct.images.forEach(async (img) => {
      const existingNames = images.map((i) => i.name);
      if (!existingNames.includes(img.name)) {
        images.filter((i) => i.name === img.name);
        await deleteMedia(img.documentId);
      }
    });
  }

  // new media IDS
  let mediaIds = [] as string[];

  // getting the new media IDS
  if (images && images.length > 0) {
    const response = await Promise.all(
      images.map(async (image) => {
        return await uploadMedia(image);
      })
    );

    // upload updated product media and get it's Ids
    const ids = response.map((res) => res.id);
    if (
      ids.every((id) => id != null) &&
      !response.some((res) => res.error != null)
    ) {
      mediaIds = [...mediaIds, ...ids];
    }
  }

  const { colors, ...productData } = data;
  const productColors = colors?.split(",").map((color) => ({ color }));

  const response = await authClient(authorized.token)
    .collection("products")
    .update(slug, { ...productData, colors: productColors, images: mediaIds });

  const product = response.data as Product;

  // revalidate cache
  revalidateTag(getProductTag(product.documentId), "max");
  return { product };
}

/**
 * Delete Product
 * @param id
 */
export async function deleteProduct(slug: string) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  const { product } = await getProduct(slug);

  if (product == null) {
    return { error: "المنتج غير موجود" };
  }

  // delete product images
  product.images.forEach(async (img) => {
    await deleteMedia(img.documentId);
  });

  await authClient(authorized.token).collection("products").delete(slug);

  // revalidate cache
  revalidateTag(getProductsTag(), "max");

  return { error: null };
}

/**
 *
 * @param id
 * @param available
 * @returns updated product
 */
export async function toggleProductAvailability(
  id: string,
  available: boolean
) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  const response = await authClient(authorized.token)
    .collection("products")
    .update(id, { available });

  const product = response.data as Product;

  // revalidate this post cache
  revalidateTag(getProductTag(product.documentId), "max");
  return { product };
}

/**
 *
 * @param data which is newCategory schema type
 * @returns the created category
 */
export async function createCategory(
  unsafe: z.infer<typeof CategorySchema> & { slug: string },
  image: File
) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  const { data, success } = CategorySchema.safeParse(unsafe);

  if (!success) return { error: "حدث خطأ ما أثناء معالجة البيانات" };

  const existingCategory = await getCategoryByName(data.name);

  if (existingCategory != null) {
    return { error: "هذا القسم موجود بالقعل" };
  }

  const imageResponse = await uploadMedia(image);

  if (imageResponse.error || imageResponse.id == null) {
    return { error: "فشل رفع الصورة" };
  }

  const response = await authClient(authorized.token)
    .collection("categories")
    .create({ ...data, image: imageResponse.id });

  const category = response.data as Category;

  // revalidate cache
  revalidateTag(getCategoriesTag(), "max");

  return { category };
}

/**
 *
 * @param id
 * @param data a partial data of type Category
 * @returns
 */
export async function updateCategory(
  id: string,
  data: Omit<Category, "documentId" | "createdA" | "updatedAt">,
  image: File | null
) {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  // checking the existence of the category
  const { category: existingCategory } = await getCategory(id);

  if (existingCategory == null) return { error: "المنتج غير موجود" };

  // initial new media ID
  let imageId = null as string | null;

  // Deleting Existing Media files
  if (image != null) {
    if (image.name !== existingCategory.image.name) {
      await deleteMedia(existingCategory.image.documentId);
      const response = await uploadMedia(image);
      if (response.error) {
        return { error: response.error };
      } else if (response.id != null) {
        imageId = response.id;
      }
    }
  }

  const response = await authClient(authorized.token)
    .collection("categories")
    .update(id, imageId ? { ...data, image: imageId } : data);

  const category = response.data as Category;

  // revalidate cache
  revalidateTag(getCategoryTag(category.documentId), "max");
  return { category };
}

/**
 * Delete Category
 * TODO: Ask if the products in this category should also be deleted
 * @param id
 */
export async function deleteCategory(
  id: string
): Promise<{ error: string } | void> {
  const authorized = await verifyAccess();

  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }
  const { category } = await getCategory(id);

  if (category == null) {
    return { error: "القسم غير موجود" };
  }

  // delete category image
  await deleteMedia(category.image.documentId);

  await authClient(authorized.token).collection("categories").delete(id);

  // revalidate cache
  revalidateTag(getCategoriesTag(), "max");
}

// Offer API

/**
 * Create New Offer
 * @returns Created Offer
 */

export async function createOffer({
  image,
  unsafe,
}: {
  unsafe: z.infer<typeof OfferSchema>;
  image: File;
}) {
  const authorized = await verifyAccess();

  // access verification
  if (!authorized.valid) {
    return { error: "ليس لديك الصلاحية للقيام بمثل هذا العمل" };
  }

  // zod schema validation
  const { data, success } = OfferSchema.safeParse(unsafe);
  if (!success) return { error: "حدث خطأ أثناء معالحة البيانات" };

  // check for existence
  const { offer } = await getOfferByTitle(data.title);
  if (offer) return { error: "العرض موجود بالفعل!" };

  // handle image
  const { error, id } = await uploadMedia(image);
  if (error != null || id == null) return { error };

  // store offer
  const response = await authClient(authorized.token)
    .collection("offers")
    .create({ ...data, image: id });

  // get the new offer
  const newOffer = response.data as Offer;

  // check for error
  if (newOffer == null) return { error: "حدث خطأ مل أثناء تخزين العرض..." };

  // redirect to offers page
  redirect("/offers");
}

/**
 * Update An Offer
 * @returns Updated Offer
 */
export async function updateOffer({
  slug,
  unsafe,
  image,
}: {
  slug: string;
  unsafe: z.infer<typeof OfferSchema>;
  image: File | null;
}) {
  const authorized = await verifyAccess();

  // access verification
  if (!authorized.valid) {
    return { error: "ليس الصلاحية للقيام بمثل هذا العمل" };
  }

  // check for existence
  const { offer } = await getOffer(unsafe.slug);
  if (offer == null) return { error: "العرض غير موجود !" };

  // zod schema validation
  const { data, success } = OfferSchema.safeParse(unsafe);
  if (!success) return { error: "حدث خطأ أثناء معالحة البيانات" };

  // temp value fo imageId
  let imageId = null as string | null;

  // if image exist and offer image name is not the sme as the uploaded image
  if (image != null) {
    if (image.name !== offer.image.name) {
      const { id, error } = await uploadMedia(image);
      if (id != null && error == null) imageId = id;
    }
  }

  // update offer record
  const response = await authClient(authorized.token)
    .collection("offers")
    .update(slug, imageId == null ? data : { ...data, image: imageId });

  // get the updated offer
  const updatedOffer = response.data as Offer;

  // check fo errors
  if (updatedOffer == null) return { error: "حدث خطأ أثناء تحديث العرض.." };

  // redirect to offers page
  redirect("/offers");
}

/**
 * Delete An Offer
 * @returns nothing
 */

export async function deleteOffer({ slug }: { slug: string }) {
  const authorized = await verifyAccess();

  // access verification
  if (!authorized.valid) {
    return { error: "ليس الصلاحية للقيام بمثل هذا العمل" };
  }

  // check for existence
  const { offer } = await getOffer(slug);
  if (offer == null) return { error: "العرض غير موجود !" };

  // delte the offer image
  const { error } = await deleteMedia(offer.image.documentId);
  if (error) return { error: "حدث خطأ أثناء حذف العرض.." };

  // delte the offer
  await authClient(authorized.token).collection("offers").delete(slug);

  // redirect to offers page
  redirect("/offers");
}
