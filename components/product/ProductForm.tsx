"use client";

import FileUpload from "./ImageUpload";
import CategorySelect from "./CategoryTreeSelect";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Plus, ChevronRight, ChevronLeft, Upload } from "lucide-react";
import {
  productSchema,
  ProductFormValues,
} from "@/validators/product/product.schema";

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

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  isLoading: boolean;
}

export default function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const [step, setStep] = useState(1);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      basePrice: 0,
      variants: [{ sku: "", price: 0, stock: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1 ? ["name", "categoryId", "mainImage"] : [];
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Core Data */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Formal Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CategorySelect control={form.control as any} name="categoryId" />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category UUID</FormLabel>
                    <FormControl>
                      <Input placeholder="Paste Category ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Product details..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mainImage"
              render={({
                field: { value, onChange, ...fieldProps },
                fieldState,
              }) => (
                <FormItem>
                  <FormLabel>Main Product Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      // Ensures we safely get the first file if it's an array
                      value={Array.isArray(value) ? value[0] : value}
                      onChange={(file) => onChange(file ? [file] : [])}
                      error={fieldState.error?.message}
                      {...fieldProps} // Passes remaining props like ref, name, onBlur
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={nextStep} className="gap-2">
                Next: Variants <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        Step 2: Variants
        {/* Step 2: Variants */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold">Product Variants</h3>
                <p className="text-xs text-muted-foreground">
                  Add different sizes, colors or SKUs
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Adding variant..."); // Debugging ke liye
                  append({
                    sku: "",
                    price: 0,
                    stock: 0,
                    attributes: {
                      color: "",
                      size: "",
                    },
                  });
                }}
                className="gap-2 border-primary text-primary hover:bg-primary/5"
              >
                <Plus className="h-4 w-4" /> Add Another Variant
              </Button>
            </div>

            {/* Scrollable area for variants if they are many */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 border border-border rounded-xl bg-muted/10 space-y-6 relative group"
                >
                  {/* 1. Core Variant Data */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.sku`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase">
                            SKU
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="RED-XL-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase">
                            Price
                          </FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.stock`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase">
                            Stock
                          </FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 2. Visual Attributes (Color, Size, Material) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.color`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Color</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Navy Blue" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.size`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. XL" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.material`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Material</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 100% Cotton" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 3. Physical Specs (Weight & Dimensions) */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-background/50 p-3 rounded-lg border border-border">
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.weight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px]">Weight</FormLabel>
                          <FormControl>
                            <Input placeholder="0.5kg" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.dimensions.length`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px]">Length</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="L" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.dimensions.width`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px]">Width</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="W" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`variants.${index}.attributes.dimensions.height`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px]">Height</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="H" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* 4. Variant Image Upload */}
                  <FormField
                    control={form.control}
                    name={`variants.${index}.image`}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-muted-foreground">
                          VARIANT IMAGE
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            value={field.value?.[0]}
                            onChange={(file) =>
                              field.onChange(file ? [file] : undefined)
                            }
                            error={fieldState.error?.message}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Delete Button */}
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Back to Basic Info
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-[150px]"
              >
                {isLoading ? "Creating Product..." : "Finalize & Create"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
