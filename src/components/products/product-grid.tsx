"use client";

import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { InfiniteQueryWrapper } from "../about/infinite-query-wrapper";
import { ProductCard } from "./product-card";
import { getProducts } from "@/lib/api";
import {
  ProductsFiltersInputSchema,
  ProductsFiltersSchema,
} from "@/lib/schema";
import z from "zod";
import { Category, ProductSortOption } from "@/lib/types";
import { formatProductSortOption } from "@/lib/formatters";
import { useEffect, useEffectEvent, useState } from "react";

interface ProductGridProps {
  category?: Category;
}

export function ProductGrid({ category }: ProductGridProps) {
  const search = useSearchParams();

  // Build Query Filters
  const [options, setOptions] = useState<z.infer<typeof ProductsFiltersSchema>>(
    { filters: { available: true } },
  );

  const paramsEffectEvent = useEffectEvent(
    (search: ReadonlyURLSearchParams) => {
      function handleFilter() {
        const params: z.infer<typeof ProductsFiltersInputSchema> = {
          category: category?.slug ?? search.get("category"),
          search: search.get("search"),
          colors: search.get("colors"),
          minPrice: Number(search.get("minPrice")) || 0,
          maxPrice: Number(search.get("maxPrice")) || 500,
          sort: (search.get("sort") || "newest") as ProductSortOption,
        };

        // equality for relation with category
        if (params.category != null) {
          setOptions((prev) => ({
            ...prev,
            filters: { category: { slug: params.category! } },
          }));
        }

        // search for the user query in either name or description -
        if (params.search) {
          setOptions((prev) => ({
            ...prev,
            filters: {
              $or: [
                { name: { $contains: params.search!, $options: "i" } },
                { description: { $contains: params.search!, $options: "i" } },
              ],
            },
          }));
        }

        // colors filtering as an array
        if (params.colors) {
          const colorsArr =
            typeof params.colors === "string"
              ? params.colors.split(",")
              : params.colors;
          setOptions((prev) => ({
            ...prev,
            filters: { colors: { color: { $in: colorsArr } } },
          }));
        }

        // price filtering(min, max)
        if (params.minPrice || params.maxPrice) {
          setOptions((prev) => ({
            ...prev,
            filters: {
              price: {
                $gte: params.minPrice ?? 0,
                $lte: params.maxPrice ?? 500,
              },
            },
          }));
        }

        // sort filtering option
        if (params.sort) {
          setOptions((prev) => ({
            ...prev,
            sort: formatProductSortOption(params.sort!),
          }));
        }
      }

      handleFilter();
    },
  );

  useEffect(() => {
    paramsEffectEvent(search);
  }, [search]);

  return (
    <InfiniteQueryWrapper
      queryFn={({ start }) => getProducts({ options, start })}
      queryKey={`products-${JSON.stringify(options)}`}
      resourceName="product"
      ItemRenderer={({ product }) => <ProductCard product={product} />}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    />
  );
}
