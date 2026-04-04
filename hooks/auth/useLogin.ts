import { useAuthStore } from "@/store/authStore";
import { useMutationHook } from "../useMutationHook";
import { authService } from "@/services/authService";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutationHook(authService.login, {
    onSuccess: (data) => {
      setAuth(data);
    },
  });
};
