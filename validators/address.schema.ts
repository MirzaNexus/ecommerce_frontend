import { z } from "zod";

export const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]).optional(),

  line1: z
    .string()
    .min(3, "Address line must be at least 3 characters")
    .max(255, "Address line cannot exceed 255 characters"),

  line2: z
    .string()
    .max(255, "Address line 2 cannot exceed 255 characters")
    .optional(),

  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name cannot exceed 100 characters"),

  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .max(100, "State cannot exceed 100 characters")
    .optional(),

  postalCode: z
    .string()
    .min(2, "Postal code is too short")
    .max(20, "Postal code is too long")
    .optional(),

  country: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name cannot exceed 100 characters"),

  isDefault: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
