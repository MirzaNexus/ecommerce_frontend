"use client";

import { useState } from "react";
import ProfileView from "@/components/user/buyer/ProfileView";
import ProfileForm from "@/components/user/buyer/ProfileForm";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

export default function ProfilePage() {
  const [editProfile, setEditProfile] = useState(false);
  const { user, loading } = useCurrentUser();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-semibold">My Profile</h1>

        <button
          onClick={() => setEditProfile(!editProfile)}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          {editProfile ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {!editProfile && <ProfileView />}

      {editProfile && user && (
        <ProfileForm
          initialData={{
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            avatarUrl: user.avatarUrl,
          }}
        />
      )}
    </>
  );
}
