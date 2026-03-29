"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/user/useUsers";
import FilterDropdown from "./FilterDropdown";
import StatusToggle from "./StatusToggle";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<any>();

  const { data, isLoading } = useUsers({
    page,
    limit: 10,
    status,
  });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="space-y-4">
      {/* Filter */}
      <FilterDropdown value={status} onChange={setStatus} />

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {data?.data.map((user) => (
            <tr key={user.id} className="border-t">
              <td>
                {user.firstName} {user.lastName || ""}
              </td>
              <td>{user.email}</td>
              <td>
                <StatusToggle userId={user.id} status={user.status} />
              </td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between">
        <button
          disabled={data?.meta.page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {data?.meta.page} / {data?.meta.totalPages}
        </span>

        <button
          disabled={data?.meta.page === data?.meta.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
