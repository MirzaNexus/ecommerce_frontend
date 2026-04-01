import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "admin" | "buyer";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean; // 👈 New State: Yeh batayega ke initialization chal rahi hai

  setAuth: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;

  setTokens: (accessToken: string, refreshToken: string) => void;

  setInitializing: (status: boolean) => void; // 👈 New Action: To update loading status

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitializing: true,

  setAuth: ({ user, accessToken, refreshToken }) => {
    localStorage.setItem("refreshToken", refreshToken);

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isInitializing: false, // Auth set hote hi initialization khatam
    });
  },

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);

    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isInitializing: false,
    });
  },

  setInitializing: (status) => set({ isInitializing: status }),

  clearAuth: () => {
    localStorage.removeItem("refreshToken");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitializing: false, // Error aane par bhi loading khatam karo taake redirect ho sake
    });
  },
}));
