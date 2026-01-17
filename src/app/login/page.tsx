import { LoginForm } from "@/components/auth/login-form";
import { PageFallback } from "@/components/shared/page-fallback";
import { getCookie } from "@/lib/cookies-store";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تسجيل الدخول | سنيوريتا - لوحة التحكم",
  description: "تسجيل الدخول إلى لوحة تحكم سنيوريتا - معرض السيدات",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export async function SuspendedPage() {
  const adminToken = await getCookie("admin_token");
  if (adminToken != null) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
