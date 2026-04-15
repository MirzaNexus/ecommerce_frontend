"use client";

import { useFetch } from "@/hooks/useFetch";
import { fetchProducts } from "@/services/productService";
import { useMemo } from "react";
import { keepPreviousData } from "@tanstack/react-query";

interface UseProductsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  categoryId?: string;
}

export function useProducts(params: UseProductsParams) {
  const queryKey = useMemo(() => ["products", params], [params]);

  return useFetch(queryKey, () => fetchProducts(params), {
    placeholderData: keepPreviousData,
  });
}
