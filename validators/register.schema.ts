import { optional, z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(100)
    .optional(),

  email: z.string().email("Invalid email format"),

  phone: z
    .string()
    .regex(/^(\+92|0)?3\d{9}$/, "Invalid Pakistani phone number"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
