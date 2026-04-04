import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import Cookies from "js-cookie";

export const useAuthInit = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setInitializing = useAuthStore((s) => s.setInitializing);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const init = async () => {
      if (typeof window === "undefined") return;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        setInitializing(false);
        initialized.current = true;
        return;
      }

      setInitializing(true);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 10000,
          },
        );

        if (res.data) {
          const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
          setTokens(newAccess, newRefresh);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearAuth();
      } finally {
        setInitializing(false);
        initialized.current = true;
      }
    };

    init();
  }, [setTokens, clearAuth, setInitializing]);
};
