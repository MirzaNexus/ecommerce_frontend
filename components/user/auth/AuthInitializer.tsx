"use client";
import { useAuthInit } from "@/hooks/auth/useAuthInit";

export const AuthInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useAuthInit(); // Yahan call hoga
  return <>{children}</>;
};
