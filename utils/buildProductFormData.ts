import { ProductFormValues } from "@/types/product.types";

export function buildProductFormData(data: ProductFormValues) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description ?? "");
  formData.append("categoryId", data.categoryId);

  // ✅ FIX: use image (NOT imageFile)
  if (data.image) {
    formData.append("mainImage", data.image);
  }

  const cleanedVariants = data.variants.map((v) => ({
    sku: v.sku,
    price: Number(v.price),
    stock: Number(v.stock),

    attributes: {
      color: v.attributes?.color,
      size: v.attributes?.size,
      material: v.attributes?.material,
      weight: v.attributes?.weight,
      dimensions: v.attributes?.dimensions
        ? {
            height: Number(v.attributes.dimensions.height),
            width: Number(v.attributes.dimensions.width),
            length: Number(v.attributes.dimensions.length),
          }
        : undefined,
    },
  }));

  formData.append("variants", JSON.stringify(cleanedVariants));

  // ✅ FIX: use image (NOT imageFile)
  data.variants.forEach((v) => {
    if (v.image) {
      formData.append("variantImages", v.image);
    }
  });

  return formData;
}
