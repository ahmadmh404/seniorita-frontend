import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group bg-card rounded-xl overflow-hidden card-hover">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-cream">
          <Image
            src={product.images.at(0)?.url ?? ""}
            alt={product.name}
            fill
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
          />
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
            <Button className="w-full bg-white text-foreground hover:bg-primary hover:text-white">
              عرض سريع
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        {product.category && (
          <Link href={`/categories/${product.category.slug}`}>
            <span className="text-xs text-muted hover:text-primary transition-colors">
              {product?.category.name || "لا ينتمي إلى أي قسم"}
            </span>
          </Link>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium mt-1 mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-yellow-500"
              }`}
            />
          ))}
          <span className="text-xs text-muted mr-1">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.id}
                className="block w-5 h-5 rounded-full border border-border"
                style={{ backgroundColor: c.color }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted self-center">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
