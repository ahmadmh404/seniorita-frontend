"use client";

import { use, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataPage, Offer } from "@/lib/types";

export function OfferBanner(offersPromise: Promise<{ data: DataPage<Offer> }>) {
  const { data: offers } = use(offersPromise).data;
  const [dismissed, setDismissed] = useState(false);

  const offer = offers.length > 0 ? offers.at(0) : null;
  if (!offer || dismissed) return null;

  return (
    <div className="relative bg-linear-to-r from-accent via-accent-secondary to-accent overflow-hidden">
      <div className="relative container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-background font-serif text-lg md:text-xl font-semibold">
            {offer.title}
            {offer.code && (
              <span className="ml-3 text-sm font-sans font-normal bg-background/20 px-3 py-1 rounded-full">
                Code: {offer.code}
              </span>
            )}
          </p>
          {offer.description && (
            <p className="text-background/90 text-sm mt-1">
              {offer.description}
            </p>
          )}
        </div>
        <Link href="/offers">
          <Button
            variant="secondary"
            size="sm"
            className="bg-background text-accent hover:bg-background/90"
          >
            Shop Now
          </Button>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-background/80 hover:text-background transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
