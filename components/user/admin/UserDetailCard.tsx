"use client";

import { useUserDetail } from "@/hooks/user/useUserDetail";
import StatusToggle from "./StatusToggle";
import { AdminUserDTO } from "@/types/admin";

interface Props {
  userId: string;
}

export default function UserDetailCard({ userId }: Props) {
  const { data: user, isLoading, isError } = useUserDetail(userId);

  if (isLoading) return <div>Loading user details...</div>;
  if (isError || !user) return <div>Failed to load user details</div>;

  return (
    <div className="border rounded p-4 space-y-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold">
        {user.firstName} {user.lastName || ""}
      </h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {user.phone && (
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      )}
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>

      <div>
        <strong>Status:</strong>{" "}
        <StatusToggle userId={user.id} status={user.status} />
      </div>

      {/* Addresses */}
      <div>
        <strong>Addresses:</strong>
        {user.addresses.length === 0 && <p>No addresses</p>}
        {user.addresses.map((addr) => (
          <div key={addr.id} className="border p-2 rounded my-1 bg-gray-50">
            <p>{addr.line1}</p>
            {addr.line2 && <p>{addr.line2}</p>}
            <p>
              {addr.city}, {addr.state || ""}, {addr.country}{" "}
              {addr.postalCode || ""}
            </p>
            <p>
              <em>{addr.type} address</em>{" "}
              {addr.isDefault && <strong>(Default)</strong>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
