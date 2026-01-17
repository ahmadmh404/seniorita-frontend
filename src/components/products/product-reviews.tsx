// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Star } from "lucide-react";
// import { useProductReviews, useCreateReview } from "@/lib/hooks/use-reviews";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";

// interface ProductReviewsProps {
//   productId: string;
// }

// export function ProductReviews({ productId }: ProductReviewsProps) {
//   const { data: reviews, isLoading } = useProductReviews(productId);
//   const createReview = useCreateReview();
//   const { toast } = useToast();

//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [rating, setRating] = useState(5);
//   const [userName, setUserName] = useState("");
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userName.trim() || !comment.trim()) {
//       toast({
//         title: "خطأ",
//         description: "يرجى ملء جميع الحقول",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await createReview.mutateAsync({
//         productId,
//         data: { userName, rating, comment },
//       });

//       toast({
//         title: "تم إضافة التقييم",
//         description: "شكراً لمشاركة رأيك معنا",
//       });

//       setIsFormOpen(false);
//       setUserName("");
//       setComment("");
//       setRating(5);
//     } catch {
//       toast({
//         title: "خطأ",
//         description: "حدث خطأ أثناء إضافة التقييم",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="mt-12">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-2xl font-bold">التقييمات والمراجعات</h3>
//         <Button onClick={() => setIsFormOpen(!isFormOpen)} variant="outline">
//           {isFormOpen ? "إلغاء" : "أضف تقييمك"}
//         </Button>
//       </div>

//       {/* Review Form */}
//       {isFormOpen && (
//         <form onSubmit={handleSubmit} className="bg-cream rounded-xl p-6 mb-8">
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">تقييمك</label>
//             <div className="flex gap-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   onClick={() => setRating(star)}
//                   className="p-1"
//                 >
//                   <Star
//                     className={`h-6 w-6 transition-colors ${
//                       star <= rating
//                         ? "fill-secondary text-secondary"
//                         : "text-border"
//                     }`}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">الاسم</label>
//             <Input
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="اسمك"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">تعليقك</label>
//             <Textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="شاركنا تجربتك مع المنتج..."
//               rows={4}
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             disabled={createReview.isPending}
//             className="bg-primary hover:bg-primary-dark"
//           >
//             {createReview.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
//           </Button>
//         </form>
//       )}

//       {/* Reviews List */}
//       {isLoading ? (
//         <div className="text-center py-8 text-muted">
//           جاري تحميل التقييمات...
//         </div>
//       ) : reviews && reviews.length > 0 ? (
//         <div className="space-y-6">
//           {reviews.map((review) => (
//             <div key={review.id} className="border-b border-border pb-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
//                   <span className="text-primary font-bold">
//                     {review.userName.charAt(0)}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-medium">{review.userName}</p>
//                   <div className="flex items-center gap-2">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < review.rating
//                               ? "fill-secondary text-secondary"
//                               : "text-border"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-muted">
//                       {new Date(review.createdAt).toLocaleDateString("ar-SA")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-muted">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-8 text-muted">
//           لا توجد تقييمات حتى الآن. كن أول من يقيم هذا المنتج!
//         </div>
//       )}
//     </div>
//   );
// }
