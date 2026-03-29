"use client";

import { useFetch } from "@/hooks/useFetch";
import { userService } from "@/services/userService";
import { sanitize } from "@/utils/sanitizer";
import { Profile } from "@/types/user";

export default function ProfileView() {
  const { data, isLoading, isError } = useFetch<Profile>(
    ["profile"],
    userService.getProfile,
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load profile</div>;

  const user = sanitize(data);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Profile</h2>

      {/* Avatar */}
      {user?.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
      )}

      {/* Full Name */}
      <p>
        <strong>Name:</strong>{" "}
        {user?.fullName ||
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
          "N/A"}
      </p>

      {/* Email */}
      <p>
        <strong>Email:</strong> {user?.email || "N/A"}
      </p>

      {/* Phone */}
      <p>
        <strong>Phone:</strong> {user?.phone || "N/A"}
      </p>

      {/* Role */}
      <p>
        <strong>Role:</strong> {user?.role || "N/A"}
      </p>
    </div>
  );
}
