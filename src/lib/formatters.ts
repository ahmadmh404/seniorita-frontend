/**
 * Format Product Sort Filtering Option
 */

import { PRODUCTS_SORTING_OPTION } from "./constant";
import { Description } from "./types";

export function formatProductSortOption(
  option: (typeof PRODUCTS_SORTING_OPTION)[number],
) {
  switch (option) {
    case "rating":
      return "rating:desc";

    case "newest":
      return "createdAt";

    case "price-asc":
      return "price:asc";

    case "price-desc":
      return "price:desc";
    default:
      throw new Error(`Invalid Sort Option ${option satisfies null}`);
  }
}

/**
 * Product Description Renderer
 * @param description: Description
 */

export function productDescriptionRenderer(description: Description) {
  if (description == null) return "";

  const text = description
    .flatMap((block) => block.children.map((child) => child.text))
    .join("");

  return text;
}

/**
 * Product image URL formatter
 */

export function productImageURLFormatter(url: string) {
  return `${process.env.API_URL}${url}`;
}

/**
 * Format Media URL
 */
