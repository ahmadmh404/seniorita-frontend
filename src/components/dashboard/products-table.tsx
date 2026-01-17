import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatFullMediaURL } from "@/lib/formatters";
import { Button } from "../ui/button";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
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
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "@/lib/api";
import { toast } from "sonner";
import { ProductDialog } from "./product-dialog";
import { useGetProducts } from "@/lib/hooks/use-products";

interface ProductsTableProps {
  search: string;
}

export function ProductsTable({ search }: ProductsTableProps) {
  const [isPending, startTransition] = useTransition();

  const { data } = useGetProducts();
  const products = data?.pages.flatMap((page) => page.data) || [];
  const filteredProducts = products?.filter((p) => p.name.includes(search));

  // handle product availability toggle
  function handleToggleAvailability(productId: string, available: boolean) {
    startTransition(async () => {
      const response = await toggleProductAvailability(productId, available);
      if (response.error) {
        toast.error("حدث هطأ ما! الرجاء المحاولة");
      }

      toast.success("تم تغيير حالة المنتج");
    });
  }

  // handle product deletion
  function handleDelete(productId: string) {
    startTransition(async () => {
      const response = await deleteProduct(productId);
      if (response?.error) {
        toast.error("حدث هطأ ما! الرجاء المحاولة");
      }

      toast.success("تم حذف المنتج");
    });
  }

  return (
    <div className="bg-background rounded-xl border border-border overflow-hidden">
      <Table aria-invalid={isPending}>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right font-semibold">المنتج</TableHead>
            <TableHead className="text-right font-semibold">القسم</TableHead>
            <TableHead className="text-right font-semibold">السعر</TableHead>
            <TableHead className="text-right font-semibold">الحالة</TableHead>
            <TableHead className="text-right font-semibold">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                لا توجد منتجات
              </TableCell>
            </TableRow>
          ) : (
            filteredProducts?.map((product) => (
              <TableRow key={product.documentId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream">
                      <Image
                        src={formatFullMediaURL(product.images[0].url)}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.nameEn}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {product?.category.name || "لا ينتمي إلى أي قسم"}{" "}
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    ${product.price.toFixed(2)}
                  </span>{" "}
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through mr-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      product.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.available ? "متاح" : "مخفي"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        handleToggleAvailability(
                          product.documentId,
                          product.available
                        );
                      }}
                      title={product.available ? "إخفاء" : "إظهار"}
                    >
                      {product.available ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <ProductDialog product={product}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </ProductDialog>
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
                            هل أنت متأكد من حذف المنتج &quot;{product.name}
                            &quot;؟ لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.documentId)}
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
