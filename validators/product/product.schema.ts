import { z } from "zod";
import { ProductStatus } from "../../types/product.types";

/* -------------------- DIMENSIONS -------------------- */
const dimensionsSchema = z.object({
  height: z.number().min(0),
  width: z.number().min(0),
  length: z.number().min(0),
});

/* -------------------- ATTRIBUTES -------------------- */
const attributesSchema = z.object({
  color: z.string().optional(),
  size: z.string().optional(),
  material: z.string().optional(),
  weight: z.string().optional(),
  dimensions: dimensionsSchema.optional(),
});

/* -------------------- VARIANT -------------------- */
const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.number().min(0, "Price must be >= 0"),
  stock: z.number().min(0).optional(),
  image: z.any().refine((file) => file instanceof File, {
    message: "Variant image is required",
  }),
  attributes: attributesSchema.optional(),
});

/* -------------------- PRODUCT -------------------- */
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().uuid(),
  basePrice: z.number().optional(),
  status: z.nativeEnum(ProductStatus).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Invalid slug")
    .optional(),
  image: z.any().refine((file) => file instanceof File, {
    message: "Product image is required",
  }),

  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
