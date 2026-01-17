"use client";

import { LoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { login } from "@/lib/api";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const response = await login(data, redirect);
      if (response.error) {
        toast.error(response.error ?? "حدث خطأ ما, الرجاء المحاولة مرة اخرى");
        return;
      }
    });
  }

  return (
    <div className="min-h-screen flex">
      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-block mb-8">
            <Image
              src="/images/logo.png"
              alt="سنيوريتا"
              width={140}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          <h1 className="text-3xl font-bold mb-2">تسجيل الدخول</h1>
          <p className="text-muted mb-8">أدخل بياناتك للوصول إلى لوحة التحكم</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <Controller
                name="identifier"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel>البريد الإلكتروني</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="admin@senorita.com"
                      required
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel>كلمة المرور</FieldLabel>

                    <Input {...field} type="password" placeholder="••••••••" />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary-dark"
              >
                {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block flex-1 relative">
        <Image
          src="/placeholder.svg?height=1000&width=800"
          alt="سنيوريتا"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/20" />
      </div>
    </div>
  );
}
