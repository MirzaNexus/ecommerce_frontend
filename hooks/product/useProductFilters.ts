"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useProductFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const getParam = (key: string, defaultValue?: string) =>
    params.get(key) || defaultValue;

  const page = Number(getParam("page", "1"));
  const limit = Number(getParam("limit", "10"));
  const search = getParam("search", "");
  const status = getParam("status", "");
  const categoryId = getParam("categoryId", "");

  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const query = new URLSearchParams(params.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (!value) {
          query.delete(key);
        } else {
          query.set(key, String(value));
        }
      });

      // Reset page if filters change
      if (
        "search" in newParams ||
        "status" in newParams ||
        "categoryId" in newParams
      ) {
        query.set("page", "1");
      }

      router.push(`/admin/products?${query.toString()}`);
    },
    [params, router],
  );

  return {
    page,
    limit,
    search,
    status,
    categoryId,
    updateParams,
  };
}
