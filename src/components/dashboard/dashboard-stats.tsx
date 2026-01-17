import { getCategoriesCount, getProductsStats } from "@/lib/api";
import { FolderTree, Package, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export async function DashboardStats() {
  const { availableCount, featuredCount, productsCount } =
    await getProductsStats();

  const { count: categoriesCount } = await getCategoriesCount();

  const stats = [
    {
      title: "إجمالي المنتجات",
      value: productsCount,
      icon: Package,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "الأقسام",
      value: categoriesCount,
      icon: FolderTree,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "المنتجات المميزة",
      value: featuredCount,
      icon: Star,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "المنتجات المتاحة",
      value: availableCount,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
