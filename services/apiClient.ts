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

// api.interceptors.request.use(async (config) => {
//   const { accessToken, refreshToken, setTokens, clearAuth } =
//     useAuthStore.getState();

//   if (accessToken) {
//     // ✅ Check if access token expired (15 min)
//     if (isTokenExpired(accessToken) && refreshToken) {
//       try {
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           { refreshToken },
//         );

//         const { accessToken: newAccess, refreshToken: newRefresh } = res.data;

//         // ✅ Save new tokens (rotation)
//         setTokens(newAccess, newRefresh);

//         config.headers = config.headers || {};
//         config.headers.Authorization = `Bearer ${newAccess}`;
//       } catch (err) {
//         clearAuth();
//         window.location.href = "/auth/login";
//         return Promise.reject(err);
//       }
//     } else {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//   }

//   return config;
// });

api.interceptors.request.use(
  async (config) => {
    // 1. Skip logic for Login and Register
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register")
    ) {
      return config;
    }

    const { accessToken, refreshToken, setTokens, clearAuth } =
      useAuthStore.getState();

    // Baaki logic sirf tab chale jab user already logged in ho aur protected route hit kare
    if (accessToken) {
      if (isTokenExpired(accessToken) && refreshToken) {
        // ... aapka refresh logic yahan rahega
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken },
          );
          const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
          setTokens(newAccess, newRefresh);

          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${newAccess}`;
        } catch (err) {
          if (config.url?.includes("/auth/logout")) {
            return Promise.reject(err);
          }
          clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
          return Promise.reject(err);
        }
      } else {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    originalRequest._retry = true;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh")) {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

      if (!refreshToken) {
        clearAuth();
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      // 🔁 Concurrent Request Handling
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            (originalRequest.headers as any).Authorization = `Bearer ${token}`;
            return api(originalRequest); // Retry failed request
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use standard axios for refresh to avoid interceptor recursion
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
        );

        const { accessToken, refreshToken: newRefresh } = res.data;

        // ✅ Centralized Store update (Updates State + Cookies + LocalStorage)
        setTokens(accessToken, newRefresh);

        processQueue(null, accessToken);

        (originalRequest.headers as any).Authorization =
          `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        if (typeof window !== "undefined") window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
