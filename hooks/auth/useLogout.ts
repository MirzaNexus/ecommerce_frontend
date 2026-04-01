import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return () => {
    clearAuth();

    document.cookie = "refreshToken=; Max-Age=0; path=/";
    document.cookie = "role=; Max-Age=0; path=/";

    window.location.href = "/login";
  };
};
