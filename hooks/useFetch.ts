import {
  useQuery,
  QueryKey,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
export function useFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<
    UndefinedInitialDataOptions<T, Error, T, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  const isInitializing = useAuthStore((s) => s.isInitializing);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
    // retry: 1,
    refetchOnWindowFocus: false,
    enabled:
      options?.enabled !== undefined
        ? options.enabled
        : !isInitializing && isAuthenticated,
    ...options, // Ab yahan error nahi aayega
  });
}
