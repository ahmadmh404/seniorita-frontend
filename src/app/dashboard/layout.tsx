import type React from "react";
import { Suspense } from "react";
import { PageFallback } from "@/components/shared/page-fallback";
import { DashboardLayout } from "@/components/dashboard/dashboard-main-layout";
import { redirect } from "next/navigation";
import { verifyAccess } from "@/lib/api";

export default function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedLayout>{children}</SuspendedLayout>
    </Suspense>
  );
}

export async function SuspendedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { valid } = await verifyAccess();
  if (!valid) redirect("/login");

  return <DashboardLayout>{children}</DashboardLayout>;
}
