"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProductsTag } from "../data-cache";
import { getProducts } from "../api";

export function useGetProducts() {
  return useInfiniteQuery({
    queryKey: [getProductsTag()],
    queryFn: ({ pageParam }) => getProducts({ start: pageParam }),
    initialPageParam: undefined as number | undefined,
    staleTime: Infinity,
    getNextPageParam: (prevPage) => {
      const pageSize = prevPage.pagination?.pageSize;
      const pageNumber = prevPage.pagination?.page;

      if (!pageSize || !pageNumber) {
        return;
      }

      return pageSize * pageNumber;
    },
  });
}
