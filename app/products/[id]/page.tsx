"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { useProduct } from "@/hooks/product/useProduct";
import { useCartStore } from "@/store/useCartStore"; // Import Store
import { ImageGallery } from "@/components/product-browsing/ImageGallery";
import { ProductInfo } from "@/components/product-browsing/ProductInfo";
import { VariantSelector } from "@/components/product-browsing/VariantSelector";
import { ProductDetailSkeleton } from "@/components/product-browsing/ProductDetailSkeleton";
import { CartDrawer } from "@/components/product-browsing/CartDrawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { useTrackRecommendation } from "@/hooks/recomndation/useRecommendation";
import { useAuthStore } from "@/store/authStore";
import { RelatedProductsSlider } from "@/components/recomendation/RelatedProductsSlider";
import { RecommendationEventType } from "@/types/recomendation.types";
import { v4 as uuidv4 } from "uuid";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const { data: product, isLoading, isError } = useProduct(id);

  const { mutate: trackEvent } = useTrackRecommendation();
  const userId = useAuthStore((s) => s.user?.id);

  // 1. Automatic View Tracking
  useEffect(() => {
    if (product && userId) {
      trackEvent({
        user_id: userId,
        product_id: product.id,
        category_id: product.categoryId,
        event_type: RecommendationEventType.VIEW,
        price_at_event: product.basePrice,
        idempotency_key: uuidv4(),
        quantity: 1, // Explicitly pass for VIEW
        algolia_payload: {
          eventName: "Product Viewed",
          index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "",
          userToken: userId,
          objectIDs: [product.id],
          timestamp: Date.now(),
        },
      });
    }
  }, [product?.id, userId, trackEvent]);
  // --- RECOMMENDATION LOGIC END ---

  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>(
    {},
  );

  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find((v) =>
      Object.entries(selectedAttrs).every(
        ([key, value]) =>
          v.attributes[key as keyof typeof v.attributes] === value,
      ),
    );
  }, [selectedAttrs, product]);

  // Logic: Current Stock determination
  const currentStock = selectedVariant?.stock ?? 0;
  const isOutOfStock =
    product?.variants && product.variants.length > 0
      ? !selectedVariant || currentStock <= 0
      : false;

  const displayImage = selectedVariant?.imageUrl || product?.imageUrl || "";

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      variantId: selectedVariant?.id,
      productId: product.id,
      name: product.name,
      categoryId: product.categoryId,
      price: selectedVariant?.price || product.basePrice,
      image: displayImage,
      attributes: selectedAttrs,
      quantity: quantity,
      stock: currentStock,
    });

    // --- TRACKING: ADD TO CART ---
    if (userId) {
      trackEvent({
        user_id: userId,
        product_id: product.id,
        category_id: product.categoryId,
        event_type: RecommendationEventType.ADD_TO_CART,
        price_at_event: selectedVariant?.price || product.basePrice,
        idempotency_key: uuidv4(),
        quantity: quantity, // Real quantity from state
        algolia_payload: {
          eventName: "Added to Cart",
          index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "",
          userToken: userId,
          objectIDs: [product.id],
          timestamp: Date.now(),
        },
      });
    }

    setIsCartOpen(true);
    toast.success("Added to Bag", {
      description: `${quantity}x ${product.name} added successfully.`,
    });
  };

  const handleImageClick = (clickedImageUrl: string) => {
    const matchingVariant = product?.variants?.find(
      (v) => v.imageUrl === clickedImageUrl,
    );
    if (matchingVariant) {
      setSelectedAttrs(matchingVariant.attributes as Record<string, string>);
    }
  };

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product)
    return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="sticky top-28">
              <ImageGallery
                selectedImage={displayImage}
                onImageClick={handleImageClick}
                images={[
                  product.imageUrl || "",
                  ...(product.variants
                    ?.map((v) => v.imageUrl)
                    .filter(Boolean) as string[]),
                ]}
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="rounded-full px-4 py-1 uppercase tracking-widest text-[10px]"
              >
                {product.categoryName || "Premium Collection"}
              </Badge>
              <ProductInfo
                name={product.name}
                description={product.description || ""}
                price={
                  selectedVariant
                    ? `$${selectedVariant.price}`
                    : `$${product.basePrice}`
                }
                sku={selectedVariant?.sku}
                category={product.categoryName}
              />
            </div>

            <Separator className="opacity-50" />

            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedAttributes={selectedAttrs}
                onChange={(k: string, v: string) => {
                  // Explicitly define types here
                  setSelectedAttrs((prev) => ({ ...prev, [k]: v }));
                  setQuantity(1);
                }}
              />
            )}

            <div className="pt-4 space-y-6">
              <div className="flex items-center gap-4">
                {/* --- QUANTITY COUNTER --- */}
                <div className="flex items-center border-2 rounded-full p-1 bg-muted/20">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isOutOfStock}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={isOutOfStock || quantity >= currentStock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="flex-1 h-14 rounded-full shadow-lg"
                  disabled={
                    isOutOfStock ||
                    ((product.variants?.length ?? 0) > 0 && !selectedVariant)
                  }
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {isOutOfStock ? "Out of Stock" : `Add to Bag`}
                </Button>
              </div>

              {/* Stock Warning Logic */}
              {selectedVariant && (
                <div className="text-center">
                  {currentStock <= 0 ? (
                    <p className="text-destructive font-bold text-sm uppercase">
                      Currently Unavailable
                    </p>
                  ) : quantity >= currentStock ? (
                    <p className="text-orange-600 font-bold text-[10px] uppercase">
                      Maximum Stock Reached
                    </p>
                  ) : (
                    currentStock <= 5 && (
                      <p className="text-destructive text-xs font-bold animate-pulse">
                        Only {currentStock} units left!
                      </p>
                    )
                  )}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase">
                    Express Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase">
                    Safe Payment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product && (
        <RelatedProductsSlider
          productId={product.id}
          categoryId={product.categoryId}
          title="Recommended For You"
          badgeText="Based on your interest"
        />
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
