// import React from "react";
// import Image from "next/image";
// import { BuyerProductResponse } from "@/types/productBrowsing.types";

// interface SearchResultItemProps {
//   product: BuyerProductResponse;
//   onClick: () => void;
// }

// export const SearchResultItem = ({
//   product,
//   onClick,
// }: SearchResultItemProps) => {
//   return (
//     <div
//       onClick={onClick}
//       className="flex items-center gap-4 p-2 cursor-pointer hover:bg-muted rounded-md transition-colors"
//     >
//       <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
//         <Image
//           src={product.imageUrl || "/placeholder.png"}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="flex-1">
//         <p className="text-sm font-medium line-clamp-1">{product.name}</p>
//         <p className="text-xs text-muted-foreground">{product.categoryName}</p>
//       </div>
//       <p className="text-sm font-bold text-primary">${product.minPrice}</p>
//     </div>
//   );
// };

import React from "react";
import Image from "next/image";
import { BuyerProductResponse } from "@/types/productBrowsing.types";

interface SearchResultItemProps {
  product: BuyerProductResponse;
  onClick: () => void;
}

export const SearchResultItem = ({
  product,
  onClick,
}: SearchResultItemProps) => {
  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-4 p-2.5 cursor-pointer transition-all duration-300"
    >
      {/* 🖼️ Image Container with Soft Rounded Edges */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-sm group-hover:border-indigo-100 transition-colors">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 📝 Product Info */}
      <div className="flex-1 space-y-0.5">
        <p className="text-[11px] font-black uppercase tracking-tight italic text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 italic">
            {product.categoryName}
          </span>
          {/* Subtle Dot Separator */}
          <div className="h-1 w-1 rounded-full bg-slate-200" />
          <span className="text-[9px] font-bold text-indigo-400 uppercase italic">
            In Stock
          </span>
        </div>
      </div>

      {/* 💰 Price Tag */}
      <div className="text-right">
        <p className="text-[12px] font-black italic text-slate-900">
          ${product.minPrice}
        </p>
        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
          Starting At
        </p>
      </div>
    </div>
  );
};
