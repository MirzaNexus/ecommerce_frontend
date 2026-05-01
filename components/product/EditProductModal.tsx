"use client";

import CategorySelect from "./CategoryTreeSelect";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/types/product.types";
import { ProductStatus } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./ImageUpload";

// Specific schema for editing core data only
const editCoreSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  basePrice: z.coerce.number().min(0),
  slug: z.string().min(3, "Slug is required"),
  status: z.nativeEnum(ProductStatus),
  image: z.any().optional(),
});

type EditCoreValues = z.infer<typeof editCoreSchema>;

interface ProductEditFormProps {
  product: Product;
  onSubmit: (data: EditCoreValues) => void;
  isLoading: boolean;
}

export default function ProductEditForm({
  product,
  onSubmit,
  isLoading,
}: ProductEditFormProps) {
  const form = useForm<EditCoreValues>({
    resolver: zodResolver(editCoreSchema) as any,
    defaultValues: {
      name: product.name,
      description: product.description || "",
      categoryId: product.categoryId,
      basePrice: product.basePrice,
      slug: product.slug,
      status: product.status,
    },
  });

  // Re-sync if product data changes (e.g., if modal opens with a different product)
  useEffect(() => {
    form.reset({
      name: product.name,
      description: product.description || "",
      categoryId: product.categoryId,
      basePrice: product.basePrice,
      slug: product.slug,
      status: product.status,
    });
  }, [product, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-h-[85vh]"
      >
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-6 py-4 px-1">
            {/* Row 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Image Section (Standalone for better spacing) */}
            <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem className="bg-muted/30 p-4 rounded-xl border border-dashed border-border">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!field.value && product.imageUrl && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-background shadow-sm">
                          <img
                            src={product.imageUrl}
                            alt="Current"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 py-0.5 text-[9px] text-white text-center font-bold">
                            CURRENT
                          </div>
                        </div>
                      )}
                      <FileUpload
                        value={
                          Array.isArray(field.value)
                            ? field.value[0]
                            : field.value
                        }
                        onChange={(file) => field.onChange(file || undefined)}
                        error={fieldState.error?.message}
                      />
                    </div>
                  </FormControl>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Upload a new file to replace the current image.
                  </p>
                </FormItem>
              )}
            />

            {/* Row 3: Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CategorySelect control={form.control as any} name="categoryId" />
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 4: Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <select
                    {...field}
                    className="w-full bg-background border border-border rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value={ProductStatus.DRAFT}>Draft</option>
                    <option value={ProductStatus.PUBLISHED}>Published</option>
                    <option value={ProductStatus.ARCHIVED}>Archived</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row 5: Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Sticky Footer: 
            Always stays at the bottom regardless of scroll position 
        */}
        <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-border bg-card">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
