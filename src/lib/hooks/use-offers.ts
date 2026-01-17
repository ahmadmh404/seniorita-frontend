"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getOffersCacheTag } from "../data-cache";
import { getOffers } from "../api/offers";

export function useGetOffers() {
  return useInfiniteQuery({
    queryKey: [getOffersCacheTag()],
    queryFn: ({ pageParam }) => getOffers(pageParam),
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
