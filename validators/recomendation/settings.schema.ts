import { z } from "zod";

export const RecommendationSettingsSchema = z.object({
  enabled: z.boolean({
    message: "Must specify if service is enabled",
  }),
  related_products_limit: z
    .number()
    .min(1, "Limit must be at least 1")
    .int("Limit must be a whole number"),
  category_priority_enabled: z.boolean({
    message: "Category priority status is required",
  }),
  price_similarity_factor: z
    .number()
    .min(0, "Factor cannot be negative")
    .max(1, "Factor cannot exceed 1"),
  fallback_enabled: z.boolean().optional().default(true),
});

export type RecommendationSettingsFormValues = z.infer<
  typeof RecommendationSettingsSchema
>;
