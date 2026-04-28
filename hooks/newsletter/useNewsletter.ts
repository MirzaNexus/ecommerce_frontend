import { useMutationHook } from "@/hooks/useMutationHook";
import { newsletterApi } from "@/services/newsletterService";
import { useQueryClient } from "@tanstack/react-query"; // 👈 Add this

import {
  SubscribeNewsletterDto,
  BroadcastNewsDto,
} from "@/types/newsletter.types";
import { toast } from "sonner";

export const useNewsletter = () => {
  const queryClient = useQueryClient(); // 👈 Initialize Query Client

  // 🟢 1. Subscribe Mutation
  const subscribeMutation = useMutationHook(
    (data: SubscribeNewsletterDto) => newsletterApi.subscribe(data),
    {
      onSuccess: (res) => {
        toast.success(res.message || "Subscribed successfully!");
        // 🔄 Refresh the subscription status
        queryClient.invalidateQueries({ queryKey: ["newsletter-status"] });
      },
      onError: (err: any) => {
        const errorMsg = err?.response?.data?.message || "Subscription failed";
        toast.error(errorMsg);
      },
    },
  );

  // 🟢 2. Broadcast Mutation
  const broadcastMutation = useMutationHook(
    (data: BroadcastNewsDto) => newsletterApi.broadcast(data),
    {
      onSuccess: (res) => {
        toast.success(res.message || "Notification sent to all devices!");
      },
      onError: (err: any) => {
        toast.error("Failed to send broadcast.");
      },
    },
  );

  // 🟢 3. Toggle/Update Status Mutation
  const updateStatusMutation = useMutationHook(
    ({ email, status }: { email: string; status: boolean }) =>
      newsletterApi.updateStatus(email, status),
    {
      onSuccess: (res) => {
        toast.success(res.message);
        // 🔄 Refresh the subscription status (IMPORTANT for Toggle)
        queryClient.invalidateQueries({ queryKey: ["newsletter-status"] });
      },
    },
  );

  return {
    // Actions
    subscribe: subscribeMutation.mutate,
    broadcast: broadcastMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    // Loading States
    isSubscribing: subscribeMutation.isPending,
    isBroadcasting: broadcastMutation.isPending,
    isUpdating: updateStatusMutation.isPending,
  };
};
