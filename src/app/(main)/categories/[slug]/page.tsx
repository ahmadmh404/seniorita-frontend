import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getCategory } from "@/lib/api";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductSort } from "@/components/products/product-sort";
import { Skeleton } from "@/components/ui/skeleton";
import { StructuredData } from "@/components/seo/structured-data";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo-config";
import {
  ,
  productDescriptionRenderer,
} from "@/lib/formatters";
import { PageFallback } from "@/components/shared/page-fallback";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategory(slug);

  if (category == null) {
    return notFound();
  }

  return {
    title: `${category.name} | سنيوريتا`,
    description: productDescriptionRenderer(category.description),
    keywords: [category.name, "إكسسوارات", "سنيوريتا", category.name],
    openGraph: {
      type: "website",
      title: `${category.name} | سنيوريتا`,
      description: productDescriptionRenderer(category.description),
      url: `${SITE_URL}/categories/${slug}`,
      siteName: "سنيوريتا",
      images: category.image
        ? [
            {
              url: (category.image.url),
              width: 1200,
              height: 630,
              alt: category.name,
            },
          ]
        : undefined,
      locale: "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | سنيوريتا`,
      description: productDescriptionRenderer(category.description),
      images: category.image ? [category.image] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: PageProps<"/categories/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export async function SuspendedPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const { category } = await getCategory(slug);

  if (category == null) {
    return notFound();
  }

  const productCount = category.products.length ?? 0;

  const breadcrumbs = [
    { name: "الرئيسية", url: SITE_URL },
    { name: "الأقسام", url: `${SITE_URL}/categories` },
    { name: category.name, url: `${SITE_URL}/categories/${slug}` },
  ];

  console.log("sub_categories: ", category.sub_categories);

  return (
    <div>
      <StructuredData
        data={getWebPageSchema(
          `${category.name} | سنيوريتا`,
          productDescriptionRenderer(category.description),
          `${SITE_URL}/categories/${slug}`,
        )}
      />

      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      {/* Category Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={(category.image.url)}
          alt={category.name}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-background mb-4">
              {category.name}
            </h1>
            <p className="text-background/80 max-w-xl mx-auto px-4">
              {productDescriptionRenderer(category.description)}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-primary">
            الرئيسية
          </Link>
          <ChevronRight className="h-4 w-4 rotate-180" />
          <Link href="/categories" className="hover:text-primary">
            الأقسام
          </Link>
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span className="text-foreground">{category.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <Suspense
              fallback={<Skeleton className="h-96 w-full rounded-xl" />}
            >
              <ProductFilters categories={category.sub_categories || []} />
            </Suspense>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">{productCount} منتج</p>
              <Suspense fallback={<Skeleton className="h-10 w-48" />}>
                <ProductSort />
              </Suspense>
            </div>

            <Suspense fallback={<ProductGridFallback />}>
              <ProductGrid category={category} />
            </Suspense>
          </div>
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
