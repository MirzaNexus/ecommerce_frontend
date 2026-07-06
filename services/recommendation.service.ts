import api from "./apiClient";

import {
  RecommendationListResponse,
  TrackingResponse,
  SearchResponse,
  GetRelatedProductsParams,
  SearchProductsParams,
} from "@/types/recomendation.types";
import { CreateRecommendationEventInput } from "@/validators/recomendation/recommendation.schema";

export const RecommendationService = {
  getRelatedProducts: async (
    params: GetRelatedProductsParams,
  ): Promise<RecommendationListResponse> => {
    const { data } = await api.get<RecommendationListResponse>(
      "/recommendations/related",
      {
        params: {
          product_id: params.product_id,
          category_id: params.category_id,
          page: params.page || 1,
        },
      },
    );
    return data;
  },

  trackEvent: async (payload: CreateRecommendationEventInput) => {
    const finalPayload = {
      ...payload,
      algolia_payload: {
        ...payload.algolia_payload,
        timestamp: Date.now(), // Auto-inject timestamp
      },
    };
    const { data } = await api.post("/recommendations/track", finalPayload);
    return data;
  },

  searchProducts: async (
    params: SearchProductsParams,
  ): Promise<SearchResponse> => {
    const { data } = await api.get<SearchResponse>("/recommendations/search", {
      params: {
        q: params.q,
        // page parameter can be added here if you decide to paginate search results later
      },
    });
    return data;
  },
};
