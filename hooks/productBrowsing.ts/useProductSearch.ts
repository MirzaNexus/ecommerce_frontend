import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { productService } from "@/services/productBrowsingService";
import { productKeys } from "@/types/productBrowsing.types";

export function useProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const query = useFetch(
    productKeys.search(debouncedSearch),
    () => productService.searchProducts(debouncedSearch),
    {
      enabled: debouncedSearch.length >= 2, // Only search if 2+ characters
    },
  );

  return {
    searchTerm,
    setSearchTerm,
    ...query,
  };
}
