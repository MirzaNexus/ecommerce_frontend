"use client";

import Link from "next/link";
import ProfileForm from "@/components/user/buyer/ProfileForm";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

export default function EditProfilePage() {
  const { user, loading } = useCurrentUser();

  if (loading)
    return <p className="text-muted-foreground">Loading profile data...</p>;
  if (!user) return <p className="text-error">User not found.</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          Edit Profile
        </h1>

        <Link
          href="/user/profile"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Profile
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <ProfileForm
          initialData={{
            firstName: user.firstName,
            lastName: user.lastName || "",
            phone: user.phone,
            avatarUrl: user.avatarUrl || "",
          }}
        />
      </div>
    </>
  );
}
