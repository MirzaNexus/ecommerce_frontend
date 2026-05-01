import api from "./apiClient";
import {
  AdminSettingsResponse,
  SyncJobResult,
  RecommendationHealthMetrics,
} from "@/types/recomendation.types";
import { RecommendationSettingsFormValues } from "@/validators/recomendation/settings.schema";

class RecommendationAdminService {
  private readonly BASE_URL = "/recommendations/admin";

  async updateSettings(
    payload: RecommendationSettingsFormValues,
  ): Promise<AdminSettingsResponse> {
    const { data } = await api.patch<AdminSettingsResponse>(
      `${this.BASE_URL}/settings`,
      payload,
    );
    return data;
  }

  async triggerSync(): Promise<SyncJobResult> {
    const { data } = await api.post<SyncJobResult>(`${this.BASE_URL}/sync`);
    return data;
  }

  async getMetrics(): Promise<RecommendationHealthMetrics> {
    const { data } = await api.get<RecommendationHealthMetrics>(
      `${this.BASE_URL}/metrics`,
    );
    return data;
  }
}

export const recommendationAdminService = new RecommendationAdminService();
