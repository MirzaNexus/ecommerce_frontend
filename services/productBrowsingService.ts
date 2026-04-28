import api from "./apiClient";

import {
  BuyerProductResponse,
  PaginatedResponse,
  ProductQueryParams,
  ProductResponse,
} from "@/types/productBrowsing.types";

export const productService = {
  /**
   * Fetches a paginated list of products for the Buyer view.
   * Backend handles dynamic variant filtering based on the query.
   */
  async getBuyerProducts(
    params: ProductQueryParams,
  ): Promise<PaginatedResponse<BuyerProductResponse>> {
    const { data } = await api.get<PaginatedResponse<BuyerProductResponse>>(
      "/products/buyer/list",
      { params },
    );
    return data;
  },

  async getProductById(id: string): Promise<ProductResponse> {
    const { data } = await api.get<ProductResponse>(`/products/${id}`);
    return data;
  },

  async searchProducts(query: string): Promise<BuyerProductResponse[]> {
    if (!query) return [];

    const { data } = await api.get<PaginatedResponse<BuyerProductResponse>>(
      "/products/buyer/list",
      {
        params: {
          search: query,
          limit: 5, // Return fewer items for a quick search dropdown
        },
      },
    );
    return data.data;
  },
};
