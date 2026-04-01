import { useMutationHook } from "@/hooks/useMutationHook";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { showSuccess, showError } from "@/components/shared/Apptoast";
export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutationHook(userService.registerBuyer, {
    // retry: 1,

    onSuccess: () => {
      showSuccess("Registration successful");
      router.push("/login");
    },

    onError: (error: any) => {
      showError(error?.response?.data?.message || "Registration failed");
    },
  });

  return {
    register: mutation.mutate,
    loading: mutation.isPending,
  };
};
