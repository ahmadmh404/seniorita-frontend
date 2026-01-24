import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { getWebPageSchema } from "@/lib/seo-config";
import { Suspense } from "react";
import { PageFallback } from "@/components/shared/page-fallback";
import { CategoriesGrid } from "@/components/home/categories-grid";

const SITE_URL = process.env.SITE_URL;

export const metadata: Metadata = {
  title: "الأقسام",
  description:
    "تصفحي أقسام متجر سنيوريتا - نظارات شمسية، مكياح، حقائب يد، ومجوهرات فاخرة",
};

export default function CategoriesPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export async function SuspendedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <StructuredData
        data={getWebPageSchema(
          "الأقسام | سنيوريتا",
          metadata.description!,
          `${SITE_URL}/categories`,
        )}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">أقسامنا</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشفي مجموعاتنا المتنوعة من الإكسسوارات الفاخرة
        </p>
      </div>

      <CategoriesGrid />
    </div>
  );
}
