import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Shadcn
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Shadcn
import { BuyerProductResponse } from "@/types/productBrowsing.types";

interface ProductCardProps {
  product: BuyerProductResponse;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const priceRange =
    product.minPrice === product.maxPrice
      ? `$${product.minPrice}`
      : `$${product.minPrice} - $${product.maxPrice}`;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardContent className="p-0 relative aspect-3/4 overflow-hidden bg-muted">
          <Image
            src={product.imageUrl || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.variantCount > 0 && (
            <Badge
              className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm"
              variant="outline"
            >
              {product.variantCount} Variants
            </Badge>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 bg-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.categoryName}
          </p>
          <h3 className="font-heading text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-primary font-bold">{priceRange}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";
