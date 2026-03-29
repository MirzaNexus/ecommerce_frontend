import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

export function useFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<
    UseQueryOptions<T, Error, T, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    ...options,
  });
}
