"use client";

import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferSchema } from "@/lib/schema";
import { Form } from "../ui/form";
import { Field, FieldLabel } from "../ui/field";
import { Label } from "../ui/label";
import { FileUpload } from "../shared/file-upload";
import { toast } from "sonner";
import Image from "next/image";
import z from "zod";
import { slugify } from "@/lib/utils";
import { Offer } from "@/lib/types";
import { Textarea } from "../ui/textarea";

interface OfferFormProps {
  offer?: Offer | null;
}

export function OfferForm({ offer }: OfferFormProps) {
  const [isPending, startTransition] = useTransition();
  const [offerImage, setOfferImage] = useState<File | null>(null);

  // RHF form setup
  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: offer
      ? {
          title: offer.title,
          slug: offer.slug,
          description: offer.description,
          discountValue: offer.discountValue.toString(),
          startDate: offer.startDate,
          endDate: offer.endDate,
        }
      : {
          title: "",
          slug: "",
          description: "",
          discountValue: "10",
          startDate: "",
          endDate: "",
        },
  });

  // name value for slug update
  const titleValue = form.watch("title");

  // form submit handler
  async function onSubmit(unsafe: z.infer<typeof OfferSchema>) {
    if (offerImage == null) {
      return { error: "يرجى إضافة صورة واحدة على الأقل للمنتج" };
    }

    console.log("unsafe: ", unsafe);
    startTransition(async () => {
      // const response = await (offer
      //   ? updateProduct(offer.documentId, unsafe, offerImage)
      //   : createProduct({ unsafe, images: offerImage }));

      // if (response.error) {
      //   toast.error(response.error);
      // }

      toast.success("تمت العملية ينجاح");
    });
  }

  // fetch offer image as File objects for preview
  const fetchProductImagesEvent = useEffectEvent(() => {
    let isMounted = true;

    const fetchImages = async (imageUrl: string) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${imageUrl}`);
        }

        const blob = await response.blob();

        if (isMounted) {
          setOfferImage(blob as File);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (offer?.image) {
      fetchImages(offer.image.url);
    }

    return () => {
      isMounted = false;
    };
  });

  // update the slug value with slugify(titleValue)
  const updateSlugEffect = useEffectEvent((name: string) => {
    form.setValue("slug", slugify(name));
  });

  // run on component mount
  useEffect(() => {
    fetchProductImagesEvent();
  }, []);

  // run when titleValue changes
  useEffect(() => {
    updateSlugEffect(titleValue);
  }, [titleValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title & Discount inputs */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>الإسم</FieldLabel>
                <Input {...field} placeholder="عنوان العرض" />
              </Field>
            )}
          />

          <Controller
            name="discountValue"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>الخصم (%)</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  step="0.2"
                  placeholder="إجباري"
                />
              </Field>
            )}
          />
        </div>

        {/* Image Input */}
        <div>
          <Label className="block text-sm font-medium mb-2">صورة العرض</Label>
          <FileUpload
            onCancel={() => setOfferImage(null)}
            onFilesSelected={(files) => {
              const file = files.at(0) ?? null;
              if (file == null) return;
              setOfferImage(file);
            }}
          />

          {/* Images Preview Grid */}
          {offerImage != null && (
            <div className="relative w-full pt-[100%] bg-linear-to-br from-muted to-background">
              <Image
                src={URL.createObjectURL(offerImage)}
                fill
                alt={`معاينة `}
                className="absolute inset-0 w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* ]شفث inputs */}
        <div className="flex items-center gap-6">
          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>تاريخ البدء</FieldLabel>
                <Input {...field} type="date" placeholder="اضغط للإختيار" />
              </Field>
            )}
          />

          <Controller
            name="startDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel>تاريخ البدء</FieldLabel>
                <Input {...field} type="date" placeholder="اضغط للإختيار" />
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
              <FieldLabel>الوصف</FieldLabel>
              <Textarea {...field} rows={3} placeholder="وصف العرض..." />
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          {isPending ? "جاري الحفظ..." : offer ? "تحديث العرض" : "إضافة العرض"}
        </Button>
      </form>
    </Form>
  );
}
