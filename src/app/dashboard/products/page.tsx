import { Suspense } from "react";
import { DashboardProducts } from "@/components/dashboard/dashboard-products";
import { PageFallback } from "@/components/shared/page-fallback";
import { getProducts } from "@/lib/api";

export default function DashboardProductsPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export async function SuspendedPage() {
  return <DashboardProducts />;
}
