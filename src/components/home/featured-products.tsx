import { getFeaturedProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/product-card";

export async function FeaturedProducts() {
  const { data: products } = await getFeaturedProducts();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">الأكثر مبيعاً</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.documentId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
