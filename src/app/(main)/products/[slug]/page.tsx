import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import { getProduct } from "@/lib/api";
import { ProductGallery } from "@/components/products/product-gallery";
import { SimilarProducts } from "@/components/products/similar-products";

import { StructuredData } from "@/components/seo/structured-data";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo-config";
import { Suspense } from "react";
import { PageFallback } from "@/components/shared/page-fallback";
import { formatFullMediaURL } from "@/lib/formatters";
import { SimilarProductsFallback } from "@/components/products/product-fallback";

const SITE_URL = process.env.SITE_URL || "https://senorita.com";

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProduct(slug);

  if (!product) return notFound();

  return {
    title: `${product.name} | سنيوريتا`,
    description: product.description,
    keywords: [
      product.name,
      product?.category.name || "",
      "إكسسوارات",
      "سنيوريتا",
    ],
    openGraph: {
      type: "website",
      title: `${product.name} | سنيوريتا`,
      description: product.description,
      url: `${SITE_URL}/products/${slug}`,
      siteName: "سنيوريتا",
      images: product.images.map((img) => ({
        url: formatFullMediaURL(img.url),
        width: 1200,
        height: 1200,
        alt: product.name,
      })),
      locale: "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | سنيوريتا`,
      description: product.description,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
  };
}

export default function ProductPage(props: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage {...props} />
    </Suspense>
  );
}

export async function SuspendedPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const { product } = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const breadcrumbs = [
    { name: "الرئيسية", url: SITE_URL },
    { name: "المنتجات", url: `${SITE_URL}/products` },
    {
      name: product?.category.name || "",
      url: `${SITE_URL}/categories/${product.category.slug}`,
    },
    { name: product.name, url: `${SITE_URL}/products/${slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <StructuredData
        data={getProductSchema({
          id: product.documentId,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          image: formatFullMediaURL(product.images[0].url) || "",
          rating: product.rating,
          reviewCount: product.reviewCount,
          category: product?.category.name || "",
          slug: slug,
        })}
      />

      <StructuredData data={getBreadcrumbSchema(breadcrumbs)} />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <Link href="/products" className="hover:text-primary">
          المنتجات
        </Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <Link
          href={`/categories/${product.category.slug}`}
          className="hover:text-primary"
        >
          {product?.category.name || "لا ينتمي إلى أي قسم"}
        </Link>
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <ProductGallery
          images={product.images.map((image) => formatFullMediaURL(image.url))}
          productName={product.name}
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                  وفر {discount}%
                </span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-yellow-500"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviewCount} تقييم)
            </span>
          </div>

          {/* Description */}
          <p className="leading-relaxed mb-8">{product.description}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-medium mb-3">الألوان المتاحة</h3>
              <div className="flex gap-3">
                {product.colors.map(({ color, name, id }) => (
                  <button
                    key={id}
                    className="w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Availability Notice */}
          <div className="mt-8 p-4 bg-cream rounded-lg text-center">
            <p className="text-muted-foreground">
              هذا المنتج للعرض فقط. للطلب يرجى التواصل معنا.
            </p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <Suspense fallback={<SimilarProductsFallback />}>
        <SimilarProducts
          productId={product.documentIdb}
          categoryId={product.categoryId}
        />
      </Suspense>
    </div>
  );
}
