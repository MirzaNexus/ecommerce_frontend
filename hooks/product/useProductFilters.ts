"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useProductFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const getParam = (key: string, defaultValue?: string) => {
    const value = params.get(key);
    return value !== null ? value : defaultValue;
  };

  const page = Number(getParam("page", "1"));
  const limit = Number(getParam("limit", "10"));

  const search = getParam("search", "");

  const VALID_STATUS = ["draft", "published", "archived"];
  const rawStatus = getParam("status", "");
  const status = VALID_STATUS.includes(rawStatus || "") ? rawStatus : "";

  const rawCategoryId = getParam("categoryId", "");
  const categoryId = rawCategoryId || "";

  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined>) => {
      const current = new URLSearchParams(window.location.search);
      const query = new URLSearchParams(current.toString());

      let changed = false;

      Object.entries(newParams).forEach(([key, value]) => {
        const stringValue =
          value !== undefined && value !== null ? String(value) : "";

        if (current.get(key) !== stringValue) {
          changed = true;
        }

        if (!value) {
          query.delete(key);
        } else {
          query.set(key, stringValue);
        }
      });

      if (
        "search" in newParams ||
        "status" in newParams ||
        "categoryId" in newParams
      ) {
        if (query.get("page") !== "1") {
          changed = true;
          query.set("page", "1");
        }
      }

      if (!changed) return;

      router.push(`/admin/products?${query.toString()}`);
    },
    [router],
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
