"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import apiClient from "@/services/apiClient";
import { toast } from "sonner";
// UI Components like Input, Textarea, etc.

export function BroadcastForm() {
  const { mutate: sendBroadcast, isPending } = useMutationHook(
    async (data: { title: string; body: string }) => {
      const res = await apiClient.post("/newsletter/broadcast", data);
      return res.data;
    },
    {
      onSuccess: () => toast.success("Notification sent to all subscribers!"),
      onError: () => toast.error("Failed to send broadcast."),
    },
  );

  // Form logic here...
}
