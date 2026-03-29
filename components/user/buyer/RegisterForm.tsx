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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input {...form.register("firstName")} placeholder="First Name" />
      <p>{form.formState.errors.firstName?.message}</p>

      <input {...form.register("lastName")} placeholder="Last Name" />
      <p>{form.formState.errors.lastName?.message}</p>

      <input {...form.register("email")} placeholder="Email" />
      <p>{form.formState.errors.email?.message}</p>

      <input {...form.register("phone")} placeholder="Phone" />
      <p>{form.formState.errors.phone?.message}</p>

      <input
        type="password"
        {...form.register("password")}
        placeholder="Password"
      />
      <p>{form.formState.errors.password?.message}</p>

      <button disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
