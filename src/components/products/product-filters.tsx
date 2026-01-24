"use client";

import { useState, useEffect, useEffectEvent, useTransition } from "react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Category } from "@/lib/types";

interface ProductFiltersProps {
  categories: Category[];
}

const defaultColors = [
  { value: "#000000", label: "أسود" },
  { value: "#FFFFFF", label: "أبيض" },
  { value: "#8B4513", label: "بني" },
  { value: "#C9A962", label: "ذهبي" },
  { value: "#C0C0C0", label: "فضي" },
  { value: "#E91E8C", label: "وردي" },
  { value: "#8B0000", label: "أحمر" },
  { value: "#4B0082", label: "بنفسجي" },
];

/**
 * Filters type
 */

interface Filters {
  price: [number, number];
  colors: string[];
  category: string;
  sort: "asc" | "desc";
}

/**
 * Filters Initial Value
 */

const initialFilters: Filters = {
  price: [0, 500],
  colors: [],
  category: "",
  sort: "desc",
};

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<Filters>(initialFilters);

  /**
   * Handle Change Colors Filter
   */
  function handleChangeFilters(fs: Partial<Filters>) {
    const newFilters = { ...filters, ...fs };
    setFilters(newFilters);
  }

  /**
   * Toggle Colors filter
   */
  function toggleColor(color: string) {
    const newColorsFilter = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];

    setFilters((prev) => ({ ...prev, colors: newColorsFilter }));
  }

  /**
   * Handle Change Filters
   */
  const updateFiltersEffect = useEffectEvent(
    (searchParams: ReadonlyURLSearchParams) => {
      const colors = searchParams.get("colors")?.split(",") || [];
      const minPrice = Number(searchParams.get("minPrice")) || 0;
      const maxPrice = Number(searchParams.get("maxPrice")) || 500;
      const category = searchParams.get("category") || "";
      handleChangeFilters({
        price: [minPrice, maxPrice],
        colors: colors,
        category,
      });
    },
  );

  /**
   * Apply Filters
   */
  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.colors.length > 0) {
      params.set("colors", filters.colors.join(","));
    } else {
      params.delete("colors");
    }

    if (filters.price[0] > 0) {
      params.set("minPrice", String(filters.price[0]));
    } else {
      params.delete("minPrice");
    }

    if (filters.price[1] < 500) {
      params.set("maxPrice", String(filters.price[1]));
    } else {
      params.delete("maxPrice");
    }

    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  /**
   * Clear Filters
   */
  function clearFilters() {
    setFilters(initialFilters);
  }

  useEffect(() => {
    updateFiltersEffect(searchParams);
  }, [searchParams]);

  return (
    <div className="bg-card rounded-xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">تصفية النتائج</h3>
        <Button
          disabled={isPending}
          variant="ghost"
          size="sm"
          onClick={clearFilters}
        >
          مسح الكل
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "price", "colors"]}
        className="space-y-4"
      >
        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-medium">
              القسم
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={filters.category === cat.slug}
                      onCheckedChange={() =>
                        handleChangeFilters({
                          category:
                            filters.category === cat.slug ? "" : cat.slug,
                        })
                      }
                    />
                    <span className="text-sm">{cat.name}</span>
                    <span className="text-xs text-muted mr-auto">
                      ({cat.productCount})
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            السعر
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <Slider
                value={filters.price}
                onValueChange={(price) =>
                  handleChangeFilters({ price: price as [number, number] })
                }
                min={0}
                max={500}
                step={10}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${filters.price[0]}</span>
                <span>${filters.price[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-medium">
            اللون
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {defaultColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => toggleColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    filters.colors.includes(color.value)
                      ? "border-primary scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        disabled={isPending}
        onClick={applyFilters}
        className="w-full mt-6 bg-primary hover:bg-primary-dark"
      >
        تطبيق الفلترة
      </Button>
    </div>
  );
}
