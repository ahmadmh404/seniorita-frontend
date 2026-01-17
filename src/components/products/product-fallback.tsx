import { Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden card-hover">
      {/* Image section */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Skeleton className="w-full h-full" />

        {/* Discount badge */}
        <div className="absolute top-3 right-3">
          <Skeleton className="w-12 h-6 rounded" />
        </div>

        {/* Hover overlay & button */}
        <div className="absolute inset-0 bg-black/0" />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Category */}
        <Skeleton className="h-4 w-20 mb-2" />

        {/* Product name */}
        <Skeleton className="h-6 w-3/4 mb-4 rounded-lg" />

        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-border" />
          ))}
          <Skeleton className="h-3 w-8 ml-1" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-7 w-16 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded-sm" />
        </div>

        {/* Color swatches */}
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border border-border"
              style={{
                backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"][
                  i
                ],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SimilarProductsFallback() {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 text-center">أكملي الإطلالة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
