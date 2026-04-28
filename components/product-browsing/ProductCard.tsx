"use client";

import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BuyerProductResponse } from "@/types/productBrowsing.types";
import { ShoppingBag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "./CartDrawer";

interface ProductCardProps {
  product: BuyerProductResponse;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isSinglePrice = product.minPrice === product.maxPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      variantId: "",
      name: product.name,
      price: product.minPrice,
      image: product.imageUrl || "/placeholder-product.png",
      quantity: 1,
      stock: 50,
      attributes: { category: product.categoryName },
    });

    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="group relative space-y-4">
        {/* 1. Image Section (Clean Look) */}
        <Link
          href={`/products/${product.id}`}
          className="block relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200"
        >
          <Image
            src={product.imageUrl || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 25vw"
          />

          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Variant Info (Previous Style) */}
          {product.variantCount > 1 && (
            <div className="absolute top-5 right-5 backdrop-blur-xl bg-white/40 px-3 py-1.5 rounded-2xl border border-white/40 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-800">
                {product.variantCount} Options Available
              </p>
            </div>
          )}
        </Link>

        {/* 2. Content Section */}
        <div className="px-2 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">
                {product.categoryName || "Collection"}
              </p>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight line-clamp-1 italic">
                {product.name}
              </h3>
            </div>

            {/* Price section - Clean & Bold */}
            <div className="text-right">
              <p className="text-base font-black text-slate-900 tracking-tighter italic">
                ${product.minPrice}
              </p>
              {!isSinglePrice && (
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                  Starting at
                </p>
              )}
            </div>
          </div>

          {/* 3. Add to Cart Button (Aligned with Theme) */}
          <Button
            className="w-full h-12 rounded-[1.2rem] bg-slate-900 hover:bg-indigo-600 text-white border-0 flex items-center justify-center gap-3 transition-all active:scale-95 group/btn shadow-lg shadow-slate-900/10"
            onClick={handleAddToCart}
          >
            <ShoppingBag
              size={16}
              className="group-hover/btn:animate-bounce transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
              Add to Bag
            </span>
          </Button>
        </div>
      </div>

      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
});

ProductCard.displayName = "ProductCard";
