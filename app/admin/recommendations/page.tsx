"use client";

import { RecommendationControlCenter } from "@/components/recomendation/RecommendationControlCenter";
import { useAdminRecommendationMetrics } from "@/hooks/recomndation/useAdminRecommendation";
import {
  Sparkles,
  Activity,
  AlertCircle,
  RefreshCcw,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecommendationAdminPage() {
  // Using the hook that maps to @Get('metrics')
  const {
    data: metrics,
    isLoading,
    isError,
    refetch,
  } = useAdminRecommendationMetrics();

  // --- Loading State (Project Style) ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="relative">
          <RefreshCcw className="h-12 w-12 text-indigo-600 animate-spin" />
          <Sparkles className="h-4 w-4 text-indigo-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Fetching Engine Metrics...
        </p>
      </div>
    );
  }

  // --- Error State (Project Style) ---
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 text-center bg-white border-2 border-slate-100 rounded-[3rem]">
        <div className="bg-rose-50 p-4 rounded-2xl mb-4 text-rose-500">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
          Engine Offline
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 max-w-xs">
          Could not establish connection to the recommendation service.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-8 bg-slate-900 text-white rounded-2xl px-10 font-black uppercase italic tracking-widest"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* --- Section 1: Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.3em]">
            <Activity size={16} className="animate-pulse" />
            <span>Optimization Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8]">
            AI Engine <br />
            <span className="text-transparent [-webkit-text-stroke:1px_#6366f1]">
              Control
            </span>
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
            <History size={12} />
            Last Global Sync:{" "}
            {metrics?.last_sync
              ? new Date(metrics.last_sync).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Quick System Badge */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-3xl">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Engine Status
            </span>
            <span className="text-sm font-black text-emerald-500 uppercase italic">
              Operational
            </span>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Activity size={20} />
          </div>
        </div>
      </div>

      {/* --- Section 2: Configuration Form --- */}
      {/* Note: RecommendationControlCenter uses our Phase 4 UI with ShadeCN & Toggles */}
      <RecommendationControlCenter />

      {/* --- Section 3: Performance Insights (Based on @Get('metrics')) --- */}
      {metrics?.top_categories && (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-slate-800 p-3 rounded-2xl text-indigo-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase italic tracking-tight">
                Top Category Affinity
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Highest performing segments in recommendations
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.top_categories.slice(0, 3).map((cat, idx) => (
              <div
                key={cat.categoryId}
                className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex justify-between items-center group hover:bg-slate-800 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex flex-col">
                  {/* Rank Badge */}
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-wider mb-1">
                    Rank #{idx + 1}
                  </p>

                  {/* Category Name - Ab ID ki jagah Name dikhayega */}
                  <p className="font-bold text-base text-slate-100 group-hover:text-white transition-colors">
                    {cat.categoryName}
                  </p>

                  {/* Sub-label for context */}
                  <p className="text-[9px] text-slate-500 font-medium uppercase mt-0.5">
                    Top Performer
                  </p>
                </div>

                <div className="text-right">
                  {/* Affinity Score with improved typography */}
                  <p className="text-sm font-black text-white italic tracking-tighter">
                    {Number(cat.totalScore).toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                    Affinity
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
