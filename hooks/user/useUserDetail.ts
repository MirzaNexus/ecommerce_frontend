"use client";

import { useFetch } from "@/hooks/useFetch";
import { adminService } from "@/services/adminService";
import { AdminUserDTO } from "@/types/admin";

export const useUserDetail = (userId: string) => {
  return useFetch<AdminUserDTO>(
    ["user", userId],
    () => adminService.getUserById(userId),
    {
      staleTime: 1000 * 60 * 5, // cache 5 minutes
      // retry: 1, // retry once
    },
  );
};
