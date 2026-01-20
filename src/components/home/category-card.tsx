import { productDescriptionRenderer } from "@/lib/formatters";
import { Category } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCArd({ category }: CategoryCardProps) {
  return (
    <Link
      key={category.slug}
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-4/3"
    >
      <Image
        src={category.image.url}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
        <h2 className="text-3xl font-bold text-background mb-2">
          {category.name}
        </h2>
        <p className="text-foreground/80 mb-4">
          {productDescriptionRenderer(category.description)}
        </p>
        <span className="text-foreground/60">
          {/* {category.productCount} منتج */}
        </span>
        <span className="mt-4 px-8 py-3 bg-background text-foreground font-medium rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
          تصفح القسم
        </span>
      </div>
    </Link>
  );
}
