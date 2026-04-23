"use client";

import React from "react";
import Link from "next/link";

import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollToNewsletter = () => {
    const section = document.getElementById("newsletter-section");

    if (pathname === "/" && section) {
      // 1. Agar Home page par hi hain toh smooth scroll karein
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // 2. Agar dusre page par hain toh Home par jayein with hash
      router.push("/#newsletter-section");
    }
  };

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/products?sortBy=newest" },
      { name: "Trending Now", href: "/products?sortBy=trending" },
      { name: "Featured Collections", href: "/products" },
    ],
    support: [
      { name: "Order Tracking", href: "/orders" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "FAQs", href: "/faq" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Sustainability", href: "/mission" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      {/* 🟢 Top Section: Trust Signals */}
      <div className="border-b border-slate-50">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-50">
          <div className="flex items-center justify-center gap-4 p-8 group">
            <Truck
              className="text-indigo-600 transition-transform group-hover:-translate-y-1"
              size={24}
            />
            <div className="text-center md:text-left">
              <h4 className="text-xs font-black uppercase tracking-widest italic">
                Free Shipping
              </h4>
              <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">
                On all orders over $150
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-8 group">
            <RefreshCcw
              className="text-indigo-600 transition-transform group-hover:rotate-180 duration-700"
              size={24}
            />
            <div className="text-center md:text-left">
              <h4 className="text-xs font-black uppercase tracking-widest italic">
                30-Day Returns
              </h4>
              <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">
                Hassle-free exchanges
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-8 group">
            <ShieldCheck
              className="text-indigo-600 transition-transform group-hover:scale-110"
              size={24}
            />
            <div className="text-center md:text-left">
              <h4 className="text-xs font-black uppercase tracking-widest italic">
                Secure Payment
              </h4>
              <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">
                100% Encrypted transactions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">
              Modular <span className="text-indigo-600">Drop</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Redefining contemporary style through modular design and
              architectural silhouettes. Join the future of fashion.
            </p>
            {/* <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Github].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div> */}
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Shop
              </h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Support
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:block space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-8 rounded-[2rem] space-y-4">
              <h4 className="text-lg font-black italic uppercase tracking-tighter">
                Stay in the Loop
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Subscribe to receive drop alerts and exclusive early access.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Email Address"
                  className="rounded-full bg-white border-none text-xs focus-visible:ring-1 focus-visible:ring-indigo-600"
                />
                {/* Button click handle karein */}
                <Button
                  onClick={handleScrollToNewsletter}
                  className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-6"
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            &copy; {currentYear} Modular Drop Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-6 grayscale opacity-50">
            {/* Replace with actual SVG icons for Visa, MC, etc. */}
            <span className="text-[10px] font-black italic tracking-widest">
              VISA
            </span>
            <span className="text-[10px] font-black italic tracking-widest">
              MASTERCARD
            </span>
            <span className="text-[10px] font-black italic tracking-widest">
              STRIPE
            </span>
            <span className="text-[10px] font-black italic tracking-widest">
              PAYPAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
