"use client";

import { useMemo } from "react";
import { useCategoryTree } from "@/hooks/category/useCategories";
import { flattenCategoryTree } from "@/utils/flattenTree";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface CategorySelectProps {
  control: Control<any>;
  name: string;
}

export default function CategorySelect({ control, name }: CategorySelectProps) {
  const { data: tree, isLoading } = useCategoryTree();

  // Memoize the flattened list to avoid re-calculating on every render
  const flatCategories = useMemo(() => {
    return tree ? flattenCategoryTree(tree) : [];
  }, [tree]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Category</FormLabel>
          <FormControl>
            <select
              {...field}
              disabled={isLoading}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
            >
              <option value="">
                {isLoading ? "Loading categories..." : "Select a category"}
              </option>
              {flatCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {/* Visual Indentation for hierarchy using non-breaking spaces */}
                  {"\u00A0".repeat(cat.level * 4)}
                  {cat.level > 0 ? "↳ " : ""}
                  {cat.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
