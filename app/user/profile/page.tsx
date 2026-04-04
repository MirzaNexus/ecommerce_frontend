"use client";

import Link from "next/link";
import ProfileView from "@/components/user/buyer/ProfileView";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";

export default function ProfilePage() {
  const { loading } = useCurrentUser();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-xl font-heading font-semibold text-foreground">
          My Profile
        </h1>

        {/* URL change karne ke liye Link use karein */}
        <Link
          href="/user/profile/edit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Edit Profile
        </Link>
      </div>

      <ProfileView />
    </>
  );
}
