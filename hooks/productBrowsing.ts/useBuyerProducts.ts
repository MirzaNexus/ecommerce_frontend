import { useFetch } from "@/hooks/useFetch";
import { productService } from "@/services/productBrowsingService";

import {
  ProductQueryParams,
  BuyerProductResponse,
  PaginatedResponse,
  productKeys,
} from "@/types/productBrowsing.types";

export function useBuyerProducts(params: ProductQueryParams) {
  return useFetch<PaginatedResponse<BuyerProductResponse>>(
    productKeys.list(params),
    () => productService.getBuyerProducts(params),
    {
      // We keep previous data to prevent layout flickering during pagination/filtering
      placeholderData: (previousData) => previousData,
      staleTime: 1000 * 60 * 5, // 5 minutes cache as per your useFetch default
    },
  );
}
