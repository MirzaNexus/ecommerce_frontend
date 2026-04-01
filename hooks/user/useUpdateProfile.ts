import { useMutationHook } from "@/hooks/useMutationHook";
import { userService } from "@/services/userService";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutationHook(userService.updateProfile, {
    // retry: 1,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });

      const previousProfile = queryClient.getQueryData(["profile"]);

      queryClient.setQueryData(["profile"], (old: any) => ({
        ...old,
        ...newData,
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
