import { OffersFallback } from "@/components/offers/fallback";
import { OffersGrid } from "@/components/offers/offer-grid";
import { getOffers } from "@/lib/api/offers";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "العروض",
  description: "متجر سينيوريتا - العروض و الحسومات علر المنتجات",
  robots: {
    index: true,
    follow: true,
  },
};

export default function OffersPage(props: PageProps<"/offers">) {
  return (
    <Suspense>
      <SuspendedPage {...props} />
    </Suspense>
  );
}

async function SuspendedPage(props: PageProps<"/offers">) {
  // const { data } = await getOffers();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">جميع العروض</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          سارعي إلر الإستفادة من عروضنا و خصومنا علر الأنواع المختلفة من
          منتجاتنا
        </p>
      </div>

      <Suspense fallback={<OffersFallback />}>
        <OffersGrid />
      </Suspense>
    </div>
  );
}
