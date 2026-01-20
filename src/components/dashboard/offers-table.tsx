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
import { DataPage, Offer } from "@/lib/types";
import { useGetOffers } from "@/lib/hooks/use-offers";
import { OfferDialog } from "./offer-dialog";

interface OffersTable {
  search: string;
  offers: DataPage<Offer>;
}

export function OffersTable({ search }: OffersTable) {
  const [isPending, startTransition] = useTransition();

  const { data } = useGetOffers();
  const offers = data?.pages.flatMap((page) => page.data) || [];
  const filteredOffers = offers?.filter((p) => p.name.includes(search));

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
            <TableHead className="text-right font-semibold">العرض</TableHead>
            <TableHead className="text-right font-semibold">الخصم</TableHead>
            <TableHead className="text-right font-semibold">
              تاريخ البداية
            </TableHead>
            <TableHead className="text-right font-semibold">
              تاريخ النهاية
            </TableHead>
            <TableHead className="text-right font-semibold">
              الإجراءات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOffers?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                لا توجد عروض
              </TableCell>
            </TableRow>
          ) : (
            filteredOffers?.map((offer) => (
              <TableRow key={offer.documentId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream">
                      <Image
                        src={offer.image.url}
                        alt={offer.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{offer.title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span>${offer.discountValue.toFixed(2)}%</span>
                </TableCell>
                <TableCell>
                  <span>{offer.startDate}</span>
                </TableCell>
                <TableCell>
                  <span>{offer.endDate}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        handleToggleAvailability(
                          offer.documentId,
                          offer.available,
                        );
                      }}
                      title={offer.available ? "إخفاء" : "إظهار"}
                    >
                      {offer.available ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <OfferDialog offer={offer}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </OfferDialog>
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
                            هل أنت متأكد من حذف المنتج &quot;{offer.name}
                            &quot;؟ لا يمكن التراجع عن هذا الإجراء.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(offer.documentId)}
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
