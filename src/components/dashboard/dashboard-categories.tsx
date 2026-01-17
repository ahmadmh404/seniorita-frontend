"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { CategoryDialog } from "./category-dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { CategoriesTable } from "./categories-table";

export function DashboardCategories() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">إدارة الأقسام</h1>
        <CategoryDialog>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="h-5 w-5 ml-2" />
            إضافة قسم
          </Button>
        </CategoryDialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="البحث عن قسم..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Categories Table */}
      <CategoriesTable search={search} />
    </div>
  );
}
