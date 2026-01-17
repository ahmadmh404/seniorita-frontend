"use client";

import { DataPage, Product } from "@/lib/types";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ProductDialog } from "./product-dialog";
import { ProductsTable } from "./products-table";

// interface DashboardProductsProp {
//   products: DataPage<Product>;
// }

export function DashboardProducts() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
        <ProductDialog>
          <Button className="bg-primary hover:bg-primary-dark">
            <Plus className="h-5 w-5 ml-2" />
            إضافة منتج
          </Button>
        </ProductDialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="البحث عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value ?? "")}
          className="max-w-md"
        />
      </div>

      {/* Products Table */}
      <ProductsTable search={search} />
    </div>
  );
}
