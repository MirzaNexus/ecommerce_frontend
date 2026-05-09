// import React from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, Eye, Star, ShoppingBag } from "lucide-react";
// import { RecommendedProduct } from "@/types/guided-shopping";
// import { deepSanitize } from "@/utils/sanitizer";

// interface Props {
//   product: RecommendedProduct;
//   onAddToCart: (id: string, metadata?: any) => void;
//   onViewDetails: (id: string) => void;
// }

// export const ProductRecommendationCard = ({
//   product,
//   onAddToCart,
//   onViewDetails,
// }: Props) => {
//   const cleanProduct = deepSanitize(product);

//   return (
//     <Card className="w-[280px] shrink-0 overflow-hidden border-zinc-200 hover:shadow-md transition-all bg-white">
//       {/* 1. Image Section using imageUrl */}
//       <div className="relative aspect-square bg-zinc-50 border-b border-zinc-100">
//         <Badge className="absolute top-2 right-2 bg-primary/90 text-[10px] z-10">
//           <Star className="w-3 h-3 mr-1 fill-white" />
//           {cleanProduct.rankingScore}% Match
//         </Badge>

//         {cleanProduct.imageUrl ? (
//           <img
//             src={cleanProduct.imageUrl}
//             alt="Recommended Product"
//             className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-zinc-300">
//             <ShoppingBag className="w-12 h-12" />
//           </div>
//         )}
//       </div>

//       <CardContent className="p-4">
//         {/* 2. Price Display */}
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-sm font-bold text-primary">
//             {cleanProduct.price
//               ? `$${Number(cleanProduct.price).toFixed(2)}`
//               : "Price on Request"}
//           </span>
//         </div>

//         {/* 3. AI Reasoning */}
//         <p className="text-[11px] text-zinc-500 italic line-clamp-2 leading-snug">
//           "{cleanProduct.reasoning}"
//         </p>
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex-1 h-8 text-[11px]"
//           onClick={() => onViewDetails(cleanProduct.name!)}
//         >
//           <Eye className="w-3.5 h-3.5 mr-1.5" /> Details
//         </Button>
//         <Button
//           size="sm"
//           className="flex-1 h-8 text-[11px]"
//           onClick={() => onAddToCart(cleanProduct.productId, cleanProduct)}
//         >
//           <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Add
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

import React from "react";
import Link from "next/link"; // 👈 Navigation ke liye
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Star, ShoppingBag } from "lucide-react";
import { RecommendedProduct } from "@/types/guided-shopping";
import { deepSanitize } from "@/utils/sanitizer";

interface Props {
  product: RecommendedProduct;
  onAddToCart: (id: string, metadata?: any) => void;
  onViewDetails: (name: string) => void;
}

export const ProductRecommendationCard = ({
  product,
  onAddToCart,
  onViewDetails,
}: Props) => {
  const cleanProduct = deepSanitize(product);

  return (
    // FIX 1: Width 280px se kam karke 200px kardi taake chat mein fit aaye
    <Card className="w-[200px] shrink-0 overflow-hidden border-zinc-200 hover:shadow-lg transition-all bg-white flex flex-col">
      {/* FIX 2: Poore image area ko clickable banaya detail page ke liye */}
      <Link
        href={`/products/${cleanProduct.productId}`}
        className="relative block group"
      >
        <div className="relative aspect-[4/5] bg-zinc-50 border-b border-zinc-100 overflow-hidden">
          <Badge className="absolute top-1.5 right-1.5 bg-primary/90 text-[9px] px-1.5 h-5 z-10">
            <Star className="w-2.5 h-2.5 mr-1 fill-white" />
            {cleanProduct.rankingScore}%
          </Badge>

          {cleanProduct.imageUrl ? (
            <img
              src={cleanProduct.imageUrl}
              alt={cleanProduct.name}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-300">
              <ShoppingBag className="w-8 h-8" />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <CardContent className="p-3 flex-grow">
        {/* Product Name & Price */}
        <div className="mb-1">
          <h4
            className="text-xs font-semibold text-zinc-800 truncate"
            title={cleanProduct.name}
          >
            {cleanProduct.name}
          </h4>
          <p className="text-xs font-bold text-primary mt-0.5">
            {cleanProduct.price
              ? `$${Number(cleanProduct.price).toFixed(2)}`
              : "Contact for Price"}
          </p>
        </div>

        {/* AI Reasoning: Font size mazeed chota kiya */}
        <p className="text-[10px] text-zinc-500 italic line-clamp-2 leading-tight min-h-[2.5em]">
          "{cleanProduct.reasoning}"
        </p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-1.5">
        {/* Details Button: Ye AI se baat karne ke liye rakha hai */}
        <Button
          variant="outline"
          size="sm"
          className="w-full h-7 text-[10px] py-0"
          onClick={() => onViewDetails(cleanProduct.name!)}
        >
          <Eye className="w-3 h-3 mr-1" /> Ask Details
        </Button>

        {/* Add to Cart */}
        <Button
          size="sm"
          className="w-full h-7 text-[10px] py-0"
          onClick={() => onAddToCart(cleanProduct.productId, cleanProduct)}
        >
          <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
