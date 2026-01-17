"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getProductReviews, createReview } from "@/lib/api"

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  })
}

export function useCreateReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string
      data: { userName: string; rating: number; comment: string }
    }) => createReview(productId, data),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] })
      queryClient.invalidateQueries({ queryKey: ["product", productId] })
    },
  })
}
