import { VariantResponse } from "@/types/productBrowsing.types";

interface VariantSelectorProps {
  variants: VariantResponse[];
  selectedAttributes: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

// export const VariantSelector = ({
//   variants,
//   selectedAttributes,
//   onChange,
// }: VariantSelectorProps) => {
//   // Extract unique options for each attribute type (color, size, etc.)
//   const getUniqueOptions = (attr: "color" | "size" | "material") => {
//     return Array.from(
//       new Set(variants.map((v) => v.attributes[attr]).filter(Boolean)),
//     );
//   };

//   const colors = getUniqueOptions("color");
//   const sizes = getUniqueOptions("size");

//   return (
//     <div className="space-y-6">
//       {colors.length > 0 && (
//         <div className="space-y-3">
//           <label className="text-sm font-semibold uppercase">Color</label>
//           <div className="flex gap-2">
//             {colors.map((color) => (
//               <button
//                 key={color}
//                 onClick={() => onChange("color", color!)}
//                 className={`w-10 h-10 rounded-full border-2 transition-all ${
//                   selectedAttributes.color === color
//                     ? "border-primary scale-110"
//                     : "border-transparent"
//                 }`}
//                 style={{ backgroundColor: color?.toLowerCase() }}
//                 title={color!}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {sizes.length > 0 && (
//         <div className="space-y-3">
//           <label className="text-sm font-semibold uppercase">Size</label>
//           <div className="flex flex-wrap gap-2">
//             {sizes.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => onChange("size", size!)}
//                 className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
//                   selectedAttributes.size === size
//                     ? "bg-primary text-primary-foreground border-primary"
//                     : "bg-background hover:border-primary"
//                 }`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// VariantSelector component matches the refined circle style with tooltips/labels
export const VariantSelector = ({
  variants,
  selectedAttributes,
  onChange,
}: any) => {
  const getUniqueOptions = (attr: string) => [
    ...new Set(variants.map((v: any) => v.attributes[attr]).filter(Boolean)),
  ];

  const colors = getUniqueOptions("color");
  const sizes = getUniqueOptions("size");

  return (
    <div className="space-y-8 py-2">
      {colors.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest">
              Color:{" "}
              <span className="text-muted-foreground">
                {selectedAttributes.color || "Select"}
              </span>
            </label>
          </div>
          <div className="flex gap-4">
            {colors.map((color: any) => (
              <button
                key={color}
                onClick={() => onChange("color", color)}
                className={`group relative w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 ${
                  selectedAttributes.color === color
                    ? "border-primary ring-4 ring-primary/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div
                  className="w-full h-full rounded-full border border-black/5"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest">
            Size:{" "}
            <span className="text-muted-foreground">
              {selectedAttributes.size || "Select"}
            </span>
          </label>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size: any) => (
              <button
                key={size}
                onClick={() => onChange("size", size)}
                className={`min-w-[60px] h-12 px-4 rounded-xl border-2 font-medium transition-all ${
                  selectedAttributes.size === size
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-background border-border hover:border-primary/50"
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
