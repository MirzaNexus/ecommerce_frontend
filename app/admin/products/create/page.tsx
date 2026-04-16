"use client";
import ProductForm from "@/components/product/ProductForm";
import { useCreateProduct } from "@/hooks/product/useProductMutations";
import { ProductFormValues } from "@/validators/product/product.schema";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductCreatePage() {
  const router = useRouter();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const handleCreateProduct = (values: ProductFormValues) => {
    const formData = new FormData();

    // 1. Append Core Data
    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("categoryId", values.categoryId);
    formData.append("basePrice", values.basePrice.toString());

    // 2. Main Image
    if (values.mainImage?.[0]) {
      formData.append("mainImage", values.mainImage[0]);
    }

    // 3. Process Variants (NestJS DTO expectation)
    const variantsData = values.variants.map((v) => ({
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      attributes: v.attributes || {},
    }));

    // Crucial: Append variants as string for JSON parsing on backend
    formData.append("variants", JSON.stringify(variantsData));

    // 4. Append Variant Images in order
    values.variants.forEach((v) => {
      if (v.image?.[0] instanceof File) {
        formData.append("variantImages", v.image[0]);
      }
    });

    createProduct(formData, {
      onSuccess: () => {
        toast.success("Product and variants created successfully!");
        router.push("/admin/products");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold">Add New Product</h1>
        <p className="text-muted-foreground mt-2">
          Setup your product details and inventory variants in two simple steps.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
        <ProductForm onSubmit={handleCreateProduct} isLoading={isPending} />
      </div>
    </div>
  );
}
