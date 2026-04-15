import { PaginatedProducts } from "../types/product.types";
import apiClient from "./apiClient";

const BASE_URL = "/products";

/* -------------------- GET PRODUCTS -------------------- */
export async function fetchProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
}) {
  const res = await apiClient.get<PaginatedProducts>(BASE_URL, {
    params,
  });

  return res.data;
}

/* -------------------- CREATE PRODUCT -------------------- */
export async function createProduct(formData: FormData) {
  const res = await apiClient.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/* -------------------- UPDATE PRODUCT -------------------- */
export async function updateProduct(
  id: string,
  data: FormData | Record<string, any>,
) {
  const isFormData = data instanceof FormData;

  const res = await apiClient.put(`${BASE_URL}/${id}`, data, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" },
  });

  return res.data;
}

/* -------------------- DELETE PRODUCT -------------------- */
export async function deleteProduct(id: string) {
  const res = await apiClient.delete(`${BASE_URL}/${id}`);
  return res.data;
}

/* -------------------- TOGGLE STATUS -------------------- */
export async function toggleProductStatus(id: string) {
  const res = await apiClient.patch(`${BASE_URL}/${id}/toggle-status`);
  return res.data;
}

/* -------------------- ARCHIVE PRODUCT -------------------- */
export async function archiveProduct(id: string) {
  const res = await apiClient.patch(`${BASE_URL}/${id}/archive`);
  return res.data;
}
