import { getSimilarProducts } from "@/lib/api";
import { ProductCard } from "./product-card";

interface SimilarProductsProps {
  productId: string;
  categoryId: string;
}

export async function SimilarProducts({
  productId,
  categoryId,
}: SimilarProductsProps) {
  const { data: products } = await getSimilarProducts({
    productId,
    categoryId,
  });

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 text-center">أكملي الإطلالة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </div>
  );
}
