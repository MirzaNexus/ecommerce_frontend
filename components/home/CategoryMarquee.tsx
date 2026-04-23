"use client";

import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/category/useCategoriesList";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CategoryMarquee() {
  const router = useRouter();
  const { data: categories, isLoading } = useCategories();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?categoryId=${categoryId}`);
  };

  if (isLoading) {
    return (
      // Matching the new height for the skeleton state
      <div className="h-32 md:h-44 flex items-center justify-around border-y border-slate-100 bg-white">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-40 bg-slate-100 rounded-lg" />
        ))}
      </div>
    );
  }

  const displayCategories = [...(categories || []), ...(categories || [])];

  return (
    <div className="relative h-32 md:h-44 flex items-center border-y border-slate-100 bg-white overflow-hidden group">
      {/* 🟢 Premium Edge Fades: Wider on desktop for better blending */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* 🟢 Marquee Container with proper vertical alignment */}
      <div className="flex w-max animate-marquee whitespace-nowrap items-center py-4">
        {displayCategories.map((category, idx) => (
          <button
            key={`${category.id}-${idx}`}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              // Increased spacing and italic black styling
              "mx-10 md:mx-16 text-4xl md:text-6xl font-black italic uppercase tracking-[0.25em]",
              "text-slate-200 transition-all duration-700 ease-in-out",
              "hover:text-indigo-600 hover:scale-105 hover:tracking-[0.35em]",
              "cursor-pointer outline-none focus:text-indigo-600",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
