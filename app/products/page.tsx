"use client";

import React from "react";
import {
  LayoutGrid,
  ListFilter,
  AlertCircle,
  ChevronDown,
  FilterX,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBuyerProducts } from "@/hooks/productBrowsing.ts/useBuyerProducts";
import { useBuyerFilterSync } from "@/hooks/productBrowsing.ts/useProductFilterSync";

import { FilterSidebar } from "@/components/product-browsing/FilterSidebar";
import { ActiveFilters } from "@/components/product-browsing/ActiveFilters";
import { ProductCard } from "@/components/product-browsing/ProductCard";
import { SearchModal } from "@/components/product-browsing/SearchModal";

export default function ProductsPage() {
  const { filters, updateParams, clearFilters, removeParam } =
    useBuyerFilterSync();
  const { data, isLoading, isError, refetch } = useBuyerProducts(filters);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Search Modal Trigger (Ctrl+K listener) */}
      <SearchModal />

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {/* --- PAGE HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Collections
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Explore our curated selection of {data?.meta.total || 0} premium
              products.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={filters.sortBy || "newest"}
              onValueChange={(v) => updateParams({ sortBy: v })}
            >
              <SelectTrigger className="w-[180px] bg-card border-border/50 focus:ring-accent">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Arrival</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="trending">Trending Now</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <Separator className="mb-8 opacity-50" />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- SIDEBAR (Sticky) --- */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border/40 p-6 rounded-2xl shadow-sm">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateParams}
                />
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
            {/* Active Filters Bar */}
            <div className="mb-6 min-h-[40px]">
              <ActiveFilters
                filters={filters}
                onRemove={removeParam}
                onClearAll={clearFilters}
              />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[4/5] w-full rounded-2xl bg-muted/50" />
                    <Skeleton className="h-4 w-1/3 rounded-full" />
                    <Skeleton className="h-6 w-3/4 rounded-full" />
                    <Skeleton className="h-5 w-1/4 rounded-full" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-24 bg-card/30 border border-dashed border-error/20 rounded-3xl">
                <div className="bg-error/10 p-4 rounded-full mb-4">
                  <FilterX className="h-8 w-8 text-error" />
                </div>
                <h3 className="text-xl font-bold">Something went wrong</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't fetch the products at this time.
                </p>
                <Button onClick={() => refetch()} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                {data?.data.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-3xl border border-border/40">
                    <LayoutGrid className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <h3 className="text-2xl font-heading font-semibold">
                      No results found
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-xs">
                      We couldn't find any products matching your current search
                      or filters.
                    </p>
                    <Button
                      variant="link"
                      onClick={clearFilters}
                      className="mt-4 text-primary font-bold hover:no-underline underline-offset-4"
                    >
                      Reset all filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                    {data?.data.map((product) => (
                      <div
                        key={product.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Placeholder - Premium apps often use 'Load More' or subtle pagination */}
                {data && data.meta.totalPages > 1 && (
                  <div className="mt-20 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-12 rounded-full border-primary/20 hover:bg-primary/5"
                    >
                      Load More Products
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
