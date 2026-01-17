import { Skeleton } from "@/components/ui/skeleton";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Skeleton */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              disabled
              className="animate-pulse"
            >
              <Skeleton className="h-6 w-6">
                <Menu className="h-6 w-6" />
              </Skeleton>
            </Button>
          </div>

          {/* Logo Skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-32" />
          </div>

          {/* Desktop Navigation Skeleton */}
          <div className="hidden lg:flex items-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>

          {/* Search Skeleton */}
          <div className="w-64 h-10">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>
      </div>
    </header>
  );
}
