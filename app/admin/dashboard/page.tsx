"use client";

import {
  PackageCheck,
  ListTree,
  LayoutDashboard,
  TrendingUp,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const { stats, isLoading, isError } = useDashboardStats();

  // --- Error State UI ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="bg-rose-50 p-4 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-rose-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Oops! Something went wrong
        </h2>
        <p className="text-slate-500 max-w-xs mt-2">
          We couldn't load your dashboard stats. Please check your connection or
          try again.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl border-slate-200"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-10">
      {/* --- Section 1: Header Section (Matching Product List Style) --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">
            <LayoutDashboard size={16} />
            <span>Store Performance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium max-w-md leading-relaxed">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Quick Actions (Optional but looks professional) */}
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button
              variant="ghost"
              className="rounded-2xl font-bold text-slate-600 hover:bg-slate-100 gap-2"
            >
              View Inventory <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* --- Section 2: Stats Grid (Responsive for all devices) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Render 2 Loading Skeletons while fetching
          [1, 2].map((i) => (
            <div
              key={i}
              className="h-44 w-full bg-slate-100 animate-pulse rounded-[2.5rem] border border-slate-200"
            />
          ))
        ) : (
          <>
            <StatCard
              title="Published Products"
              value={stats.totalPublishedProducts}
              icon={PackageCheck}
              description="Inventory live for customers"
              colorClassName="text-emerald-600 bg-emerald-50"
            />

            <StatCard
              title="Active Categories"
              value={stats.totalCategories}
              icon={ListTree}
              description="Organized product segments"
              colorClassName="text-blue-600 bg-blue-50"
            />

            {/* Placeholder for future stats (e.g. Sales or Orders) */}
            <div className="hidden lg:flex bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] items-center justify-center p-6">
              <div className="text-center space-y-1">
                <TrendingUp className="mx-auto text-slate-300" size={32} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  More Stats Coming
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- Section 3: Recent Activity / Next Steps (Visual Filler) --- */}
      {!isLoading && (
        <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl font-black leading-tight">
              Ready to expand your catalog?
            </h2>
            <p className="text-indigo-100 font-medium opacity-90">
              Your store currently has {stats.totalCategories} categories.
              Adding more diverse products can increase your visibility.
            </p>
            <div className="pt-4">
              <Link href="/admin/products">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl font-black px-8 py-6 shadow-xl transition-transform hover:scale-105">
                  Manage Products
                </Button>
              </Link>
            </div>
          </div>
          {/* Abstract background shape */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
      )}
    </div>
  );
}
