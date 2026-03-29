import { z } from "zod";

const optionalString = (schema: z.ZodString) =>
  schema.optional().transform((val) => (val === "" ? undefined : val));

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: optionalString(
    z.string().min(2, "Last name must be at least 2 characters").max(100),
  ),

  phone: optionalString(
    z.string().min(7, "Phone number must be at least 7 digits").max(20),
  ),

  avatarUrl: optionalString(z.string().url("Please enter a valid image URL")),
});
export type ProfileFormValues = z.input<typeof profileSchema>;
