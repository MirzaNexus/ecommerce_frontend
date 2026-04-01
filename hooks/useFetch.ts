import {
  useQuery,
  QueryKey,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
export function useFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<
    UndefinedInitialDataOptions<T, Error, T, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
    // retry: 1,
    refetchOnWindowFocus: false,
    ...options, // Ab yahan error nahi aayega
  });
}
