import api from "./apiClient";

import {
  PaginatedProducts,
  Product,
  ProductQueryParams,
  ProductStatus,
} from "@/types/product.types";

import { deepSanitize } from "@/utils/sanitizer";

const BASE_URL = "/products";

/* -------------------- GET PRODUCTS -------------------- */
export async function fetchProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
}) {
  const res = await api.get<PaginatedProducts>(BASE_URL, {
    params,
  });

  return res.data;
}

export const productApi = {
  /**
   * Fetch products for Admin with server-side filtering and pagination
   */
  getAdminProducts: async (
    params: ProductQueryParams,
  ): Promise<PaginatedProducts> => {
    const cleanParams = deepSanitize(params);
    const { data } = await api.get<PaginatedProducts>("/products", {
      params: cleanParams,
    });
    return data;
  },

  /**
   * Fetch a single product by ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },

  /**
   * Create Product (Multipart/FormData)
   */
  createProduct: async (formData: FormData): Promise<Product> => {
    const { data } = await api.post<Product>("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  /**
   * Update Product Core Data
   */
  updateProduct: async (id: string, formData: FormData): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  /**
   * Toggle between DRAFT and PUBLISHED
   */
  toggleStatus: async (id: string): Promise<Product> => {
    const { data } = await api.patch<Product>(`/products/${id}/toggle-status`);
    return data;
  },

  /**
   * Soft delete / Archive
   */
  archiveProduct: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>(
      `/products/${id}/archive`,
    );
    return data;
  },

  /**
   * Full delete
   */
  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/products/${id}`);
    return data;
  },
};
