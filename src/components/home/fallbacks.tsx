import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardSkeleton } from "../products/product-fallback";

export function SlidesCarouselSkeleton() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Main slide background */}
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-linear-to-l from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mr-auto text-right">
            <Skeleton className="h-20 md:h-32 lg:h-40 w-[80%] mb-6 rounded-2xl" />
            <Skeleton className="h-12 md:h-16 w-[70%] mb-12 rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-44 rounded-full btn-outline" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        aria-label="الشريحة التالية"
        disabled
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        aria-label="الشريحة السابقة"
        disabled
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === 0 ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export function CategoriesSectionSkeleton() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <Skeleton className="h-12 w-64 mb-12 section-title" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured first category - spans 2x2 */}
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Skeleton className="w-full h-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                <Skeleton className="h-12 w-3/4 mb-4 rounded-lg" />
                <Skeleton className="h-4 w-24 mb-6 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          </div>

          {/* Regular categories */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden">
              <div className="relative aspect-4/5">
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <Skeleton className="h-10 w-2/3 mb-2 rounded-lg" />
                  <Skeleton className="h-4 w-20 mb-4 rounded-full" />
                  <Skeleton className="h-10 w-28 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductsSectionSkeleton() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
