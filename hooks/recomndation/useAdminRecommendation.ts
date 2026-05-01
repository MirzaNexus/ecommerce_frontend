import { useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { useMutationHook } from "@/hooks/useMutationHook";
import { deepSanitize } from "@/utils/sanitizer";
import { recommendationAdminService } from "@/services/recommendation-admin.service";
import {
  AdminSettingsResponse,
  SyncJobResult,
  RecommendationHealthMetrics,
} from "@/types/recomendation.types";
import { RecommendationSettingsFormValues } from "@/validators/recomendation/settings.schema";

export const adminRecommendationKeys = {
  all: ["admin", "recommendations"] as const,
  settings: () => [...adminRecommendationKeys.all, "settings"] as const,
  metrics: () => [...adminRecommendationKeys.all, "metrics"] as const,
};

export function useAdminRecommendationMetrics() {
  return useFetch<RecommendationHealthMetrics>(
    adminRecommendationKeys.metrics(),
    () => recommendationAdminService.getMetrics(),
    {
      staleTime: 1000 * 60, // Refresh every minute since metrics are dynamic
    },
  );
}

export function useUpdateRecommendationSettings() {
  const queryClient = useQueryClient();

  return useMutationHook<
    AdminSettingsResponse,
    RecommendationSettingsFormValues
  >(
    (payload) => {
      // Clean input using your custom deepSanitize wrapper before sending
      const sanitizedPayload = deepSanitize(payload);
      return recommendationAdminService.updateSettings(sanitizedPayload);
    },
    {
      onSuccess: (updatedSettings) => {
        // Invalidate settings query to trigger a fresh background fetch
        queryClient.invalidateQueries({
          queryKey: adminRecommendationKeys.settings(),
        });

        // Optimistic UI updates
        queryClient.setQueryData(
          adminRecommendationKeys.settings(),
          updatedSettings,
        );
      },
    },
  );
}

export function useTriggerAlgoliaSync() {
  const queryClient = useQueryClient();

  return useMutationHook<SyncJobResult, void>(
    () => recommendationAdminService.triggerSync(),
    {
      onSuccess: () => {
        // Refresh system health metrics after sync job completes
        queryClient.invalidateQueries({
          queryKey: adminRecommendationKeys.metrics(),
        });
      },
    },
  );
}
