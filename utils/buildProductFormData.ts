import { ProductFormValues } from "@/validators/product/product.schema";

export function buildProductFormData(data: ProductFormValues) {
  const formData = new FormData();

  // Main image
  formData.append("mainImage", data.image);

  // Variants images
  data.variants.forEach((variant) => {
    if (variant.image) {
      formData.append("variantImages", variant.image);
    }
  });

  // Prepare variants JSON (remove File)
  const variantsPayload = data.variants.map((v) => ({
    sku: v.sku,
    price: v.price,
    stock: v.stock ?? 0,
    attributes: v.attributes,
  }));

  formData.append("variants", JSON.stringify(variantsPayload));

  // Append other fields
  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  formData.append("categoryId", data.categoryId);

  if (data.basePrice !== undefined) {
    formData.append("basePrice", String(data.basePrice));
  }

  if (data.slug) formData.append("slug", data.slug);

  if (data.status) formData.append("status", data.status);

  return formData;
}
