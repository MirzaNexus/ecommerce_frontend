"use client";

import { useToggleUserStatus } from "@/hooks/user/useToggleUserStatus";
import { UserStatus } from "@/types/admin";

export default function StatusToggle({
  userId,
  status,
}: {
  userId: string;
  status: UserStatus;
}) {
  const toggle = useToggleUserStatus();

  const nextStatus = status === "active" ? "suspended" : "active";

  return (
    <button
      onClick={() => toggle.mutate({ userId, status: nextStatus })}
      disabled={toggle.isPending}
      className={`px-2 py-1 rounded text-white ${
        status === "active" ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      {toggle.isPending
        ? "Updating..."
        : status === "active"
          ? "Active"
          : "Suspended"}
    </button>
  );
}
