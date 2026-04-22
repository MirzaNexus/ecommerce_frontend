"use client";
import { Skeleton } from "../ui/skeleton";
import { useBuyerProducts } from "@/hooks/productBrowsing.ts/useBuyerProducts";
import { ProductCard } from "../product-browsing/ProductCard";

export function FeaturedProducts() {
  const { data, isLoading } = useBuyerProducts({ limit: 4, sortBy: "newest" });

  return (
    <section className="py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">
            Trending <span className="text-indigo-600">Now</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Selected pieces from our latest drop.
          </p>
        </div>
        <button className="text-xs font-black uppercase italic border-b-2 border-indigo-600 pb-1 hover:text-indigo-600 transition-all">
          View All Collection
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-96 w-full bg-slate-100 animate-pulse rounded-[1.5rem]"
              />
            ))
          : data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}
