import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

// Process queue
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Check token expiry (JWT decode)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// REQUEST INTERCEPTOR

api.interceptors.request.use(async (config) => {
  const { accessToken, refreshToken, setTokens, clearAuth } =
    useAuthStore.getState();

  if (accessToken) {
    // ✅ Check if access token expired (15 min)
    if (isTokenExpired(accessToken) && refreshToken) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );

        const { accessToken: newAccess, refreshToken: newRefresh } = res.data;

        // ✅ Save new tokens (rotation)
        setTokens(newAccess, newRefresh);

        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${newAccess}`;
      } catch (err) {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    } else {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // ✅ Network error (no response)
    if (!error.response) {
      console.error("Network error / server down");
      return Promise.reject(error);
    }

    // ✅ Handle 401
    if (error.response.status === 401 && !originalRequest._retry) {
      const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

      if (!refreshToken) {
        clearAuth();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 🔁 Queue handling
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );

        const { accessToken, refreshToken: newRefresh } = res.data;

        // ✅ Rotate tokens (VERY IMPORTANT)
        setTokens(accessToken, newRefresh);

        processQueue(null, accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        clearAuth();
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
