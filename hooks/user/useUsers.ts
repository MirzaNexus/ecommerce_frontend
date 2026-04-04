"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { adminService } from "@/services/adminService";
import { PaginatedUsersDTO, UserStatus } from "@/types/admin";
import { keepPreviousData } from "@tanstack/react-query";

interface UseUsersProps {
  page: number;
  limit?: number;
  status?: UserStatus;
  search?: string; // Optional search if backend supports later
}

export const useUsers = ({
  page,
  limit = 10,
  status,
  search,
}: UseUsersProps) => {
  // ✅ Debounced search for performance
  const debouncedSearch = useDebounce(search || "", 500);

  return useFetch<PaginatedUsersDTO>(
    ["users", page, limit, status, debouncedSearch],
    () =>
      adminService.getUsers({
        page,
        limit,
        status,
        // search param included if backend supports in future
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      }),
    {
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5, // 5 mins caching
    },
  );
};
