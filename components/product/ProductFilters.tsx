"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { ProductStatus } from "@/types/product.types";

interface ProductFiltersProps {
  initialSearch: string;
  currentStatus: string;
  onFilterChange: (filters: { search?: string; status?: string }) => void;
}

export default function ProductFilters({
  initialSearch,
  currentStatus,
  onFilterChange,
}: ProductFiltersProps) {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchValue, 500);

  // Sync debounced search to parent
  useEffect(() => {
    onFilterChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-wrap gap-4 items-center bg-card p-4 border border-border rounded-xl mb-6">
      <div className="flex-1 min-w-[240px]">
        <Input
          placeholder="Search products by name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-background"
        />
      </div>

      <select
        value={currentStatus}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="bg-background border border-border text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      >
        <option value="">All Statuses</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
}
