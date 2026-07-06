import { useFetch } from "../useFetch";
import { useMutationHook } from "../useMutationHook";
import { useDebounce } from "../useDebounce";
import { RecommendationService } from "@/services/recommendation.service";

import {
  GetRelatedProductsParams,
  SearchProductsParams,
} from "@/types/recomendation.types";
import { useState } from "react";

export const useRelatedProducts = (params: GetRelatedProductsParams) => {
  return useFetch(
    ["recommendations", "related", params.product_id, params.page],
    () => RecommendationService.getRelatedProducts(params),
    {
      enabled: !!params.product_id && !!params.category_id,
      staleTime: 1000 * 60 * 10,
    },
  );
};

export const useSearchProducts = (initialQuery: string = "") => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const debouncedSearch = useDebounce(searchTerm, 400);

  const query = useFetch(
    ["recommendations", "search", debouncedSearch],
    () => RecommendationService.searchProducts({ q: debouncedSearch }),
    {
      enabled: debouncedSearch.length >= 2, // Don't search for single characters
    },
  );

  return {
    ...query,
    searchTerm,
    setSearchTerm,
  };
};

export const useTrackRecommendation = () => {
  return useMutationHook(RecommendationService.trackEvent, {
    onSuccess: (data) => {
      console.log(`[Recommendation Tracked]: ${data.message}`);
    },
    onError: (error) => {
      console.error("[Tracking Failed]:", error);
    },
  });
};
