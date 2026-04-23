import { useBuyerProducts } from "../productBrowsing.ts/useBuyerProducts";
import { getRandomProduct } from "@/utils/hero-sanitizer";
import { useMemo } from "react";

export function useHeroProduct() {
  // We fetch a small limit (e.g., 10) to pick a random one from the latest arrivals
  const { data, isLoading, isError } = useBuyerProducts({
    limit: 10,
    sortBy: "newest",
  });

  // useMemo ensures we don't re-randomize on every re-render,
  // only when the data actually changes or on initial mount.
  const randomProduct = useMemo(() => {
    return getRandomProduct(data?.data);
  }, [data]);

  return {
    product: randomProduct,
    isLoading,
    isError,
  };
}
