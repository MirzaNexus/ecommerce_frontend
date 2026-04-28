import { ProductStatus } from "./product.types";

/**
 * Variant and Attribute Types
 */
export interface VariantAttributes {
  color?: string;
  size?: string;
  material?: string;
}

export interface VariantResponse {
  id: string;
  sku: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  attributes: VariantAttributes;
}

/**
 * Detailed Product Response (Admin/Product Detail)
 */
export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  isPublished: boolean;
  status: ProductStatus;
  basePrice: number;
  slug: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  variants?: VariantResponse[];
}

export interface BuyerProductResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  categoryName: string;
  categoryId: string;
  variantCount: number;
  minPrice: number;
  maxPrice: number;
}

export interface ProductQueryParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  material?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "trending";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const productKeys = {
  all: ["buyer-products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: ProductQueryParams) =>
    [...productKeys.lists(), { ...params }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  search: (query: string) => [...productKeys.all, "search", query] as const,
};
