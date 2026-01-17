"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

export function useGetCategories() {
  return useInfiniteQuery({
    queryKey: ["paginated-categories"],
    queryFn: ({ pageParam }) => getCategories(pageParam),
    initialPageParam: undefined as number | undefined,
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
