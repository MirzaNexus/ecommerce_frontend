import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  role: "admin" | "buyer";
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;

  // Actions
  setAuth: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  setInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitializing: true, // App load hote waqt true rahega

      // 1. Login ya Register ke baad full state update
      setAuth: ({ user, accessToken, refreshToken }) => {
        // Cookies handle karein (Middleware/SSR ke liye)
        Cookies.set("refreshToken", refreshToken, { expires: 30, path: "/" });
        Cookies.set("role", user.role, { expires: 30, path: "/" });

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isInitializing: false,
        });
      },

      // 2. Token Refresh Logic (User profile ko protect karta hai)
      setTokens: (accessToken, refreshToken) => {
        Cookies.set("refreshToken", refreshToken, { expires: 30, path: "/" });

        set((state) => ({
          ...state, // Purana user data (role etc.) preserve rahega
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isInitializing: false,
        }));
      },

      setInitializing: (status) => set({ isInitializing: status }),

      // 3. Logout logic jo har jagah se data saaf karegi
      clearAuth: () => {
        // Cleanup Cookies
        Cookies.remove("refreshToken", { path: "/" });
        Cookies.remove("role", { path: "/" });

        // localStorage is automatically handled by persist (if we return null state)
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isInitializing: false,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage mein is key se save hoga
      storage: createJSONStorage(() => localStorage),

      // Ye part important hai: Sirf wahi data save karein jo reload par UI ko chahiye
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
