import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .transform((val) => val.trim()),

  parentId: z.string().uuid("Invalid parent ID").optional().nullable(),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
