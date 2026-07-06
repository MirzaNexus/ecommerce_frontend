"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RecommendationSettingsSchema,
  RecommendationSettingsFormValues,
} from "@/validators/recomendation/settings.schema";
import {
  useUpdateRecommendationSettings,
  useTriggerAlgoliaSync,
} from "@/hooks/recomndation/useAdminRecommendation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Settings2,
  RefreshCw,
  Database,
  Zap,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/layout/Container";

export const RecommendationControlCenter = ({
  initialData,
}: {
  initialData?: any;
}) => {
  const { mutate: updateSettings, isPending: isUpdating } =
    useUpdateRecommendationSettings();
  const { mutate: triggerSync, isPending: isSyncing } = useTriggerAlgoliaSync();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecommendationSettingsFormValues>({
    resolver: zodResolver(RecommendationSettingsSchema) as any,
    defaultValues: initialData || {
      enabled: true,
      related_products_limit: 4,
      category_priority_enabled: true,
      price_similarity_factor: 0.5,
    },
  });

  const onSubmit = (data: RecommendationSettingsFormValues) => {
    updateSettings(data, {
      onSuccess: () => toast.success("Engine Configuration Updated"),
    });
  };

  const handleSync = () => {
    triggerSync(undefined, {
      onSuccess: (res) =>
        toast.success(`Synced ${res.total_processed} items to Algolia`),
    });
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
        {/* Left Column: Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <Settings2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tighter">
                  Engine Configuration
                </h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  Fine-tune recommendation logic
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Toggle: Master Switch */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <label className="text-sm font-black uppercase italic tracking-tight">
                    Service Status
                  </label>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Enable or disable the entire recommendation engine
                  </p>
                </div>
                <Switch
                  checked={watch("enabled")}
                  onCheckedChange={(val) => setValue("enabled", val)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Limit Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Products Limit
                  </label>
                  <div className="relative">
                    <Database className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      type="number"
                      {...register("related_products_limit", {
                        valueAsNumber: true,
                      })}
                      className="rounded-xl border-slate-200 h-12 pl-10 font-bold"
                    />
                  </div>
                  {errors.related_products_limit && (
                    <p className="text-red-500 text-[10px] font-bold uppercase italic">
                      {errors.related_products_limit.message}
                    </p>
                  )}
                </div>

                {/* Price Similarity Factor */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Price Similarity (0 - 1)
                  </label>
                  <div className="relative">
                    <BarChart3 className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      type="number"
                      step="0.1"
                      {...register("price_similarity_factor", {
                        valueAsNumber: true,
                      })}
                      className="rounded-xl border-slate-200 h-12 pl-10 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle: Category Priority */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <label className="text-sm font-black uppercase italic tracking-tight">
                    Category Priority
                  </label>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Prioritize products from the same category
                  </p>
                </div>
                <Switch
                  checked={watch("category_priority_enabled")}
                  onCheckedChange={(val) =>
                    setValue("category_priority_enabled", val)
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-black uppercase italic tracking-widest shadow-lg transition-all"
              >
                {isUpdating ? "Saving Changes..." : "Update Configuration"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Actions & Sync */}
        <div className="space-y-6">
          {/* Sync Card */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
            <Zap className="absolute -right-4 -top-4 h-32 w-32 text-indigo-500 opacity-20 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
                Algolia Sync
              </h3>
              <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-8 leading-relaxed">
                Manually trigger a full re-index to update search affinity
                scores.
              </p>
              <Button
                onClick={handleSync}
                disabled={isSyncing}
                // Added: flex, items-center, justify-center, and px-6
                className="w-full md:max-w-md h-12 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-black uppercase italic tracking-widest flex items-center justify-center px-6 border border-indigo-100 shadow-sm transition-all"
              >
                {isSyncing ? (
                  <RefreshCw className="animate-spin mr-3 h-5 w-5 shrink-0" />
                ) : (
                  <RefreshCw className="mr-3 h-5 w-5 shrink-0" />
                )}

                <span className="truncate">
                  {isSyncing ? "Syncing..." : "Trigger Re-index"}
                </span>
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                System Status
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Changes to the <strong>Price Similarity Factor</strong> will
              directly impact the "Affinity Score" calculated by Algolia
              Recommend. Use with caution.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
