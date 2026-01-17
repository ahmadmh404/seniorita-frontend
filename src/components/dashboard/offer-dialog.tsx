import { Offer, Product } from "@/lib/types";
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
import { OfferForm } from "./offer-form";

interface OfferDialogProps {
  children: ReactNode;
  offer?: Offer;
}

export function OfferDialog({ children, offer }: OfferDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-96 py-10">
        <DialogHeader>
          <DialogTitle>{offer ? "تعديل العرض" : "إضافة عرض جديد"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-50">
          <OfferForm offer={offer} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
