// hooks/dashboard/useDashboardStats.ts
import { useFetch } from "@/hooks/useFetch"; // Aapka standard wrapper
import { productApi } from "@/services/productService";
import { categoryService } from "@/services/categoryService";
import { ProductStatus } from "@/types/product.types";

export function useDashboardStats() {
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useFetch(["admin-stats-products"], () =>
    productApi.getAdminProducts({
      status: ProductStatus.PUBLISHED, // Direct string "published" ki jagah Enum use karein
      limit: 1,
    }),
  );

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useFetch(["admin-stats-categories"], () => categoryService.getAll());

  const stats = {
    totalPublishedProducts: productsData?.meta?.total ?? 0,
    totalCategories: categoriesData?.length ?? 0,
  };

  return {
    stats,
    isLoading: isProductsLoading || isCategoriesLoading,
    isError: isProductsError || isCategoriesError,
  };
}
