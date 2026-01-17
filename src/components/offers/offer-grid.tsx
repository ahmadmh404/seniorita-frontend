"use client";

import { InfiniteQueryWrapper } from "../about/infinite-query-wrapper";
import { getOffers } from "@/lib/api/offers";
import { OfferCard } from "./offer-card";

export function OffersGrid() {
  return (
    <InfiniteQueryWrapper
      queryFn={({ start, page }) => getOffers(start, page)}
      queryKey="offer"
      ItemRenderer={({ index, offer }) => (
        <OfferCard offer={offer} index={index} />
      )}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    />
  );
}
