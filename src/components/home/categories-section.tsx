import { getCategories } from "@/lib/api";
import {
  formatFullMediaURL,
  productDescriptionRenderer,
} from "@/lib/formatters";
import Link from "next/link";
import Image from "next/image";

export async function CategoriesSection() {
  const { data: categories } = await getCategories();

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-10">مجموعاتنا المميزة</h2>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[800px] md:h-[600px]">
          {categories.slice(0, 4).map((category, index) => (
            <Link
              key={category.documentId}
              href={`/categories/${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl transition-all duration-500 
                ${index === 0 ? "md:col-span-2 md:row-span-2" : ""} 
                ${index === 3 ? "md:col-span-2" : "md:col-span-1"}
              `}
            >
              <Image
                src={formatFullMediaURL(category.image.url)}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                  {productDescriptionRenderer(category.description)}
                </p>
                <div className="mt-4 w-fit px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  تصفح الآن
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
