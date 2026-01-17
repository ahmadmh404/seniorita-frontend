"use client";

import { InfiniteQueryWrapper } from "../about/infinite-query-wrapper";
import { getCategories } from "@/lib/api";
import { CategoryCArd } from "./category-card";

export function CategoriesGrid() {
  return (
    <InfiniteQueryWrapper
      queryFn={({ start, page }) => getCategories(start, page)}
      queryKey="category"
      ItemRenderer={({ category }) => <CategoryCArd category={category} />}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    />
  );
}
