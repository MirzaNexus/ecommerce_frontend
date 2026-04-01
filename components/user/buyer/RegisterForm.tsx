"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterFormValues,
} from "@/validators/register.schema";
import { useRegister } from "@/hooks/user/useRegister";

export default function RegisterForm() {
  const { register: registerUser, loading } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* First Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          First Name
        </label>
        <input
          {...form.register("firstName")}
          placeholder="Enter your first name"
          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.formState.errors.firstName && (
          <p className="text-xs text-error">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Last Name</label>
        <input
          {...form.register("lastName")}
          placeholder="Enter your last name"
          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.formState.errors.lastName && (
          <p className="text-xs text-error">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input
          {...form.register("email")}
          placeholder="Enter your email"
          type="email"
          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.formState.errors.email && (
          <p className="text-xs text-error">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Phone</label>
        <input
          {...form.register("phone")}
          placeholder="Enter your phone number"
          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.formState.errors.phone && (
          <p className="text-xs text-error">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Password</label>
        <input
          type="password"
          {...form.register("password")}
          placeholder="Enter your password"
          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.formState.errors.password && (
          <p className="text-xs text-error">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Registering..." : "Create Account"}
      </button>
      <div className="pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Log in
          </a>
        </p>
      </div>
    </form>
  );
}
