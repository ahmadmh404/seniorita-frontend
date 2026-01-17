"use server";

import { cacheTag } from "next/cache";
import {
  DataPage,
  FilerProductsFiltersType,
  Pagination,
  Product,
} from "../types";
import { client } from "./client";
import {
  getFeaturedProductsTag,
  getPaginatedFeature,
  getProductsStatsTag,
  getProductTag,
  getSimilarProductsTag,
} from "../data-cache";

/**
 * Products API
 */
const products = client.collection("products");

/**
 * getProducts query params type
 * [filters]?: filtering options
 * [fields]?: names of fields to retrieve
 * [relations]?: names of relations to retrieve (category, reviews...)
 */
interface GetProductsType {
  start?: number;
  page?: number;
  options?: FilerProductsFiltersType;
}

/**
 * Get All Products With Filtering
 */
export async function getProducts({ start, page, options }: GetProductsType) {
  "use cache";
  cacheTag(getPaginatedFeature("products", page, JSON.stringify(options)));

  // fetch the products
  const allProducts = await products.find({
    status: "published",
    populate: "*",
    filters: options?.filters,
    sort: options?.sort,
    pagination: {
      start,
    },
  });

  return {
    data: allProducts.data as Product[],
    pagination: allProducts.meta.pagination ?? (null as Pagination | null),
  } as DataPage<Product>;
}

/**
 * getProduct query params type
 * [id]: the ID of the product
 * [fields]?:names of fields to retrieve
 */

/**
 * Get a specific product by ID with fields control
 */
export async function getProduct(slug: string) {
  "use cache";
  cacheTag(getProductTag(slug));

  const product = await products.find({
    filters: { slug },
    populate: ["images", "category", "colors"],
  });

  return { product: product.data.at(0) as Product | null };
}

/**
 * Get Featured Products (that have the highest sells)
 */

export async function getFeaturedProducts() {
  "use cache";
  cacheTag(getFeaturedProductsTag());

  const featuredProducts = await products.find({
    filters: { featured: true },
    populate: ["images", "category"],
  });
  return {
    data: featuredProducts.data as Product[],
    pagination: featuredProducts.meta.pagination ?? null,
  };
}

/**
 * Get Similar Products Query Params type
 * [productId]: the ID of the current product to exclude it from the results
 * [categoryId]: the ID of the current product's category.
 */

interface GetSimilarProductsType {
  productId: string;
  categoryId: string;
}

/**
 * Get Similar Products
 * @returns products from the same category excluding the current product
 */

export async function getSimilarProducts({
  productId,
  categoryId,
}: GetSimilarProductsType) {
  "use cache";
  cacheTag(getSimilarProductsTag(productId, categoryId));

  const similarProducts = await products.find({
    filters: {
      id: { $ne: productId },
      category: { documentId: categoryId },
    },
    populate: ["images", "category"],
  });

  return {
    data: similarProducts.data as Product[],
    pagination: similarProducts.meta.pagination ?? null,
  };
}

/**
 * Get Products Length
 * @returns the number of products oin the store
 */

export async function getProductsStats() {
  "use cache";
  cacheTag(getProductsStatsTag());

  const response = await products.find({
    status: "published",
    fields: ["id", "featured", "available"],
    pagination: { limit: 9999 },
  });

  const allProducts = response.data as Product[];

  return {
    productsCount: allProducts.length ?? 0,
    featuredCount: allProducts.filter((p) => p.featured).length ?? 0,
    availableCount: allProducts.filter((p) => p.available).length ?? 0,
  };
}
