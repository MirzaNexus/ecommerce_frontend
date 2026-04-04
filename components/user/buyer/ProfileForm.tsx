"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/validators/profile.schema";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { showSuccess, showError } from "@/components/shared/Apptoast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  initialData,
}: {
  initialData: ProfileFormValues;
}) {
  const router = useRouter();
  const { mutate, loading } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData, // Populates form initially
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    mutate(data, {
      onSuccess: () => {
        showSuccess("Profile updated successfully");
        router.push("/user/profile");
      },
      onError: () => {
        showError("Update failed");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md mx-auto p-6 bg-card rounded-lg border border-border"
    >
      <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
        Edit Profile
      </h2>

      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          First Name
        </label>
        <input
          {...register("firstName")}
          placeholder="First Name"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition-colors"
        />
        {errors.firstName && (
          <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          Last Name
        </label>
        <input
          {...register("lastName")}
          placeholder="Last Name"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition-colors"
        />
        {errors.lastName && (
          <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          Phone Number
        </label>
        <input
          {...register("phone")}
          placeholder="e.g. 03XXXXXXXXX"
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition-colors"
        />
        {errors.phone && (
          <p className="text-error text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-sm font-medium text-muted mb-1">
          Avatar URL
        </label>
        <input
          {...register("avatarUrl")}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition-colors"
        />
        {errors.avatarUrl && (
          <p className="text-error text-sm mt-1">{errors.avatarUrl.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
