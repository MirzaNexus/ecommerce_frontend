import { Hero } from "@/components/home/Hero";
import { ProductSlider } from "@/components/home/FeaturedProducts";
import { CategoryMarquee } from "@/components/home/CategoryMarquee";

export default function HomePage() {
  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-8">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Marquee (Quick visual) */}
      <CategoryMarquee />

      {/* 3. Featured Products Section */}
      {/* Section 1 */}
      <ProductSlider
        title="Trending Now"
        badgeText="Popular"
        subtitle="The pieces everyone is talking about right now."
        initialFilters={{ sortBy: "trending" }}
      />

      {/* Section 2 */}
      <ProductSlider
        title="New Arrivals"
        badgeText="Fresh Drop"
        subtitle="Just landed in our warehouse. Exclusive modular styles."
        initialFilters={{ sortBy: "newest" }}
      />

      {/* 4. Mini Promo Banner */}
      <section
        id="newsletter-section"
        className="my-12 bg-indigo-600 rounded-[2rem] p-12 relative overflow-hidden"
      >
        <div className="relative z-10 text-center">
          <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter mb-4">
            Get Your First Order
          </h3>
          <p className="text-indigo-100 mb-6 font-medium">
            Join the Clothify squad and stay ahead of the trends.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black uppercase italic text-xs">
              Join Now
            </button>
          </div>
        </div>
        {/* Abstract Circles for design */}
        <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-700 rounded-full blur-3xl opacity-50" />
      </section>
    </main>
  );
}
