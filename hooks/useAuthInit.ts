"use client";

import { useEffect } from "react";
import { authStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export const useAuthInit = () => {
  const { token, setAuth, logout } = authStore();

  useEffect(() => {
    const init = async () => {
      try {
        if (token) {
          const user = await authService.getProfile();
          setAuth(user, token);
        }
      } catch (error) {
        logout();
      }
    };

    init();
  }, [token]);
};
