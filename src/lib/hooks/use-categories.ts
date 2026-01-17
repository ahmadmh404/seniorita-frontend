"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

export function useGetCategories() {
  return useInfiniteQuery({
    queryKey: ["paginated-categories"],
    queryFn: ({ pageParam }) => getCategories(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (prevPage) => {
      const pageSize = prevPage.pagination?.limit;
      const pageNumber = prevPage.pagination
        ? Math.ceil(prevPage.pagination?.total / prevPage.pagination.limit)
        : 1;

      if (!pageSize || !pageNumber) {
        return;
      }

      return pageSize * pageNumber;
    },
  });
}
