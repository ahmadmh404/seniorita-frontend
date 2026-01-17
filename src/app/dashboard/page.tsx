import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { DashboardStatsFallback } from "@/components/dashboard/fallbacks";
import { PageFallback } from "@/components/shared/page-fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/api";
import { formatFullMediaURL } from "@/lib/formatters";
import Image from "next/image";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <SuspendedPage />
    </Suspense>
  );
}

async function SuspendedPage() {
  const { data: products } = await getProducts({});

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

      {/* Stats Grid */}
      <Suspense fallback={<DashboardStatsFallback />}>
        <DashboardStats />
      </Suspense>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>أحدث المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products?.slice(0, 5).map((product) => (
              <div
                key={product.documentId}
                className="flex items-center gap-4 p-4 rounded-lg bg-cream"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={formatFullMediaURL(product.images[0].url)}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted">
                    {product?.category.name || "لا ينتمي إلى أي قسم"}
                  </p>
                </div>
                <div className="text-left">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.available ? "متاح" : "غير متاح"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
