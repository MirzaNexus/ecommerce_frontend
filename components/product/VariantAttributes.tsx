"use client";

import { useFormContext } from "react-hook-form";

interface Props {
  index: number;
}

export default function VariantAttributes({ register, index }: any) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Color"
          {...register(`variants.${index}.attributes.color`)}
        />
        <input
          placeholder="Size"
          {...register(`variants.${index}.attributes.size`)}
        />
        <input
          placeholder="Material"
          {...register(`variants.${index}.attributes.material`)}
        />
        <input
          placeholder="Weight"
          {...register(`variants.${index}.attributes.weight`)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input
          placeholder="Height"
          type="number"
          {...register(`variants.${index}.attributes.dimensions.height`)}
        />

        <input
          placeholder="Width"
          type="number"
          {...register(`variants.${index}.attributes.dimensions.width`)}
        />

        <input
          placeholder="Length"
          type="number"
          {...register(`variants.${index}.attributes.dimensions.length`)}
        />
      </div>
    </div>
  );
}
