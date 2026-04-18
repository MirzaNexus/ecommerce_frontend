import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { ProductQueryParams } from "@/types/productBrowsing.types";

interface ActiveFiltersProps {
  filters: ProductQueryParams;
  onRemove: (key: keyof ProductQueryParams) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) => {
  const activeEntries = Object.entries(filters).filter(([key, value]) => {
    return value && !["page", "limit", "sortBy"].includes(key);
  });

  if (activeEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-medium text-muted-foreground">Active:</span>
      {activeEntries.map(([key, value]) => (
        <Badge key={key} variant="secondary" className="pl-2 pr-1 py-1 gap-1">
          <span className="capitalize">{key}:</span> {value}
          <button
            onClick={() => onRemove(key as keyof ProductQueryParams)}
            className="hover:bg-muted rounded-full p-0.5"
          >
            <X size={12} />
          </button>
        </Badge>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-error hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
};
