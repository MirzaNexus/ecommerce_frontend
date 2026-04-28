"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  createVariantSchema,
  updateVariantSchema,
  VariantFormValues,
} from "@/validators/product/variant.schema";

import { useVariantMutation } from "@/hooks/product/useVariantMutation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUpload from "./ImageUpload";

interface VariantFormModalProps {
  onClose: () => void;
  variant?: any;
  productId: string;
  productName?: string;
}

export function VariantFormModal({
  onClose,
  variant,
  productId,
  productName,
}: VariantFormModalProps) {
  const isEdit = !!variant;
  const { createMutation, updateMutation } = useVariantMutation(productId);

  // Switch schema based on mode
  const currentSchema = isEdit ? updateVariantSchema : createVariantSchema;

  const form = useForm<VariantFormValues>({
    resolver: zodResolver(currentSchema) as any,
    defaultValues: variant
      ? {
          ...variant,
          price: Number(variant.price),
          stock: variant.stock || 0,
          // Yahan structure ko manually build karein taake path break na ho
          attributes: {
            color: variant.attributes?.color || "",
            size: variant.attributes?.size || "",
            material: variant.attributes?.material || "",
            weight: variant.attributes?.weight || "",
            dimensions: {
              length: variant.attributes?.dimensions?.length ?? 0,
              width: variant.attributes?.dimensions?.width ?? 0,
              height: variant.attributes?.dimensions?.height ?? 0,
            },
          },
        }
      : {
          // Create mode ke liye bhi nested structure lazmi hai
          sku: "",
          price: 0,
          stock: 0,
          attributes: {
            color: "",
            size: "",
            material: "",
            weight: "",
            dimensions: { length: 0, width: 0, height: 0 },
          },
        },
  });

  const onSubmit = async (values: VariantFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        { id: variant.id, data: values },
        { onSuccess: onClose },
      );
    } else {
      createMutation.mutate(values, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mb-1 inline-block uppercase tracking-tighter">
              Inventory Manager
            </span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {isEdit ? "Update Variant" : "Add New Variation"}
            </h3>
            <p className="text-sm text-slate-400 font-medium">
              Product: {productName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white rounded-full transition-all border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8 overflow-y-auto custom-scrollbar"
          >
            {/* Image Section */}
            {/* <FormField
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                    Display Image
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                      // Note: FileUpload handles its own logic for 'variant.imageUrl' if 'value' is empty
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/* Row: Variant Image Section (With Current Image Preview) */}
            <FormField
              control={form.control}
              name="image" // Variant image field name
              render={({ field, fieldState }) => (
                <FormItem className="bg-slate-50 p-6 rounded-[2rem] border border-dashed border-slate-200">
                  <FormLabel className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">
                    Variant Image
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* 1. Show Current Image ONLY if no new file is selected */}
                      {!field.value && variant?.imageUrl && (
                        <div className="flex items-center gap-4 p-2 bg-white rounded-2xl border border-slate-100 w-fit">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                            <img
                              src={variant.imageUrl}
                              alt="Current Variant"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-indigo-600/80 py-0.5 text-[8px] text-white text-center font-black uppercase tracking-tighter">
                              Current
                            </div>
                          </div>
                          <div className="pr-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              Status
                            </p>
                            <p className="text-xs font-black text-slate-600">
                              Active Image
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 2. FileUpload Component */}
                      <FileUpload
                        value={
                          Array.isArray(field.value)
                            ? field.value[0]
                            : field.value
                        }
                        onChange={(file) =>
                          field.onChange(
                            file
                              ? Array.isArray(field.value)
                                ? [file]
                                : file
                              : undefined,
                          )
                        }
                        error={fieldState.error?.message}
                      />
                    </div>
                  </FormControl>
                  <p className="text-[10px] text-slate-400 mt-2 font-medium ml-1">
                    Tip: New upload will automatically replace the current
                    active image.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      SKU
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. SONY-WH-B"
                        className="rounded-xl border-slate-200 focus:ring-indigo-500"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Price ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        className="rounded-xl border-slate-200"
                        {...field}
                        value={isNaN(field.value) ? "" : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Warehouse Stock
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="rounded-xl border-slate-200"
                      {...field}
                      value={isNaN(field.value) ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specs Section - Updated with Dimensions */}
            <div className="pt-4 space-y-5 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
              <p className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3 bg-indigo-600 rounded-full" />{" "}
                Technical Specs & Dimensions
              </p>

              {/* Basic Attributes */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="attributes.color"
                  render={({ field }) => (
                    <Input
                      placeholder="Color"
                      className="bg-white rounded-xl"
                      {...field}
                      value={field.value || ""}
                    />
                  )}
                />
                <FormField
                  name="attributes.size"
                  render={({ field }) => (
                    <Input
                      placeholder="Size"
                      className="bg-white rounded-xl"
                      {...field}
                      value={field.value || ""}
                    />
                  )}
                />
                <FormField
                  name="attributes.material"
                  render={({ field }) => (
                    <Input
                      placeholder="Material"
                      className="bg-white rounded-xl"
                      {...field}
                      value={field.value || ""}
                    />
                  )}
                />
                <FormField
                  name="attributes.weight"
                  render={({ field }) => (
                    <Input
                      placeholder="Weight"
                      className="bg-white rounded-xl"
                      {...field}
                      value={field.value || ""}
                    />
                  )}
                />
              </div>

              {/* Dimensions Row - New Fields Added Here */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200/50">
                <FormField
                  name="attributes.dimensions.length"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">
                        Length
                      </span>
                      <Input
                        type="number"
                        placeholder="L"
                        className="bg-white rounded-xl"
                        {...field}
                        value={field.value ?? 0}
                      />
                    </div>
                  )}
                />
                <FormField
                  name="attributes.dimensions.width"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">
                        Width
                      </span>
                      <Input
                        type="number"
                        placeholder="W"
                        className="bg-white rounded-xl"
                        {...field}
                        value={field.value ?? 0}
                      />
                    </div>
                  )}
                />
                <FormField
                  name="attributes.dimensions.height"
                  render={({ field }) => (
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">
                        Height
                      </span>
                      <Input
                        type="number"
                        placeholder="H"
                        className="bg-white rounded-xl"
                        {...field}
                        value={field.value ?? 0}
                      />
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-200"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : isEdit
                    ? "Update Variant"
                    : "Create Variant"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
