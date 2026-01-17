import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CategoryForm } from "./category-form";
import { Category } from "@/lib/types";

interface CategoryDialogProps {
  children: ReactNode;
  category?: Category;
}

export function CategoryDialog({ children, category }: CategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {category ? "تعديل القسم" : "إضافة قسم جديد"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm category={category} />
      </DialogContent>
    </Dialog>
  );
}
