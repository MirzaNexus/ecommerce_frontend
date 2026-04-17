import { z } from "zod";

const baseVariant = {
  sku: z.string().min(1, "SKU is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().min(0).default(0),
  image: z.any().optional(),
  attributes: z
    .object({
      color: z.string().optional(),
      size: z.string().optional(),
      material: z.string().optional(),
      weight: z.string().optional(),
      dimensions: z
        .object({
          length: z.coerce.number().default(0),
          width: z.coerce.number().default(0),
          height: z.coerce.number().default(0),
        })
        .optional(),
    })
    .optional(),
};

export const createVariantSchema = z.object(baseVariant);
export const updateVariantSchema = z.object(baseVariant).partial(); // All fields optional for update

export type VariantFormValues = z.infer<typeof createVariantSchema>;
