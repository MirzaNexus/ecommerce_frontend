import { useFetch } from "@/hooks/useFetch";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user";

export function useCurrentUser() {
  // Simple: key as array, API call
  const query = useFetch<UserProfile>(["profile"], userService.getProfile);

  return {
    user: query.data, // User data
    loading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
/**
 * import { useFetch } from "@/hooks/useFetch";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user";
import { useAuthStore } from "@/store/authStore";

export function useCurrentUser() {
  const { isAuthenticated, isInitializing } = useAuthStore();

  const query = useFetch<UserProfile>(
    ["current-user"],
    userService.getProfile,
    {
      enabled: isAuthenticated && !isInitializing,

      retry: (failureCount, error: any) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 1;
      },
    },
  );

  return {
    user: query.data,
    loading: query.isLoading || isInitializing,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

 */
