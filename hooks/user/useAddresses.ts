import { useQueryClient } from "@tanstack/react-query";
import { addressService } from "@/services/addressService";
import { Address } from "@/types/address";
import { sanitize } from "@/utils/sanitizer";
import { useFetch } from "@/hooks/useFetch";
import { useMutationHook } from "@/hooks/useMutationHook";

type AddressContext = {
  previous?: Address[];
};

export const useAddresses = () => {
  return useFetch<Address[]>(["addresses"], addressService.getAddresses);
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutationHook<Address, Partial<Address>, AddressContext>(
    addressService.createAddress,
    {
      onMutate: async (newAddress) => {
        await queryClient.cancelQueries({ queryKey: ["addresses"] });

        const previous = queryClient.getQueryData<Address[]>(["addresses"]);

        // Optimistic update
        const sanitized = sanitize(newAddress) as Address;
        queryClient.setQueryData<Address[]>(["addresses"], (old = []) => [
          ...old,
          sanitized,
        ]);

        return { previous };
      },
      onError: (_, __, context?: { previous?: Address[] }) => {
        if (context?.previous)
          queryClient.setQueryData(["addresses"], context.previous);
      },
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: ["addresses"] }),
    },
  );
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutationHook<
    Address,
    { id: string; address: Partial<Address> },
    AddressContext
  >(({ id, address }) => addressService.updateAddress(id, address), {
    onMutate: async ({ id, address }) => {
      await queryClient.cancelQueries({ queryKey: ["addresses"] });

      const previous = queryClient.getQueryData<Address[]>(["addresses"]);

      queryClient.setQueryData<Address[]>(["addresses"], (old = []) =>
        old.map((a) => (a.id === id ? { ...a, ...sanitize(address) } : a)),
      );

      return { previous };
    },
    onError: (_, __, context?: { previous?: Address[] }) => {
      if (context?.previous)
        queryClient.setQueryData(["addresses"], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutationHook<void, string, AddressContext>(
    addressService.deleteAddress,
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ["addresses"] });

        const previous = queryClient.getQueryData<Address[]>(["addresses"]);

        queryClient.setQueryData<Address[]>(["addresses"], (old = []) =>
          old.filter((a) => a.id !== id),
        );

        return { previous };
      },
      onError: (_, __, context?: { previous?: Address[] }) => {
        if (context?.previous)
          queryClient.setQueryData(["addresses"], context.previous);
      },
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: ["addresses"] }),
    },
  );
};

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutationHook<Address, string, AddressContext>(
    addressService.setDefault,
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ["addresses"] });

        const previous = queryClient.getQueryData<Address[]>(["addresses"]);

        queryClient.setQueryData<Address[]>(["addresses"], (old = []) =>
          old.map((a) => ({ ...a, isDefault: a.id === id })),
        );

        return { previous };
      },
      onError: (_, __, context?: { previous?: Address[] }) => {
        if (context?.previous)
          queryClient.setQueryData(["addresses"], context.previous);
      },
      onSettled: () =>
        queryClient.invalidateQueries({ queryKey: ["addresses"] }),
    },
  );
};
