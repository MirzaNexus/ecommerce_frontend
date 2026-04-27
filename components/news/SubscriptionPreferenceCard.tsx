"use client";

import { useSubscriptionStatus } from "@/hooks/newsletter/useSubscriptionStatus";
import { useNewsletter } from "@/hooks/newsletter/useNewsletter";
import { useAuthStore } from "@/store/authStore";
import { Switch } from "@/components/ui/switch";

import { BellRing, BellOff, Loader2 } from "lucide-react";

export const SubscriptionPreferenceCard = () => {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = useSubscriptionStatus(user?.email || "");
  const { updateStatus, isUpdating } = useNewsletter();

  const isSubscribed = data?.data?.isSubscribed || false;

  const handleToggle = (checked: boolean) => {
    if (user?.email) {
      updateStatus({ email: user.email, status: checked });
    }
  };

  if (isLoading)
    return (
      <div className="h-24 w-full bg-slate-50 animate-pulse rounded-2xl" />
    );

  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-2xl ${isSubscribed ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"}`}
        >
          {isSubscribed ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <BellOff className="h-5 w-5" />
          )}
        </div>
        <div>
          <h4 className="font-black uppercase italic text-sm tracking-tight">
            Newsletter Alerts
          </h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            {isSubscribed ? "You are in the squad" : "You are missing out"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isUpdating && (
          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
        )}
        <Switch
          checked={isSubscribed}
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className="data-[state=checked]:bg-indigo-600"
        />
      </div>
    </div>
  );
};
