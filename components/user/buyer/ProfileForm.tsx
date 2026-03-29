import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/validators/profile.schema";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { showSuccess, showError } from "@/components/shared/Apptoast";

export default function ProfileForm({
  initialData,
}: {
  initialData: ProfileFormValues;
}) {
  const { mutate, loading } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      phone: initialData.phone || "",
      avatarUrl: initialData.avatarUrl || "",
    },
    mode: "onChange", // ✅ better UX
  });

  const onSubmit = (data: ProfileFormValues) => {
    mutate(data, {
      onSuccess: () => {
        showSuccess("Profile updated successfully");
      },
      onError: () => {
        showError("Update failed");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("firstName")} placeholder="First Name" />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <input {...register("lastName")} placeholder="Last Name" />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <input {...register("phone")} placeholder="Phone" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <input {...register("avatarUrl")} placeholder="Avatar URL" />
        {errors.avatarUrl && (
          <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>
        )}
      </div>

      <button disabled={loading || isSubmitting}>
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
