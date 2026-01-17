"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCTS_SORT_OPTIONS } from "@/lib/constant";

export function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort") || "newest";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleSort}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="ترتيب حسب" />
      </SelectTrigger>
      <SelectContent>
        {PRODUCTS_SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
