import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProductQueryParams } from "@/types/productBrowsing.types";

interface FilterSidebarProps {
  filters: ProductQueryParams;
  onFilterChange: (updates: Partial<ProductQueryParams>) => void;
}

export const FilterSidebar = ({
  filters,
  onFilterChange,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-bold text-lg mb-4">Filters</h3>
        <Separator />
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              onFilterChange({ minPrice: Number(e.target.value) || undefined })
            }
            className="h-9"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              onFilterChange({ maxPrice: Number(e.target.value) || undefined })
            }
            className="h-9"
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(v) => onFilterChange({ sortBy: v as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Attributes (Color/Size) Placeholder */}
      {/* Note: In a real app, these would be fetched from a 'attributes' metadata endpoint */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Color</Label>
        <div className="flex flex-wrap gap-2">
          {["Black", "White", "Blue", "Red"].map((color) => (
            <button
              key={color}
              onClick={() =>
                onFilterChange({ color: filters.color === color ? "" : color })
              }
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.color === color
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:border-primary"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
