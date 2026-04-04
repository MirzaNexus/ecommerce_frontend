import { z } from "zod";

const optionalString = (min = 2, max = 100) =>
  z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => val === undefined || val.length >= min, {
      message: `Must be at least ${min} characters`,
    })
    .refine((val) => val === undefined || val.length <= max, {
      message: `Must be at most ${max} characters`,
    })
    .optional();

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: optionalString(2, 20),

  phone: z
    .string()
    .regex(/^(\+92|0)?3\d{9}$/, "Invalid Pakistani phone number"),

  avatarUrl: optionalString(2, 20),
});
export type ProfileFormValues = z.input<typeof profileSchema>;
