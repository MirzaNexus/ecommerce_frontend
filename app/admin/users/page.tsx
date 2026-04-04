"use client";

import { useSearchParams, useRouter } from "next/navigation";
import UserTable from "@/components/user/admin/UserTable";
import UserDetailCard from "@/components/user/admin/UserDetailCard";

export default function AdminUsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL se userId utha rahy hain
  const selectedUserId = searchParams.get("userId");

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("userId");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            {selectedUserId ? "User Profile Details" : "User Management"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedUserId
              ? "View and manage specific user information and account status."
              : "Manage your application users, roles, and account permissions."}
          </p>
        </div>
      </div>

      {/* Logic: Agar userId hai tu Table hide ho jaye aur Detail show ho */}
      {!selectedUserId ? (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <UserTable />
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center text-sm font-medium text-primary hover:text-accent transition-colors gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to Users List
          </button>

          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <UserDetailCard userId={selectedUserId} />
          </div>
        </div>
      )}
    </div>
  );
}
