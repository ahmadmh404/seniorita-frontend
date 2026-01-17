import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Offer } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import { formatFullMediaURL } from "@/lib/formatters";

interface OfferCardProps {
  offer: Offer;
  index: number;
}

export function OfferCard({ offer, index }: OfferCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      key={offer.documentId}
      className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {offer.image && (
        <div className="relative h-48 w-full">
          <Image
            src={formatFullMediaURL(offer.image.url)}
            alt={offer.image.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{offer.title}</CardTitle>
          <Badge variant="default">حسم {offer.discountValue}%</Badge>
        </div>
        {offer.description && (
          <CardDescription>{offer.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>صالح حتى: {formatDate(offer.endDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
