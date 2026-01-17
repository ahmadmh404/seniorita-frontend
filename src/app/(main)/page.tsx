import { Suspense } from "react";
import type { Metadata } from "next";

import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutPreview } from "@/components/home/about-preview";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { StructuredData } from "@/components/seo/structured-data";
import { getWebPageSchema } from "@/lib/seo-config";
import {
  CategoriesSectionSkeleton,
  FeaturedProductsSectionSkeleton,
  SlidesCarouselSkeleton,
} from "@/components/home/fallbacks";
import { PageFallback } from "@/components/shared/page-fallback";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export const metadata: Metadata = {
  title: "سنيوريتا - معرض السيدات | إكسسوارات فاخرة",
  description:
    "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياح، حقائب يد، ومجوهرات بأعلى جودة وأفضل الأسعار",

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export function SuspendedPage() {
  return (
    <>
      <StructuredData
        data={getWebPageSchema(
          "سنيوريتا - معرض السيدات",
          metadata.description!,
          SITE_URL
        )}
      />

      {/* Hero Section */}
      <Suspense fallback={<SlidesCarouselSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Categories Grid */}
      <Suspense fallback={<CategoriesSectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<FeaturedProductsSectionSkeleton />}>
        <FeaturedProducts />
      </Suspense>

      <AboutPreview />
      <NewsletterSection />
    </>
  );
}
