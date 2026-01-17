"use client";

import { useEffect, useEffectEvent, useState, useTransition } from "react";
import type { Category } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/lib/schema";
import { Form } from "../ui/form";
import z from "zod";
import { Field, FieldLabel } from "../ui/field";
import { FileUpload } from "../shared/file-upload";
import Image from "next/image";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/lib/api";
import { slugify } from "@/lib/utils";

interface CategoryFormProps {
  category?: Category | null;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: category
      ? {
          name: category.name,
          description: category.description,
          slug: category.slug,
        }
      : {
          name: "",
          description: "",
          slug: "",
        },
  });

  // name value for slug update
  const nameValue = form.watch("name");

  function onSubmit(unsafe: z.infer<typeof CategorySchema>) {
    if (categoryImage == null) {
      toast.error("يجب عليك إدهال صورة السم");
      return;
    }

    startTransition(async () => {
      const response = await (category
        ? updateCategory(category.documentId, unsafe, categoryImage)
        : createCategory(unsafe, categoryImage));
      if (response?.error) {
        toast.error(response.error);
        return;
      }
      toast.success("تم إنشاء القسم ينجاح");
    });
  }

  // update the slug value with slugify(nameValue)
  const updateSlugEffect = useEffectEvent((name: string) => {
    form.setValue("slug", slugify(name));
  });
  // run when nameValue changes
  useEffect(() => {
    updateSlugEffect(nameValue);
  }, [nameValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-4"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel>الإسم</FieldLabel>
              <Input {...field} placeholder="اسم القسم بالعربية" />
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="w-full" aria-invalid={fieldState.invalid}>
              <FieldLabel>الوصف</FieldLabel>
              <Textarea {...field} rows={3} placeholder="وصف القسم" />
            </Field>
          )}
        />

        <div className="relative space-x-2">
          <FileUpload
            acceptedTypes={["image"]}
            maxFiles={1}
            maxSizePerFile={5}
            onCancel={() => setCategoryImage(null)}
            onFilesSelected={(files) => {
              const file = files.at(0);
              if (file == null) return;
              setCategoryImage(file);
            }}
          />

          {categoryImage != null && (
            <Image
              src={URL.createObjectURL(categoryImage)}
              fill
              className="object-cover"
              alt={category?.name ?? "صورة القسم"}
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          {isPending
            ? "جاري الحفظ..."
            : category
            ? "تحديث القسم"
            : "إضافة القسم"}
        </Button>
      </form>
    </Form>
  );
}
