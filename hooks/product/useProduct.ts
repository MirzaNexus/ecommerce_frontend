"use client";

import { useFetch } from "@/hooks/useFetch";
import { productApi } from "@/services/productService";

export function useProduct(id: string) {
  return useFetch(
    ["product", id], // Specific Query Key for a single product
    () => productApi.getProductById(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    },
  );
}
