"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useUsers } from "@/hooks/user/useUsers";
import FilterDropdown from "./FilterDropdown";
import StatusToggle from "./StatusToggle";

export default function UserTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Params Sync
  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || undefined;

  const { data, isLoading } = useUsers({
    page,
    limit: 10,
    status: status as any,
  });

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.set("page", "1"); // Reset page on filter change
    router.push(`?${params.toString()}`);
  };

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse">
        Loading secure user data...
      </div>
    );

  return (
    <div className="flex flex-col">
      {/* Table Actions */}
      <div className="p-4 border-b border-border bg-gray-50/50 flex flex-wrap gap-4 items-center justify-between">
        <FilterDropdown
          value={status as any}
          onChange={(val) => updateParams("status", val || null)}
        />
        <div className="text-sm text-muted-foreground">
          Showing <strong>{data?.data?.length || 0}</strong> users
        </div>
      </div>

      {/* Modern Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 text-muted-foreground uppercase text-[11px] tracking-wider font-bold">
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Account Status</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data?.data?.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-primary/5 cursor-pointer transition-colors group"
                onClick={() => updateParams("userId", user.id)}
              >
                <td className="px-6 py-4 font-medium text-foreground">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {user.email}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <StatusToggle userId={user.id} status={user.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize px-2 py-1 bg-secondary rounded text-xs font-semibold text-secondary-foreground">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-between border-t border-border bg-gray-50/50">
        <button
          className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 hover:bg-white transition-all shadow-sm"
          disabled={page === 1}
          onClick={() => updateParams("page", (page - 1).toString())}
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {data?.meta?.page} of {data?.meta?.totalPages}
        </span>
        <button
          className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 hover:bg-white transition-all shadow-sm"
          disabled={page === data?.meta?.totalPages}
          onClick={() => updateParams("page", (page + 1).toString())}
        >
          Next
        </button>
      </div>
    </div>
  );
}
