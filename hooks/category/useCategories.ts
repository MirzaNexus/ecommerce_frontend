import { categoryService } from "@/services/categoryService";
import { useFetch } from "../useFetch";
import { CategoryTreeNode } from "@/types/category.types";

export const CATEGORY_KEYS = {
  tree: ["categories-tree"] as const,
};

export const useCategoryTree = () => {
  return useFetch<CategoryTreeNode[]>(
    CATEGORY_KEYS.tree,
    categoryService.getTree,
  );
};
