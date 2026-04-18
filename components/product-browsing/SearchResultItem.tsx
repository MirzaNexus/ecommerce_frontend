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
      className="flex items-center gap-4 p-2 cursor-pointer hover:bg-muted rounded-md transition-colors"
    >
      <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
        <p className="text-xs text-muted-foreground">{product.categoryName}</p>
      </div>
      <p className="text-sm font-bold text-primary">${product.minPrice}</p>
    </div>
  );
};
