"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden rounded-[2.5rem] bg-slate-900 mt-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000')] bg-cover bg-center opacity-60 mix-blend-overlay" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs mb-4 italic animate-in fade-in slide-in-from-bottom-4 duration-700">
          New Season Arrival
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Elevate Your <br />{" "}
          <span className="text-transparent stroke-text">Style Game</span>
        </h1>
        <div className="flex gap-4">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-indigo-600 hover:text-white rounded-full px-8 font-black uppercase italic tracking-widest text-xs transition-all duration-300"
          >
            Shop Now <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
      `}</style>
    </section>
  );
}
