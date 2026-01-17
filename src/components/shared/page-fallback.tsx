import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function PageFallback() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-12 p-8 bg-background">
      {/* Breadcrumb/Title skeleton */}
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-10 w-80" />
      </div>

      {/* Main content skeleton - flexible grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4 p-6 border rounded-lg">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating spinner - keeps your original design */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex items-center justify-center gap-4 p-6 bg-card rounded-xl">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-xl font-semibold text-foreground">
            جاري تحميل الصفحة...
          </p>
        </div>
      </div>
    </div>
  );
}
