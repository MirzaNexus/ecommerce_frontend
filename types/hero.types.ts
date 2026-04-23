import { BuyerProductResponse } from "@/types/productBrowsing.types";

export interface HeroProps {
  product?: BuyerProductResponse | null;
  isLoading: boolean;
}

export interface HeroDisplayData {
  title: string;
  imageUrl: string;
  fallbackUrl: string;
}
