import { LoginPayload, AuthResponse } from "@/types/auth";
import api from "./apiClient";

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await api.post("/auth/login", payload);
    return res.data as AuthResponse;
  },

  refresh: async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res.data as AuthResponse;
  },

  logout: async (refreshToken: string) => {
    const res = await api.post("/auth/logout", { refreshToken });
    return res.data;
  },
};
