"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [query, setQuery] = useState(search || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearch() {
    if (query.trim() === "") return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("search", query);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-4">
      {isSearchOpen && (
        <div className="relative flex items-center gap-2">
          <Input
            placeholder="ابحث عن منتج..."
            className="w-48 md:w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value || "")}
            autoFocus
          />
          <Button
            className="absolute left-2"
            variant="ghost"
            size="icon"
            onClick={handleSearch}
          >
            <Search className="h-3 w-3" />
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen((prev) => !prev)}
      >
        {isSearchOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
        <span className="sr-only">{isSearchOpen ? "إلغاء" : "بحث"}</span>
      </Button>
    </div>
  );
}
