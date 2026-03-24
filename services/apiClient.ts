import axios from "axios";
import { authStore } from "@/store/authStore";
import { CustomAxiosRequestConfig } from "@/types/axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().token;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      return apiClient(originalRequest);
    }

    if (error.response?.status === 401) {
      authStore.getState().logout();
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Access Denied");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
