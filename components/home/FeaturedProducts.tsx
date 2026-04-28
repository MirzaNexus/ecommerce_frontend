"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useBuyerProducts } from "@/hooks/productBrowsing.ts/useBuyerProducts";
import { ProductCard } from "../product-browsing/ProductCard";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ProductQueryParams } from "@/types/productBrowsing.types";
import Link from "next/link";

interface ProductSliderProps {
  title: string;
  badgeText?: string;
  subtitle?: string;
  initialFilters?: Partial<ProductQueryParams>;
}

export function ProductSlider({
  title,
  badgeText = "New Drop",
  subtitle,
  initialFilters = {},
}: ProductSliderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const { data, isLoading, isPlaceholderData } = useBuyerProducts({
    ...initialFilters,
    limit: ITEMS_PER_PAGE,
    page: currentPage,
  });

  const totalPages = data?.meta?.totalPages || 1;

  const handleNext = () => {
    currentPage < totalPages ? setCurrentPage((p) => p + 1) : setCurrentPage(1);
  };

  const handlePrev = () => {
    currentPage > 1 ? setCurrentPage((p) => p - 1) : setCurrentPage(totalPages);
  };

  return (
    <section className="py-24 px-4 overflow-hidden bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header Section - Theming Restored */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            {/* Styled Badge */}
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-10 bg-indigo-600" />
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">
                {badgeText}
              </span>
            </div>

            {/* Dynamic Typography with Stroke */}
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              {title.split(" ")[0]}{" "}
              <span className="text-transparent [-webkit-text-stroke:1px_#0f172a]">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>

            {subtitle && (
              <p className="text-slate-500 font-medium max-w-md">{subtitle}</p>
            )}
          </div>

          {/* Controls - Theming Restored */}
          <div className="flex items-center gap-5">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="group p-4 rounded-full border border-slate-200 hover:bg-slate-950 transition-all duration-500"
              >
                <ChevronLeft
                  size={22}
                  className="group-hover:text-white transition-colors"
                />
              </button>
              <button
                onClick={handleNext}
                className="group p-4 rounded-full border border-slate-200 hover:bg-slate-950 transition-all duration-500"
              >
                <ChevronRight
                  size={22}
                  className="group-hover:text-white transition-colors"
                />
              </button>
            </div>

            <Link href={`/products?sortBy=${initialFilters.sortBy}`}>
              <Button
                variant="ghost"
                className="h-auto p-0 pb-1 text-xs font-black uppercase italic tracking-[0.2em] border-b-2 border-indigo-600 rounded-none hover:bg-transparent hover:text-indigo-600 transition-all"
              >
                View All <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Grid - Theming Restored */}
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
                <div
                  key={i}
                  className="h-[480px] w-full bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"
                />
              ))
            : data?.data.map((product) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                >
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {/* Custom Pagination Indicator - Theming Restored */}
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
      </div>
    </section>
  );
}
