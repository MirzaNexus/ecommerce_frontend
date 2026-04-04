"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (allowedRoles && !allowedRoles.includes(role || "")) {
      router.push("/unauthorized");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, role]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
