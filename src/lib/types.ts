import z from "zod";
import { PaginationSchema, ProductsFiltersSchema } from "./schema";
import { API } from "@strapi/client";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { features, PRODUCTS_SORT_OPTIONS } from "./constant";

// Global types

/**
 * Pagination Schema Type
 */
export type PaginationParma = z.infer<typeof PaginationSchema>;

/**
 * @type Lucide-React Icon type
 */

export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

// Description helper types

type RichTextChild = {
  text: string;
  type: "text";
};

type RichTextParagraph = {
  type: "paragraph";
  children: RichTextChild[];
};

type DescriptionBlock = RichTextParagraph;

/**
 * Features type for cache tags
 */

export type FeatureType = (typeof features)[number];

/**
 * Strapi description (markdown - blocks) specific type
 */
export type Description = DescriptionBlock[];

/**
 * Strapi image specific type
 */
export interface Image {
  documentId: number;
  name: string;
  url: string;
}

/**
 * Pagination type for collections
 */

export interface Pagination {
  limit: number;
  start: number;
  total: number;
}

/**
 * Paginated Date Generic Page Type
 */

export interface DataPage<T> {
  data: T[];
  pagination: Pagination | null;
}

/**
 * Product Sort Option type
 */

export type ProductSortOption = (typeof PRODUCTS_SORT_OPTIONS)[number]["value"];

// Single Types

/**
 * @type Home Page Carousel Slide Single Type
 */
export interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

/**
 * @type About Page Feature Single type
 */
export interface AboutFeature {
  title: string;
  description: string;
  icon: Icon;
}

/**
 * @type About Page State single type
 */

export interface AboutState {
  label: string;
  value: string;
}

/**
 * Components types
 */
export interface Color {
  id: number;
  name: string;
  color: string;
}

// Collection Types

/**
 * @type User login response
 */
export interface User extends API.Document {
  email: string;
  username: string;
  jwt: string | null;
}

/**
 * @type Product Type
 */

export interface Product extends API.Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: Image[];
  category: Category;
  colors?: Color[];
  rating: number;
  reviewCount: number;
  available: boolean;
  featured: boolean;
}

/**
 * @type Category Type
 */
export interface Category extends API.Document {
  name: string;
  slug: string;
  description: Description;
  image: Image;
  products: Product[];
  sub_categories: Category[];
}

export interface Offer extends API.Document {
  title: string;
  slug: string;
  description: string;
  discountValue: number;
  image: Image;
  startDate: string;
  endDate: string;
}

/**
 * @type Category Filters
 */
export interface CategoryFilter {
  id: string;
  name: string;
  type: "color" | "size" | "price" | "material";
  options: FilterOption[];
}

/**
 * @type category products filter options
 */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * @type Review Type
 */
export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

/**
 * @type User Type
 */
export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user";
}

/**
 * @type Product filtering options schema type
 */
export type FilerProductsFiltersType = z.infer<typeof ProductsFiltersSchema>;
