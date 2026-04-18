"use client";

import React, { useState, useMemo, use } from "react"; // 1. 'use' hook import karein
import { useProduct } from "@/hooks/product/useProduct";
import { ImageGallery } from "@/components/product-browsing/ImageGallery";
import { ProductInfo } from "@/components/product-browsing/ProductInfo";
import { VariantSelector } from "@/components/product-browsing/VariantSelector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// 2. Props mein params ko Promise define karein
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  // 3. use() hook ke zariye params unwrap karein
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const { data: product, isLoading, isError } = useProduct(id);

  // Local state for selected variant attributes
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>(
    {},
  );

  // Memoized: Find the exact variant based on selected attributes
  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find((v) =>
      Object.entries(selectedAttrs).every(
        ([key, value]) =>
          v.attributes[key as keyof typeof v.attributes] === value,
      ),
    );
  }, [selectedAttrs, product]);

  const handleAttrChange = (key: string, value: string) => {
    setSelectedAttrs((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product)
    return <div className="text-center py-20">Product not found.</div>;

  const currentPrice = selectedVariant
    ? `$${selectedVariant.price}`
    : product.basePrice > 0
      ? `$${product.basePrice}`
      : "Contact for Price";

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Images */}
        <ImageGallery
          images={[
            product.imageUrl || "",
            ...(product.variants
              ?.map((v) => v.imageUrl)
              .filter(Boolean) as string[]),
          ]}
        />

        {/* Right: Info & Actions */}
        <div className="flex flex-col space-y-8">
          <ProductInfo
            name={product.name}
            description={product.description || ""}
            price={currentPrice}
          />

          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedAttributes={selectedAttrs}
              onChange={handleAttrChange}
            />
          )}

          <div className="pt-6 space-y-4">
            <Button
              size="lg"
              className="w-full text-lg h-14"
              disabled={
                product.variants &&
                product.variants.length > 0 &&
                !selectedVariant
              }
            >
              {selectedVariant ? "Add to Cart" : "Select Options"}
            </Button>

            {selectedVariant &&
              selectedVariant.stock !== undefined &&
              selectedVariant.stock <= 5 && (
                <p className="text-orange-500 text-sm font-medium">
                  Only {selectedVariant.stock} left in stock!
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <Skeleton className="aspect-3/4 w-full rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}
