"use client";

import ImageUpload from "./ImageUpload";
import VariantAttributes from "./VariantAttributes";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/validators/product/product.schema";

export default function VariantFields() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 space-y-3">
          <input placeholder="SKU" {...register(`variants.${index}.sku`)} />

          <input
            type="number"
            placeholder="Price"
            {...register(`variants.${index}.price`, {
              valueAsNumber: true,
            })}
          />

          <input
            type="number"
            placeholder="Stock"
            {...register(`variants.${index}.stock`, {
              valueAsNumber: true,
            })}
          />

          {/* IMAGE */}
          <ImageUpload
            onChange={(file: File | null) =>
              setValue(`variants.${index}.image`, file)
            }
          />

          <VariantAttributes index={index} />

          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            sku: "",
            price: 0,
            stock: 0,
            image: null,
            attributes: {},
          })
        }
      >
        + Add Variant
      </button>
    </div>
  );
}
