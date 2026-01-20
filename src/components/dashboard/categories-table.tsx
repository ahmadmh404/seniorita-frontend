import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Pencil, Trash2 } from "lucide-react";
import {} from "@/lib/formatters";
import { CategoryDialog } from "./category-dialog";
import { useTransition } from "react";
import { deleteCategory } from "@/lib/api";
import { useGetCategories } from "@/lib/hooks/use-categories";

interface CategoriesTablePros {
  search: string;
}

export function CategoriesTable({ search }: CategoriesTablePros) {
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useGetCategories();

  const categories = data?.pages.flatMap((page) => page.data) || [];
  const filteredCategories = categories?.filter((c) => c.name.includes(search));

  function handleDelete(categoryId: string) {
    startTransition(async () => {
      await deleteCategory(categoryId);
    });
  }

  return (
    <div className="bg-background rounded-xl border border-border overflow-hidden">
      <Table aria-disabled={isPending || isLoading}>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right font-semibold">القسم</TableHead>
            <TableHead className="text-right font-semibold">الرابط</TableHead>
            <TableHead className="text-right font-semibold">
              عدد المنتجات
            </TableHead>
            <TableHead className="text-right font-semibold">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted">
                لا توجد أقسام
              </TableCell>
            </TableRow>
          ) : (
            filteredCategories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream">
                      <Image
                        src={category.image.url}
                        alt={category.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted">{category.nameEn}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <code
                    dir="ltr"
                    className="text-sm bg-cream px-2 py-1 rounded"
                  >
                    /{category.slug}
                  </code>
                </TableCell>
                <TableCell>{category.products.length || 0} منتج</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CategoryDialog category={category}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </CategoryDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف القسم &quot;{category.name}
                            &quot;؟ لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
