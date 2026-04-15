export type UUID = string;

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

export interface Variant {
  id?: UUID;
  productId?: UUID;
  sku: string;
  price: number;
  image?: File | null;
  imageUrl?: string;
  stock?: number;
  attributes?: VariantAttributes;
}

export interface Product {
  id?: UUID;
  name: string;
  description?: string;
  categoryId: UUID;
  isPublished?: boolean;
  status?: ProductStatus;
  basePrice?: number;
  slug?: string;
  image?: File | null;
  imageUrl?: string;
  variants: Variant[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  data: Product[];
  meta: PaginationMeta;
}
