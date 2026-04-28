"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import { productApi } from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";

/* -------------------- CREATE -------------------- */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(productApi.createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- UPDATE -------------------- */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(
    ({ id, data }: { id: string; data: any }) =>
      productApi.updateProduct(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    },
  );
}

/* -------------------- DELETE -------------------- */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(productApi.deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- TOGGLE -------------------- */
export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutationHook(productApi.toggleStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- ARCHIVE ---------------- */
export function useArchiveProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(productApi.archiveProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
