"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  archiveProduct,
} from "@/services/productService";
import { useQueryClient } from "@tanstack/react-query";

/* -------------------- CREATE -------------------- */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- UPDATE -------------------- */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(
    ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
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

  return useMutationHook(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- TOGGLE -------------------- */
export function useToggleProductStatus() {
  const queryClient = useQueryClient();

  return useMutationHook(toggleProductStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/* -------------------- ARCHIVE -------------------- */
export function useArchiveProduct() {
  const queryClient = useQueryClient();

  return useMutationHook(archiveProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
