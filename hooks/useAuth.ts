import { authStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, token, setAuth, logout } = authStore();

  return {
    user,
    token,
    role: user?.role,
    isAuthenticated: !!token,
    setAuth,
    logout,
  };
};
