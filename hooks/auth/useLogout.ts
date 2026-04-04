import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    if (typeof window === "undefined") return;

    const currentToken = useAuthStore.getState().refreshToken;

    try {
      if (currentToken) {
        await authService.logout(currentToken);
        clearAuth();
        router.replace("/auth/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout API failed:", error);
    }
  };

  return handleLogout;
};
