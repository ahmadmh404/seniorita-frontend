"use client";

import { ContactSchema } from "@/lib/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getOrganizationSchema } from "@/lib/seo-config";
import { StructuredData } from "../seo/structured-data";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Form } from "../ui/form";
import z from "zod";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
// import { emailJs } from "@/lib/email";
import { useTransition } from "react";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ContactSchema>) {
    startTransition(async () => {
      // const response = await emailJs.send(data);
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <StructuredData data={getOrganizationSchema()} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">اتصل بنا</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نحن هنا للإجابة على جميع استفساراتك. لا تترددي في التواصل معنا
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.href}
              className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <info.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.value}</p>
              </div>
            </a>
          ))}

          {/* Social Media */}
          <div className="p-6 rounded-xl bg-cream">
            <h3 className="font-bold mb-4">تابعينا على</h3>
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "snapchat"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <span className="text-xs font-bold uppercase">
                      {social.charAt(0)}
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>

              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        الاسم الكامل
                      </FieldLabel>
                      <Input id="name" {...field} placeholder="اسمك الكامل" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        البريد الإلكتروني
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        {...field}
                        placeholder="ahmad@abc.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium mb-2"
                        htmlFor="phone"
                      >
                        رقم الهاتف
                      </FieldLabel>
                      <Input
                        id="phone"
                        {...field}
                        placeholder="+963 987 654 321"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="subject"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium mb-2"
                        htmlFor="subject"
                      >
                        موضوع الرسالة
                      </FieldLabel>
                      <Input
                        id="subject"
                        {...field}
                        placeholder="اكتب موضوعا لا يقل عن 5 أحرف"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="mb-6">
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="block text-sm font-medium mb-2"
                        htmlFor="message"
                      >
                        الرسالة
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="message"
                          rows={5}
                          placeholder="اكتب رسالتك هنا..."
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/200 حرف
                          </InputGroupText>
                        </InputGroupAddon>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </InputGroup>
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-lg px-8"
              >
                إرسال الرسالة
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

const contactInfo = [
  {
    icon: Phone,
    title: "الهاتف",
    value: "+966 50 000 0000",
    href: "tel:+966500000000",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    value: "sirajshaddoud@gmail.com",
    href: "mailto:sirajshaddoud@gmail.com",
  },
  {
    icon: MapPin,
    title: "العنوان",
    value: "طرطوس | شارع الزهور | مقابل آفاق | بجانب ماي دريم",
    href: "#",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    value: "السبت - الخميس: 10 ص - 10 م",
    href: "#",
  },
];
