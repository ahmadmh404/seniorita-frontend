// Products Cache Tag
// import { revalidateTag } from "next/cache";

import { FeatureType } from "./types";

/**
 *
 * @param string
 * @returns Cache tag for paginated resource
 */

export const getPaginatedFeature = (
  feature: FeatureType,
  cursor?: number,
  filters?: string,
) => {
  return `paginated:${feature}:${cursor ? cursor : "beginning"}:${
    filters ? filters : "no-filters"
  }`;
};

/**
 * Get general Products Cache Tag
 */

export const getProductsTag = (filters?: Record<string, unknown>) => {
  if (filters) {
    return `products:${JSON.stringify(filters)}`;
  }
  return "products";
};

/**
 * Get specific Product Cache Tag
 */
export const getProductTag = (id: string) => {
  return `product:${id}`;
};

/**
 * Get Featured Products Cache Tag
 */

export const getFeaturedProductsTag = () => {
  return "products:featured";
};

/**
 * Get Similar Products Cache Tag
 */

export const getSimilarProductsTag = (
  productId: string,
  categoryId: string,
) => {
  return `products:similar:${productId}:${categoryId}`;
};

/**
 * Get Products Count Cache Tag
 */
export const getProductsStatsTag = () => {
  return "products:count";
};

/**
 *  Revalidate cache tags that target products
 * @param id product id
 */
// export const revalidateProductsCacheTags = (id: string) => {
//   revalidateTag(getProductsTag(), "max");
//   revalidateTag(getProductTag(id), "max");
//   revalidateTag(getProductsStatsTag(), "max");
// };

// ==============================================================
// ==============================================================

// Categories Cache Tags

/**
 * Get Categories Cache Tag
 */

export const getCategoriesTag = () => {
  return "categories";
};

/**
 * Get specific Category Cache Tag
 */

export const getCategoryTag = (id: string) => {
  return `categories:${id}`;
};

/**
 * Get Products Count Cache Tag
 */
export const getCategoriesCountTag = () => {
  return "categories:count";
};

/**
 *  Revalidate cache tags that target products
 * @param id product id
 */
// export const revalidateCategoriesCacheTags = (categoryId: string) => {
//   revalidateTag(getCategoriesTag(), "max");
//   revalidateTag(getCategoryTag(categoryId), "max");
//   revalidateTag(getCategoriesCountTag(), "max");
// };
// ================================================
// ================================================

// Offers Cache Tags

export const getOffersCacheTag = () => {
  return "offers";
};

/**
 * @returns Offer slug cache cache tag
 */

export const getOfferCacheTag = (slug: string) => {
  return `offers:${slug}`;
};

/**
 * @returns offer by title cache tag
 */
export const getOfferTitleCacheTag = (title: string) => {
  return `offers:${title}`;
};
