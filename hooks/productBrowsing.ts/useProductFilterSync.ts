"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductQueryParams } from "@/types/productBrowsing.types";

export function useBuyerFilterSync() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Define strictly what a Buyer is allowed to filter by
  const ALLOWED_BUYER_PARAMS = [
    "page",
    "limit",
    "search",
    "categoryId",
    "minPrice",
    "maxPrice",
    "color",
    "size",
    "material",
    "sortBy",
  ] as const;

  // 2. Memoized current filters to prevent unnecessary re-renders
  const filters = useMemo(() => {
    const params: Partial<ProductQueryParams> = {};

    ALLOWED_BUYER_PARAMS.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        // Handle numeric conversions for specific keys
        if (["page", "limit", "minPrice", "maxPrice"].includes(key)) {
          params[key as keyof ProductQueryParams] = Number(value) as any;
        } else {
          params[key as keyof ProductQueryParams] = value as any;
        }
      }
    });

    // Set Defaults
    return {
      page: params.page || 1,
      limit: params.limit || 12,
      sortBy: params.sortBy || "newest",
      ...params,
    } as ProductQueryParams;
  }, [searchParams]);

  // 3. Update Logic with Security Filtering
  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined | null>) => {
      const current = new URLSearchParams(window.location.search);
      const query = new URLSearchParams(current.toString()); // Start fresh or based on current

      // Only carry over allowed buyer params from the current URL
      ALLOWED_BUYER_PARAMS.forEach((key) => {
        const val = current.get(key);
        if (val) query.set(key, val);
      });

      let changed = false;

      // Apply new changes
      Object.entries(newParams).forEach(([key, value]) => {
        // SECURITY GATE: Ignore if the key is not in the allowed list (e.g., 'status')
        if (!ALLOWED_BUYER_PARAMS.includes(key as any)) {
          console.warn(
            `Action Blocked: Buyer is not allowed to filter by '${key}'`,
          );
          return;
        }

        const stringValue =
          value !== undefined && value !== null ? String(value) : "";

        if (query.get(key) !== stringValue) {
          changed = true;
        }

        if (!stringValue) {
          query.delete(key);
        } else {
          query.set(key, stringValue);
        }
      });

      // 4. Reset to Page 1 if any filter (except page itself) is modified
      const isPaginationChange =
        Object.keys(newParams).length === 1 && "page" in newParams;
      if (!isPaginationChange && changed) {
        if (query.get("page") !== "1") {
          query.set("page", "1");
        }
      }

      if (!changed) return;

      // 5. Navigate (Always stays in Buyer context)
      router.push(`${window.location.pathname}?${query.toString()}`, {
        scroll: false,
      });
    },
    [router],
  );

  const removeParam = useCallback(
    (key: keyof ProductQueryParams) => {
      updateParams({ [key]: null });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return {
    filters,
    updateParams,
    clearFilters,
    removeParam,
  };
}
