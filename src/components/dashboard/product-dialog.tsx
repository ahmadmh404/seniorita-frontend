import { Product } from "@/lib/types";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ProductForm } from "./product-form";
import { ScrollArea } from "../ui/scroll-area";

interface ProductDialogProps {
  children: ReactNode;
  product?: Product;
}

export function ProductDialog({ children, product }: ProductDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90%] py-10">
        <DialogHeader>
          <DialogTitle>
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[500px]">
          <ProductForm product={product} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
