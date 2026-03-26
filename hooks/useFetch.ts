import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>,
) {
  return useQuery<T>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5, // ✅ cache 5 min
    retry: 1, // ✅ avoid spam
    refetchOnWindowFocus: false,
    ...options,
  });
}
