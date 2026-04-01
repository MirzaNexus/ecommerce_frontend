"use client";

import { useState } from "react";
import UserTable from "@/components/user/admin/UserTable";
import UserDetailCard from "@/components/user/admin/UserDetailCard";

export default function AdminUsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-start items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-semibold">User Management</h1>
      </div>

      {/* Table */}
      <UserTable onRowClick={(id) => setSelectedUserId(id)} />

      {/* Inline Detail (same page) */}
      {selectedUserId && (
        <div className="mt-6 border-t pt-4">
          <button
            onClick={() => setSelectedUserId(null)}
            className="mb-4 text-sm underline"
          >
            ← Back
          </button>

          <UserDetailCard userId={selectedUserId} />
        </div>
      )}
    </div>
  );
}
