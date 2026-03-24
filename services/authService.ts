import apiClient from "./apiClient";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await apiClient.post("/auth/login", data);
    return res.data;
  },

  getProfile: async () => {
    const res = await apiClient.get("/auth/me");
    return res.data;
  },
};
