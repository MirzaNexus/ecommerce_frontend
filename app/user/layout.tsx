"use client";

import Container from "@/components/layout/Container";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
const userSidebarItems = [
  {
    name: "Dashboard",
    href: "/user/dashboard",
  },
  {
    name: "Profile",
    href: "/user/profile",
  },
  {
    name: "Address",
    href: "/user/address",
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background py-8">
      <Container>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <DashboardSidebar items={userSidebarItems} />

          {/* Content */}
          <section className="flex-1 bg-card border border-border rounded-xl p-6">
            {children}
          </section>
        </div>
      </Container>
    </main>
  );
}
