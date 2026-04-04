import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type Role = "admin" | "buyer";

export const useProtectedRoute = (allowedRoles?: Role[]) => {
  const router = useRouter();
  const { user, isAuthenticated, isInitializing } = useAuthStore();

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user?.role)) {
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, allowedRoles, router, isInitializing]);
};
