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

export const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]),

  line1: z
    .string()
    .min(3, "Address line must be at least 3 characters")
    .max(255, "Address line cannot exceed 255 characters"),

  line2: optionalString(0, 255),

  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name cannot exceed 100 characters"),

  state: optionalString(2, 100),

  postalCode: optionalString(2, 20),

  country: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name cannot exceed 100 characters"),

  isDefault: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
