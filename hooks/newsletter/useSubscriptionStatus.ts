import { useFetch } from "@/hooks/useFetch";
import { newsletterApi } from "@/services/newsletterService";

import {
  NewsletterResponse,
  SubscriptionStatus,
} from "@/types/newsletter.types";

export const useSubscriptionStatus = (email: string) => {
  return useFetch<NewsletterResponse<SubscriptionStatus>>(
    ["newsletter-status", email],
    () => newsletterApi.getStatus(email),
    {
      enabled: !!email,
      staleTime: 1000 * 60 * 10, // 10 minutes cache
    },
  );
};
