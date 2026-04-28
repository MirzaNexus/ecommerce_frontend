"use client";

import { useFetch } from "@/hooks/useFetch";
import { fetchProducts } from "@/services/productService";
import { keepPreviousData } from "@tanstack/react-query";

interface UseProductsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  categoryId?: string;
}

export function useProducts({
  page,
  limit,
  search,
  status,
  categoryId,
}: UseProductsParams) {
  const VALID_STATUS = ["draft", "published", "archived"];

  const safeStatus = VALID_STATUS.includes(status || "") ? status : undefined;

  return useFetch(
    [
      "products",
      page,
      limit,
      search ?? null,
      safeStatus ?? null,
      categoryId ?? null,
    ],
    () =>
      fetchProducts({
        page,
        limit,
        search: search || undefined,
        status: safeStatus,
        categoryId: categoryId || undefined,
      }),
    {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    },
  );
}
