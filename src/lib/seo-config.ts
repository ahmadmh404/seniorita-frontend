/**
 * SEO Configuration and Metadata Utilities
 * Provides consistent SEO metadata across all pages
 */

import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://senorita.com";
const SITE_NAME = "سنيوريتا - معرض السيدات";
const DEFAULT_LOCALE = "ar_SA";
const SITE_LANGUAGE = "ar";

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | سنيوريتا - معرض السيدات",
    default: "سنيوريتا - معرض السيدات | إكسسوارات فاخرة",
  },
  description:
    "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياج، حقائب يد، ومجوهرات بأعلى جودة وأفضل الأسعار",
  keywords: [
    "إكسسوارات",
    "نظارات شمسية",
    "مكياج",
    "حقائب يد",
    "مجوهرات",
    "سنيوريتا",
    "معرض السيدات",
    "إكسسوارات نسائية",
    "إكسسوارات فاخرة",
    "متجر إلكتروني",
  ],
  authors: [{ name: "Senorita Gallery", url: SITE_URL }],
  creator: "Senorita Gallery",
  publisher: "Senorita Gallery",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "سنيوريتا - معرض السيدات | إكسسوارات فاخرة",
    description:
      "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياح، حقائب يد، ومجوهرات",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "سنيوريتا - معرض السيدات",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سنيوريتا - معرض السيدات",
    description: "إكسسوارات نسائية فاخرة بأفضل الأسعار",
    creator: "@senorita_gallery",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  category: "e-commerce",
  classification: "Business",
};

/**
 * Generate Open Graph image metadata
 */
export function getOpenGraphImage(
  url: string,
  alt: string,
  width = 1200,
  height = 630,
) {
  return {
    url,
    width,
    height,
    alt,
    type: "image/jpeg",
  };
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Generate structured data for Organization
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياج، حقائب يد، ومجوهرات",
    sameAs: [
      "https://www.instagram.com/senorita_gallery",
      "https://www.tiktok.com/@senorita_gallery",
      "https://www.facebook.com/senorita.gallery",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+966-50-000-0000",
      email: "info@senorita.com",
      areaServed: "SA",
      availableLanguage: "ar",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "الرياض",
      addressLocality: "الرياض",
      postalCode: "00000",
      addressCountry: "SA",
    },
  };
}

/**
 * Generate structured data for LocalBusiness
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: `${SITE_URL}/logo.png`,
    description:
      "متجر سنيوريتا للإكسسوارات النسائية الفاخرة - نظارات شمسية، مكياح، حقائب يد، ومجوهرات",
    url: SITE_URL,
    telephone: "+966-50-000-0000",
    email: "info@senorita.com",
    priceCurrency: "SYP",
    areaServed: "SY",
    address: {
      "@type": "PostalAddress",
      streetAddress: "طرطوس'",
      addressLocality: "طرطوس",
      addressCountry: "SY",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "22:00",
      },
    ],
  };
}

/**
 * Generate structured data for ECommerce Product
 */
export function getProductSchema(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "SYP",
      price: product.price.toString(),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating.toString(),
            reviewCount: product.reviewCount.toString(),
          }
        : undefined,
  };
}

/**
 * Generate structured data for BreadcrumbList
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate structured data for WebPage
 */
export function getWebPageSchema(
  title: string,
  description: string,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@id": SITE_URL,
    },
    inLanguage: SITE_LANGUAGE,
  };
}

/**
 * Generate structured data for FAQPage
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
