"use client";

import { useEffect, useEffectEvent, useState, useTransition } from "react";
import type { Product } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategories } from "@/lib/hooks/use-categories";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/lib/schema";
import { Form } from "../ui/form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Label } from "../ui/label";
import { FileUpload } from "../shared/file-upload";
import { createProduct, updateProduct } from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";
import z from "zod";
import { slugify } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface ProductFormProps {
  product?: Product | null;
}

export function ProductForm({ product }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useGetCategories();
  const [productImages, setProductImages] = useState<File[]>([]);

  // RHF form setup
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() ?? null,
          featured: product.featured,
          available: product.available,
          colors: product.colors
            ? product.colors.map((c) => c.color).join(",\n")
            : "",
          categoryId: product.category.documentId,
        }
      : {
          name: "",
          slug: "",
          description: "",
          price: "1.5",
          originalPrice: "2.5",
          featured: false,
          available: false,
          colors: "",
          categoryId: null,
        },
  });

  // name value for slug update
  const nameValue = form.watch("name");

  // categories data
  const categories = data?.pages.flatMap((page) => page.data || []);

  // form submit handler
  async function onSubmit(unsafe: z.infer<typeof ProductSchema>) {
    if (productImages?.length === 0) {
      return { error: "يرجى إضافة صورة واحدة على الأقل للمنتج" };
    }

    startTransition(async () => {
      const response = await (product
        ? updateProduct(product.documentId, unsafe, productImages)
        : createProduct({ unsafe, images: productImages }));

      if (response.error) {
        toast.error(response.error);
      }

      toast.success("تمت العملية ينجاح");
    });
  }

  // fetch product images as File objects for preview
  const fetchProductImagesEvent = useEffectEvent(() => {
    let isMounted = true;

    const fetchImages = async (imageUrls: string[]) => {
      try {
        const blobs = await Promise.all(
          imageUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return await response.blob();
          })
        );

        if (isMounted) {
          setProductImages(blobs as File[]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (product?.images) {
      fetchImages(product.images.map((img) => img.url));
    }

    return () => {
      isMounted = false;
    };
  });

  // update the slug value with slugify(nameValue)
  const updateSlugEffect = useEffectEvent((name: string) => {
    form.setValue("slug", slugify(name));
  });

  // run on component mount
  useEffect(() => {
    fetchProductImagesEvent();
  }, []);

  // run when nameValue changes
  useEffect(() => {
    updateSlugEffect(nameValue);
  }, [nameValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full max-w-4xl space-y-4"
        dir="rtl"
      >
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>الإسم</FieldLabel>
                <Input {...field} placeholder="اسم المنتج بالعربية" />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>القسم</FieldLabel>

                <Select
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories != null &&
                      categories.map((cat) => (
                        <SelectItem key={cat.documentId} value={cat.documentId}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Description Input */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-full" aria-invalid={fieldState.invalid}>
              <FieldLabel>لوصف</FieldLabel>
              <Textarea {...field} rows={5} placeholder=" وصف المنتح..." />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Price inputs */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>السعر ($)</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  step="0.2"
                  placeholder="إجباري"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="originalPrice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>السعر الأصلي ($)</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? 1}
                  type="number"
                  step="0.2"
                  placeholder="اختياري"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Colors Input */}
        <Controller
          name="colors"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel>الألوان (مفصولة بفاصلة)</FieldLabel>
              <Input {...field} placeholder="#000000, #FFFFFF, #E91E8C" />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Price inputs */}
        <div className="w-full flex items-center gap-6">
          <Controller
            name="available"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <div className="flex gap-2">
                  <Switch
                    id="available"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <FieldLabel>متاح للعرض</FieldLabel>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="featured"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />

                  <FieldLabel>منتج مميز</FieldLabel>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Images Input */}
        <div>
          <Label className="block text-sm font-medium mb-2">
            (علر الأفل واحدة )صور المنتج
          </Label>

          {productImages.length === 0 && (
            <FileUpload
              onCancel={() => setProductImages([])}
              onFilesSelected={(files) => setProductImages(files)}
            />
          )}

          {/* Images Preview Grid */}
          {productImages.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {productImages.length} صورة محددة
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2 bg-muted/30 rounded-lg mt-4">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-border"
                  >
                    <div className="relative w-full pt-[100%] bg-linear-to-br from-muted to-background">
                      <Image
                        src={URL.createObjectURL(image)}
                        fill
                        alt={`معاينة ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = productImages.filter(
                            (_, i) => i !== index
                          );
                          setProductImages(newImages);
                        }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-lg hover:bg-destructive/90 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      {/* Index Badge */}
                      <div className="absolute bottom-2 left-2 bg-foreground/60 text-background text-xs px-2 py-1 rounded-full font-medium">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || isPending}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          {isPending || isLoading
            ? "جاري الحفظ..."
            : product
            ? "تحديث المنتج"
            : "إضافة المنتج"}
        </Button>
      </form>
    </Form>
  );
}
