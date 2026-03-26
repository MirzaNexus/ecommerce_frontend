import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useMutationHook<TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, unknown, TVariables>,
) {
  return useMutation({
    mutationFn,
    retry: 1,
    ...options,
  });
}
