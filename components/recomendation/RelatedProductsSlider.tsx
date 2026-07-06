"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useRelatedProducts } from "@/hooks/recomndation/useRecommendation";
import { ProductCard } from "../product-browsing/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface RelatedProductsSliderProps {
  productId: string;
  categoryId: string;
  title?: string;
  badgeText?: string;
}

export function RelatedProductsSlider({
  productId,
  categoryId,
  title = "Related Products",
  badgeText = "Recommended",
}: RelatedProductsSliderProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Using our specialized Recommendation Hook from Phase 3
  const { data, isLoading, isPlaceholderData } = useRelatedProducts({
    product_id: productId,
    category_id: categoryId,
    page: currentPage,
  });

  const totalPages = data?.totalPages || 1;

  const handleNext = () => {
    currentPage < totalPages ? setCurrentPage((p) => p + 1) : setCurrentPage(1);
  };

  const handlePrev = () => {
    currentPage > 1 ? setCurrentPage((p) => p - 1) : setCurrentPage(totalPages);
  };

  // If there are no related products and we aren't loading, don't render the section
  if (!isLoading && data?.items.length === 0) return null;

  return (
    <section className="py-24 px-4 overflow-hidden bg-white border-t border-slate-50">
      <div className="max-w-[1440px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-10 bg-indigo-600" />
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">
                {badgeText}
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {title.split(" ")[0]}{" "}
              <span className="text-transparent [-webkit-text-stroke:1px_#0f172a]">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>

            {/* Show Source Indicator in Dev Mode (Helpful for testing Phase 3) */}
            {process.env.NODE_ENV === "development" && (
              <span className="text-[10px] text-slate-300 font-mono">
                Source: {data?.source || "loading..."}
              </span>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-5">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                disabled={totalPages <= 1}
                className="group p-4 rounded-full border border-slate-200 hover:bg-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-all duration-500"
              >
                <ChevronLeft
                  size={22}
                  className="group-hover:text-white transition-colors"
                />
              </button>
              <button
                onClick={handleNext}
                disabled={totalPages <= 1}
                className="group p-4 rounded-full border border-slate-200 hover:bg-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-all duration-500"
              >
                <ChevronRight
                  size={22}
                  className="group-hover:text-white transition-colors"
                />
              </button>
            </div>

            <Link href={`/category/${categoryId}`}>
              <Button
                variant="ghost"
                className="h-auto p-0 pb-1 text-xs font-black uppercase italic tracking-[0.2em] border-b-2 border-indigo-600 rounded-none hover:bg-transparent hover:text-indigo-600 transition-all"
              >
                Explore Category <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700",
            isLoading || isPlaceholderData
              ? "opacity-40 grayscale-[0.5]"
              : "opacity-100",
          )}
        >
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="w-full">
                  <ProductCardSkeleton />
                </div>
              ))
            : data?.items.map((product) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                >
                  {/* Reuse existing ProductCard - Passing our typed product */}
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700",
                  currentPage === i + 1
                    ? "w-16 bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                    : "w-4 bg-slate-200 hover:bg-slate-300",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
