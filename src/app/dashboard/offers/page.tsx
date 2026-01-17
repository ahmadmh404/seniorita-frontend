import { Suspense } from "react";
import { PageFallback } from "@/components/shared/page-fallback";
import { getProducts } from "@/lib/api";
import { DashboardOffers } from "@/components/dashboard/dashboard-offers";
import { getOffers } from "@/lib/api/offers";

export default function DashboardOffersPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

export async function SuspendedPage() {
  const offers = await getOffers();

  return <DashboardOffers offers={offers} />;
}
