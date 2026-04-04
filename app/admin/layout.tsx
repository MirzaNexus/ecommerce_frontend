"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useProtectedRoute } from "@/hooks/auth/useProtectedRoute";
import { useAuthStore } from "@/store/authStore";
const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Users", href: "/admin/users" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useProtectedRoute(["admin"]);

  const { user, isAuthenticated, isInitializing } = useAuthStore();

  if (isInitializing || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking access...</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <DashboardSidebar items={sidebarItems} />

          {/* Content */}
          <section className="flex-1 bg-card border border-border rounded-xl p-6">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
