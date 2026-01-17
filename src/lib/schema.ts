import * as z from "zod";
import { DB_PRODUCT_SORT_OPTIONS, PRODUCTS_SORT_OPTIONS } from "./constant";

/**
 * Data Pagination Schema
 */

export const PaginationSchema = z.object({
  page: z.string().transform((val) => {
    if (isNaN(Number(val))) {
      return null;
    }
    return Number(val);
  }),
});

/**
 * Contact Form Schema
 */

export const ContactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[0-9]{7,15}$/.test(val),
      "رقم الهاتف غير صالح",
    ),
  subject: z.string().min(5, "الموضوع يجب أن يكون على الأقل 5 أحرف"),
  message: z
    .string()
    .min(10, "الرسالة يجب أن تكون على الأقل 10 أحرف")
    .max(200, "الرسالة يجب أن تكون على الأكثر 100 أحرف"),
});

/**
 * API Schemas
 */

/**
 * Schema for validating product filter query parameters
 */
export const ProductsFiltersInputSchema = z.object({
  category: z.string().nullable(), // "handbags", "watches", etc.
  search: z.string().nullable(),
  colors: z.string().nullable(), // "red,blue,black"
  minPrice: z.coerce.number().min(0).nullable(),
  maxPrice: z.coerce.number().max(500).nullable(),
  sort: z.enum(PRODUCTS_SORT_OPTIONS.map((option) => option.value)).nullable(),
});

// Output schema (Strapi query format)
export const ProductsFiltersSchema = z.object({
  filters: z.object({
    category: z.object({ slug: z.string() }).optional(),
    available: z.boolean().optional(),
    $or: z
      .array(
        z.union([
          z.object({
            name: z.object({ $contains: z.string(), $options: z.literal("i") }),
          }),
          z.object({
            description: z.object({
              $contains: z.string(),
              $options: z.literal("i"),
            }),
          }),
        ]),
      )
      .optional(),
    colors: z
      .object({
        color: z.object({
          $in: z.array(z.string()),
        }),
      })
      .optional(),
    price: z
      .object({
        $gte: z.number().optional(),
        $lte: z.number().optional(),
      })
      .optional()
      .refine((val) => val?.$gte !== undefined || val?.$lte !== undefined, {
        message: "At least one price bound required",
      }),
  }),
  sort: z.enum(DB_PRODUCT_SORT_OPTIONS).optional(),
});

/**
 * Category Schema
 */

export const CategorySchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون على الأقل 4 أحرف"),
  slug: z.string().min(3, "الرابط يجب أن يكون على الأقل 4 أحرف"),
  description: z.string().min(10, "الوصف يجب أن يكون على الأقل 10 أحرف"),
});

/**
 * Product Schema
 */
export const ProductSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون على الأقل 4 أحرف"),
  slug: z.string().min(3, "الرابط يجب أن يكون على الأقل 4 أحرف"),
  description: z.string().min(10, "الوصف يجب أن يكون على الأقل 10 أحرف"),
  price: z
    .string()
    .min(1, "انتبه للسعر الذي تضعه!")
    .transform((val) => val.toString()),
  originalPrice: z
    .nullable(z.string().min(1, "انتبه للسعر الذي تضعه!"))
    .transform((val) => val?.toString() ?? null),
  colors: z.string(),
  featured: z.boolean(),
  available: z.boolean(),
  categoryId: z
    .string("يجب أن تضع المنتج في قسم ما!")
    .nullable()
    .refine(
      (val) => {
        return val != null;
      },
      { error: "يحب تحديد قسم للمنتج", path: ["categoryId"] },
    ),
});

/**
 * Offer Schema
 */

export const OfferSchema = z.object({
  title: z.string().min(5, "عنوان العرض يجب أن لا يقل عن 5 أحرف"),
  description: z.string().min(10, "وصف العرض يجب أن 10 يقل عن 5 أحرف"),
  slug: z.string().min(5, "الإسم المختصؤ للعرض يجب أن لا يقل عن 5 أحرف"),
  discountValue: z.string().min(0, "قينة الخصم يجب أن لا تقل عن صفر"),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
});

/**
 * Login Schema
 */

export const LoginSchema = z.object({
  identifier: z.email("هذا الإيميل غير صالح"),
  password: z.string().min(8, "كلمة المرور قصيرة جدا"),
});
