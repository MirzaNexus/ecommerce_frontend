"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import { adminService } from "@/services/adminService";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccess, showError } from "@/components/shared/Apptoast";
import { UserStatus } from "@/types/admin";

export const useToggleUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutationHook(
    ({ userId, status }: { userId: string; status: UserStatus }) =>
      adminService.updateUserStatus(userId, status),

    {
      onMutate: async ({ userId }) => {
        await queryClient.cancelQueries({ queryKey: ["users"] });

        const previous = queryClient.getQueriesData({
          queryKey: ["users"],
        });

        previous.forEach(([key, data]: any) => {
          if (!data?.data) return;

          queryClient.setQueryData(key, {
            ...data,
            data: data.data.map((u: any) =>
              u.id === userId
                ? {
                    ...u,
                    status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
                  }
                : u,
            ),
          });
        });

        return { previous };
      },

      onError: (_, __, ctx) => {
        ctx?.previous?.forEach(([key, data]: any) => {
          queryClient.setQueryData(key, data);
        });

        showError("Failed to update status");
      },

      onSuccess: () => showSuccess("Status updated"),

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  );
};
