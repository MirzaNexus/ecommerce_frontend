"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { useHeroProduct } from "@/hooks/home/useHeroProduct";
import { sanitizeHeroData } from "@/utils/hero-sanitizer";

export function Hero() {
  const router = useRouter();
  const { product, isLoading } = useHeroProduct();
  const displayData = sanitizeHeroData(product);

  const handleShopLook = () => {
    if (product?.id) router.push(`/products/${product.id}`);
  };

  const handleExploreAll = () => {
    router.push("/products");
  };

  return (
    <section className="relative min-h-[700px] h-[85vh] w-full overflow-hidden rounded-[3rem] bg-slate-950 mt-4 group">
      {/* 1. Optimized Background Layer */}
      <div className="absolute inset-0 z-0 transition-transform duration-[10s] ease-out group-hover:scale-110">
        {!isLoading && (
          <Image
            src={displayData.imageUrl}
            alt={displayData.name}
            fill
            priority
            className="object-cover object-center opacity-70 transition-opacity duration-700 group-hover:opacity-50"
            sizes="100vw"
            quality={90}
          />
        )}

        {/* --- LIGHTING EFFECTS --- */}
        {/* Base Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950 z-10" />

        {/* 🟢 NEW: Hover Lighting Glow Effect */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

        {/* 🟢 NEW: Dynamic Lighting Strike (Soft Light) */}
        <div className="absolute inset-0 z-10 mix-blend-soft-light opacity-30 group-hover:opacity-60 transition-all duration-700 bg-gradient-to-tr from-indigo-500/10 via-white/5 to-purple-500/10" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-20 h-full flex flex-col items-center justify-between pt-16 pb-12 px-6">
        {/* Top: Animated Badge */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
          <Sparkles size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px]">
            Limited Edition Drop
          </span>
        </div>

        {/* Middle: Hero Text (Fluid Sizing) */}
        <div className="max-w-7xl flex flex-col items-center">
          {/* 🟢 Text Glow Effect on Hover */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_50px_rgba(99,102,241,0.4)] transition-all duration-700 text-center">
            {isLoading ? "LOADING" : displayData.name.split(" ")[0]} <br />
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] hover:[-webkit-text-stroke:1px_#fff] transition-all duration-700 cursor-default">
              {displayData.name.split(" ")[1] || "COLLECTION"}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-slate-200 text-sm md:text-base font-light leading-relaxed drop-shadow-md text-center opacity-90">
            {product?.description ||
              "Pushing the boundaries of street culture. Designed for those who define the next era."}
          </p>
        </div>

        {/* Bottom: Interactive Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Button
            onClick={handleShopLook}
            disabled={isLoading}
            className="group/btn h-14 md:h-16 px-10 rounded-2xl bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 font-black uppercase italic tracking-widest text-xs transition-all duration-500 shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)]"
          >
            Shop This Look
            <ShoppingBag
              className="ml-3 group-hover/btn:translate-x-1 transition-transform"
              size={18}
            />
          </Button>

          <Button
            onClick={handleExploreAll}
            variant="outline"
            className="h-14 md:h-16 px-10 rounded-2xl border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 font-black uppercase italic tracking-widest text-xs transition-all duration-500"
          >
            Explore All Products
            <ArrowRight className="ml-3" size={18} />
          </Button>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-12 right-10 hidden xl:block">
        <div className="text-white/20 text-[10px] font-mono rotate-90 origin-right tracking-[0.5em] uppercase">
          E-Comm // MODULAR // 2026
        </div>
      </div>
    </section>
  );
}
