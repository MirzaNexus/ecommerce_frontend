export enum RecommendationEventType {
  ADD_TO_CART = "ADD_TO_CART",
  PAID_ORDER = "PAID_ORDER",
  VIEW = "VIEW", // Added for Product Detail Page tracking
}

export type RecommendationSource = "algolia" | "fallback_db";

export interface GetRelatedProductsParams {
  product_id: string;
  category_id: string;
  page?: number;
}

export interface SearchProductsParams {
  q: string;
  page?: number;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  minPrice: number;
  maxPrice: number;
  imageUrl: string;
  categoryName: string;
  categoryId: string;
  variantCount: number;
  inventoryStatus?: "IN_STOCK" | "OUT_OF_STOCK";
  score?: number;
}

export interface RecommendationListResponse {
  items: RecommendedProduct[];
  total: number;
  totalPages: number;
  source: RecommendationSource;
  request_id: string;
}

export interface TrackingResponse {
  success: boolean;
  message: string;
  tracked_at: string; // ISO Date string
}

export interface SearchResponse {
  results: RecommendedProduct[];
  total: number;
  query: string;
}

export interface AlgoliaPayload {
  eventName: string;
  userToken: string;
  index: string;
  objectIDs: string[];
  timestamp: number;
  queryID?: string;
}
