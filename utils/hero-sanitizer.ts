// utils/hero-sanitizer.ts
import { BuyerProductResponse } from "@/types/productBrowsing.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000";

export const sanitizeHeroData = (product?: BuyerProductResponse | null) => {
  return {
    name: product?.name?.toUpperCase() || "NEW COLLECTION",
    imageUrl: product?.imageUrl || FALLBACK_IMAGE,
  };
};

/**
 * Logic to pick a random item from the paginated list
 */
export const getRandomProduct = (products: BuyerProductResponse[] = []) => {
  if (!products.length) return null;
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
};
