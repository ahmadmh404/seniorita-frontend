"use server";

import { cacheTag } from "next/cache";

// Categories API

import { Category, DataPage, Pagination, Product } from "../types";
import { client } from "./client";
import {
  getCategoriesCountTag,
  getCategoryTag,
  getPaginatedFeature,
} from "../data-cache";

const categories = client.collection("categories");

/**
 * Get Categories of products
 * @param None
 * @returns categories and pagination on success, error on failure
 */
export async function getCategories(start?: number) {
  const allCategories = await categories.find({
    filters: { isSubCategory: false },
    populate: "*",
    pagination: { start },
  });

  return {
    data: allCategories.data as (Category & { products: Product[] })[],
    pagination: allCategories.meta.pagination ?? (null as Pagination | null),
  } as DataPage<Category>;
}

/**
 * Get Category by ID
 * @param id
 * @returns category on success and error on failure
 */

export async function getCategory(slug: string) {
  "use cache";
  cacheTag(getCategoryTag(slug));

  const category = await categories.find({
    filters: { slug },
    populate: "*",
  });
  return { category: category.data?.[0] as Category | null };
}

/**
 * Get Products Length
 * @returns the number of products oin the store
 */

export async function getCategoriesCount() {
  "use cache";
  cacheTag(getCategoriesCountTag());

  const response = await categories.find({
    fields: ["id"],
    pagination: { limit: 9999 },
  });

  return { count: response.data.length ?? 0 };
}

/**
 * Get Category by Name
 * @param name
 * @returns category on success and error on failure
 */
export async function getCategoryByName(name: string) {
  const response = await categories.find({
    filters: { name },
  });

  const category = response.data.at(0);
  if (category == null) return { category: null };
  return { category: category as Category };
}
