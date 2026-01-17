import {
  Facebook,
  HeartHandshake,
  Instagram,
  ShieldCheck,
  Sparkles,
  Truck,
  Twitter,
} from "lucide-react";
import { AboutState } from "./types";

/**
 *
 */

export const features = ["products", "categories", "offers"] as const;

/**
 * fallback slides for homepage carousel
 */

export const FALLBACK_CAROUSEL_SLIDES = [
  {
    documentId: "ahoghrgrho",
    image: "/slides/slide-1.png",
    title: "عصر جديد من الأناقة",
    subtitle: "إكسسوارات خالدة للمرأة العصرية",
    cta: "اكتشفي المجموعة",
    link: "/products",
  },
  {
    documentId: "oahgprwhga",
    image: "/slides/slide-2.png",
    title: "جمال يدوم",
    subtitle: "مستحضرات تجميل فاخرة لإطلالة مثالية",
    cta: "تسوقي الآن",
    link: "/categories/makeup",
  },
  {
    documentId: "9ygaho4ja",
    image: "/slides/slide-3.png",
    title: "أناقة بلا حدود",
    subtitle: "حقائب يد من أجود أنواع الجلود",
    cta: "شاهدي المجموعة",
    link: "/categories/handbags",
  },
];

/**
 * navigation link
 */

export const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/categories", label: "الأقسام" },
  { href: "/offers", label: "العروض" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

/**
 * Footer Links
 */

export const footerLinks = {
  navigation: [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
    { href: "/categories", label: "الأقسام" },
    { href: "/about", label: "قصتنا" },
  ],
  support: [
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "اتصل بنا" },
    { href: "/privacy", label: "سياسة الخصوصية" },
    { href: "/terms", label: "الشروط والأحكام" },
  ],
} as const;

/**
 * Social Links
 */

export const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "فيسبوك",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "انستغرام",
  },
  { icon: Twitter, href: "https://twitter.com", label: "تويتر" },
];

/**
 * Products Sorting Options
 */

export const PRODUCTS_SORTING_OPTION = [
  "price-asc",
  "price-desc",
  "newest",
  "rating",
] as const;

/**
 * default selected fields for products query
 */

export const DEFAULT_PRODUCTS_SELECTED_FIELDS = [
  "name",
  "description",
  "rating",
  "reviewCount",
  "originalPrice",
  "price",
];

/**
 * Sort options for product sorting component
 */

export const PRODUCTS_SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "price-asc", label: "السعر: من الأقل للأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
] as const;

export const DB_PRODUCT_SORT_OPTIONS = [
  "rating:desc",
  "createdAt",
  "price:asc",
  "price:desc",
] as const;

// About page Constants
export const aboutStats: AboutState[] = [
  { label: "عميلة سعيدة", value: "+15,000" },
  { label: "منتج حصري", value: "800" },
  { label: "فرع ومعرض", value: "5" },
  { label: "سنوات من الخبرة", value: "10" },
];

// About Page Features
export const aboutFeatures: AboutFeature[] = [
  {
    title: "جودة استثنائية",
    description:
      "نختار كل قطعة بعناية فائقة لضمان أعلى معايير الجودة والمتانة التي تليق بكِ.",
    icon: Sparkles,
  },
  {
    title: "ضمان الأصالة",
    description: "جميع منتجاتنا أصلية 100% ومن ماركات عالمية موثوقة.",
    icon: ShieldCheck,
  },
  {
    title: "توصيل سريع",
    description: "نحرص على وصول مشترياتك بأمان وبأسرع وقت ممكن إلى باب منزلك.",
    icon: Truck,
  },
  {
    title: "دعم متميز",
    description:
      "فريقنا متواجد دائماً لمساعدتك في اختيار ما يناسب ذوقك الرفيع.",
    icon: HeartHandshake,
  },
];
