import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useMutationHook<TData, TVariables, TContext = unknown>(
  mutationFn: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, unknown, TVariables, TContext>,
) {
  return useMutation({
    mutationFn,
    // retry: 1,
    ...options,
  });
}
