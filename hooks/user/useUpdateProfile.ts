import { useMutationHook } from "@/hooks/useMutationHook";
import { userService } from "@/services/userService";
import { useQueryClient } from "@tanstack/react-query";
import { sanitize } from "@/utils/sanitizer";
import { UserProfile } from "@/types/user";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutationHook(userService.updateProfile, {
    // retry: 1,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previousProfile = queryClient.getQueryData(["profile"]);

      const sanitized = sanitize(newData) as UserProfile;
      queryClient.setQueryData(["profile"], (old: any) => ({
        ...old,
        ...sanitized,
      }));

      return { previousProfile };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["profile"], context?.previousProfile);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return {
    mutate: mutation.mutate,
    loading: mutation.isPending,
  };
};
