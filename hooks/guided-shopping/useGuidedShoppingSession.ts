import { useMutationHook } from "@/hooks/useMutationHook";
import GuidedShoppingService from "@/services/guided-shopping.service";
import {
  CreateChatSessionRequest,
  ChatSessionResponse,
} from "@/types/guided-shopping";
import { useAuthStore } from "@/store/authStore";

export const useGuidedShoppingSession = () => {
  const user = useAuthStore((s) => s.user);

  const startSessionMutation = useMutationHook<
    ChatSessionResponse,
    Partial<CreateChatSessionRequest>
  >((data) =>
    GuidedShoppingService.startSession({
      buyerId: user?.id,
      ...data,
    }),
  );

  return {
    startSession: startSessionMutation.mutateAsync,
    isStarting: startSessionMutation.isPending,
    error: startSessionMutation.error,
  };
};
