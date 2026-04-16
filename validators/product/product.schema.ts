import { ProductStatus } from "@/types/product.types";
import * as z from "zod";

const variantSchema = z.object({
  sku: z.string().min(1),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0).optional().default(0),
  image: z.any().optional(),
  attributes: z
    .object({
      color: z.string().optional(),
      size: z.string().optional(),
      material: z.string().optional(),
      weight: z.string().optional(),
      dimensions: z
        .object({
          length: z.coerce.number().optional().default(0),
          width: z.coerce.number().optional().default(0),
          height: z.coerce.number().optional().default(0),
        })
        .optional(),
    })
    .optional(),
});

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional().default(""),
  categoryId: z.string().uuid(),
  basePrice: z.coerce.number().min(0).default(0),
  slug: z.string().optional().default(""),
  mainImage: z.any().optional(),
  variants: z.array(variantSchema).min(1),
});

// This is the type that React Hook Form MUST use
export type ProductFormValues = z.infer<typeof productSchema>;

// Specific schema for editing core data only
export const editCoreSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  basePrice: z.coerce.number().min(0),
  slug: z.string().min(3, "Slug is required"),
  status: z.nativeEnum(ProductStatus),
  mainImage: z.any().optional(),
});

export type EditCoreValues = z.infer<typeof editCoreSchema>;
