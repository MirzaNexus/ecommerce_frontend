import {
  Category,
  CategoryTreeNode,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../types/category.types";
import apiClient from "./apiClient";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await apiClient.get("/categories");
    return res.data;
  },

  getTree: async (): Promise<CategoryTreeNode[]> => {
    const res = await apiClient.get("/categories/tree");
    return res.data;
  },

  create: async (payload: CreateCategoryPayload): Promise<Category> => {
    const res = await apiClient.post("/categories", payload);
    return res.data;
  },

  update: async (
    id: string,
    payload: UpdateCategoryPayload,
  ): Promise<Category> => {
    const res = await apiClient.put(`/categories/${id}`, payload);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
