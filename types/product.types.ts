export enum ProductStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface Dimensions {
  height: number;
  width: number;
  length: number;
}

export interface VariantAttributes {
  color?: string;
  size?: string;
  material?: string;
  weight?: string;
  dimensions?: Dimensions;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock?: number;
  imageUrl?: string;
  attributes: VariantAttributes;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  isPublished: boolean;
  status: ProductStatus;
  basePrice: number;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  variants?: ProductVariant[];
}

export interface ProductPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  data: Product[];
  meta: ProductPaginationMeta;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProductStatus;
  categoryId?: string;
  isPublished?: boolean;
}
