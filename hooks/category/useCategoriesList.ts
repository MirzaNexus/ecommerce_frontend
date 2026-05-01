import { useFetch } from "@/hooks/useFetch";
import { categoryService } from "@/services/categoryService"; // Assuming this exists based on your snippet
import { Category } from "@/types/category.types";

export function useCategories() {
  return useFetch<Category[]>(
    ["categories", "list"],
    () => categoryService.getAll(),
    {
      staleTime: 1000 * 60 * 60, // 1 hour cache (categories don't change often)
    },
  );
}
