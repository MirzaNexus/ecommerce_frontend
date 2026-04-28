"use client";

import { useEffect, useState } from "react";
import {
  Command, // Import the base Command component
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useProductSearch } from "@/hooks/productBrowsing.ts/useProductSearch";
import { SearchResultItem } from "./SearchResultItem";
import { useRouter } from "next/navigation";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const { searchTerm, setSearchTerm, data, isLoading } = useProductSearch();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {/* FIX: We wrap the interior in <Command>.
          Some Shadcn versions require this to initialize the cmdk store
          properly inside a Dialog.
      */}
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          placeholder="Search products..."
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          {isLoading && (
            <div className="p-4 text-center text-sm">Searching...</div>
          )}
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Products">
            {data?.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name} // Important: cmdk uses 'value' for internal filtering
                onSelect={() => handleSelect(product.id)}
              >
                <SearchResultItem product={product} onClick={() => {}} />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
