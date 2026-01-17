import { Suspense } from "react";
import { PageFallback } from "@/components/shared/page-fallback";
import { DashboardCategories } from "@/components/dashboard/dashboard-categories";

export default function CategoriesPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

async function SuspendedPage() {
  return <DashboardCategories />;
}
