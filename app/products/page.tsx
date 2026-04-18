"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useBuyerProducts } from "@/hooks/productBrowsing.ts/useBuyerProducts";
import { useBuyerFilterSync } from "@/hooks/productBrowsing.ts/useProductFilterSync";
import { FilterSidebar } from "@/components/product-browsing/FilterSidebar";
import { ActiveFilters } from "@/components/product-browsing/ActiveFilters";
import { ProductCard } from "@/components/product-browsing/ProductCard";
import { SearchModal } from "@/components/product-browsing/SearchModal";

export default function ProductsPage() {
  const { filters, updateParams, clearFilters, removeParam } =
    useBuyerFilterSync();
  const { data, isLoading, isError } = useBuyerProducts(filters);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Global Search Listener */}
      <SearchModal />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Desktop */}
        <aside className="w-full md:w-64 shrink-0">
          <FilterSidebar filters={filters} onFilterChange={updateParams} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col mb-6">
            <h1 className="text-3xl font-heading font-bold mb-2">Shop All</h1>
            <p className="text-muted-foreground">
              Showing {data?.meta.total || 0} products
            </p>
          </div>

          <ActiveFilters
            filters={filters}
            onRemove={removeParam}
            onClearAll={clearFilters}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-100 w-full rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-muted rounded-xl">
              <p className="text-error font-semibold">
                Failed to load products.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && data?.data.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium">
                No products match your filters.
              </h3>
              <button onClick={clearFilters} className="text-primary mt-2">
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
