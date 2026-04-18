import { VariantResponse } from "@/types/productBrowsing.types";

interface VariantSelectorProps {
  variants: VariantResponse[];
  selectedAttributes: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export const VariantSelector = ({
  variants,
  selectedAttributes,
  onChange,
}: VariantSelectorProps) => {
  // Extract unique options for each attribute type (color, size, etc.)
  const getUniqueOptions = (attr: "color" | "size" | "material") => {
    return Array.from(
      new Set(variants.map((v) => v.attributes[attr]).filter(Boolean)),
    );
  };

  const colors = getUniqueOptions("color");
  const sizes = getUniqueOptions("size");

  return (
    <div className="space-y-6">
      {colors.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold uppercase">Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onChange("color", color!)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedAttributes.color === color
                    ? "border-primary scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color?.toLowerCase() }}
                title={color!}
              />
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-semibold uppercase">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onChange("size", size!)}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                  selectedAttributes.size === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
