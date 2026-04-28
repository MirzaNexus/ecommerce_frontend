import { z } from "zod";

export const ProductFilterSchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().uuid().optional().or(z.literal("")),
  minPrice: z.coerce.number().min(0).optional().or(z.literal(0)),
  maxPrice: z.coerce.number().min(0).optional().or(z.literal(0)),
  color: z.string().optional(),
  size: z.string().optional(),
  material: z.string().optional(),
  sortBy: z
    .enum(["price_asc", "price_desc", "newest", "trending"])
    .default("newest"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(12),
});

/**
 * Schema for Product Search Modal
 */
export const ProductSearchSchema = z.object({
  query: z.string().min(1, "Search term is required").max(100),
});

/**
 * Type Inference for Form Usage
 */
export type ProductFilterValues = z.infer<typeof ProductFilterSchema>;
export type ProductSearchValues = z.infer<typeof ProductSearchSchema>;
