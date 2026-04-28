import {
  SubscribeNewsletterDto,
  NewsletterResponse,
  SubscriptionStatus,
} from "@/types/newsletter.types";
import apiClient from "./apiClient";
import { deepSanitize } from "@/utils/sanitizer";
import { BroadcastNewsDto } from "@/types/newsletter.types";

class NewsletterApiService {
  private readonly endpoint = "/newsletter";

  async subscribe(data: SubscribeNewsletterDto): Promise<NewsletterResponse> {
    const response = await apiClient.post(`${this.endpoint}/subscribe`, data);
    return response.data;
  }

  async getStatus(
    email: string,
  ): Promise<NewsletterResponse<SubscriptionStatus>> {
    const response = await apiClient.get(`${this.endpoint}/status/${email}`);
    return response.data;
  }

  async updateStatus(
    email: string,
    isSubscribed: boolean,
  ): Promise<NewsletterResponse> {
    const response = await apiClient.patch(`${this.endpoint}/status/${email}`, {
      isSubscribed,
    });
    return response.data;
  }
  async broadcast(data: BroadcastNewsDto): Promise<NewsletterResponse> {
    // Deep sanitize title and body to prevent XSS in notifications
    const sanitizedData = deepSanitize(data);
    const response = await apiClient.post(
      `${this.endpoint}/broadcast`,
      sanitizedData,
    );
    return response.data;
  }
}

export const newsletterApi = new NewsletterApiService();
