import { Skeleton } from "../ui/skeleton";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function FooterFallback() {
  return (
    <footer className="bg-cream border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Skeleton */}
          <div className="lg:col-span-2">
            <Skeleton className="h-14 w-36 mb-6" />
            <Skeleton className="h-20 w-full max-w-sm mb-6" />
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-foreground/20 flex items-center justify-center animate-pulse"
                >
                  {i === 0 && (
                    <Facebook className="h-5 w-5 text-background/50" />
                  )}
                  {i === 1 && (
                    <Instagram className="h-5 w-5 text-background/50" />
                  )}
                  {i === 2 && (
                    <Twitter className="h-5 w-5 text-background/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Skeleton */}
          <div>
            <Skeleton className="h-7 w-24 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
          </div>

          {/* Categories Skeleton */}
          <div>
            <Skeleton className="h-7 w-20 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-28" />
              ))}
            </div>
          </div>

          {/* Newsletter Skeleton */}
          <div>
            <Skeleton className="h-7 w-36 mb-4" />
            <Skeleton className="h-4 w-64 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="flex-1 h-11 rounded-md" />
              <Skeleton className="h-11 w-20 rounded-md" />
            </div>
          </div>
        </div>

        {/* Copyright Skeleton */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>
      </div>
    </footer>
  );
}
