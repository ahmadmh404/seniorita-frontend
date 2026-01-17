import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "@/lib/api";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductSort } from "@/components/products/product-sort";
import { Skeleton } from "@/components/ui/skeleton";
import { StructuredData } from "@/components/seo/structured-data";
import { getWebPageSchema } from "@/lib/seo-config";
import { PageFallback } from "@/components/shared/page-fallback";

const SITE_URL = process.env.SITE_URL;

export const metadata: Metadata = {
  title: "المنتجات",
  description:
    "تصفحي مجموعتنا الكاملة من الإكسسوارات الفاخرة - نظارات شمسية، مكياح، حقائب يد، ومجوهرات",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export async function SuspendedPage() {
  const { data: categories } = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <StructuredData
        data={getWebPageSchema(
          "المنتجات",
          metadata.description!,
          `${SITE_URL}/products`,
        )}
      />

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">جميع المنتجات</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشفي مجموعتنا المتنوعة من الإكسسوارات الفاخرة المختارة بعناية لتناسب
          ذوقك الراقي
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
            <ProductFilters categories={categories} />
          </Suspense>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="">عرض جميع المنتجات</p>
            <Suspense fallback={<Skeleton className="h-10 w-48" />}>
              <ProductSort />
            </Suspense>
          </div>

          <Suspense fallback={<ProductGridFallback />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function ProductGridFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-card rounded-xl overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
