import { useEffect } from "react";
import { authStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export const useAuthInit = () => {
  const { token, setAuth, logout } = authStore();

  useEffect(() => {
    if (!token) return;

    const init = async () => {
      try {
        const user = await authService.getProfile();
        setAuth(user, token);
      } catch {
        logout();
      }
    };

    init();
  }, [token, setAuth, logout]); // ✅ add deps
};
