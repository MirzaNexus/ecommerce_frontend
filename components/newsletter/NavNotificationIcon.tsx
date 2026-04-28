"use client";

import { Bell, BellRing, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/store/notificationStore";
import { useSubscriptionStatus } from "@/hooks/newsletter/useSubscriptionStatus";
import { useNewsletter } from "@/hooks/newsletter/useNewsletter";
import { useAuthStore } from "@/store/authStore";
import { useFcmToken } from "@/hooks/newsletter/useFcmToken";

export const NavNotificationIcon = () => {
  const user = useAuthStore((s) => s.user);
  const { fcmToken } = useFcmToken();
  const { hasNewNotification, markAsRead } = useNotificationStore();

  const { data, isLoading } = useSubscriptionStatus(user?.email || "");
  const { updateStatus, isUpdating, subscribe } = useNewsletter();

  const isSubscribed = data?.data?.isSubscribed || false;

  const handleToggleSubscription = () => {
    if (!user?.email) return;
    if (isSubscribed) {
      updateStatus({ email: user.email, status: false });
    } else {
      subscribe({ email: user.email, fcmToken: fcmToken || undefined });
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && markAsRead()}>
      <DropdownMenuTrigger className="relative outline-none p-2 hover:bg-slate-100 rounded-xl transition-all group">
        {isSubscribed ? (
          <BellRing className="h-5 w-5 text-indigo-600 animate-pulse" />
        ) : (
          <Bell className="h-5 w-5 text-slate-600 group-hover:text-slate-900" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl p-2 shadow-xl border-slate-100"
      >
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleToggleSubscription}
          disabled={isUpdating || isLoading}
          className="flex items-center justify-between py-3 cursor-pointer rounded-xl focus:bg-indigo-50"
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">
              {isSubscribed ? "Subscribed" : "Get Notifications"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isSubscribed ? "You're in the squad" : "Don't miss the drops"}
            </span>
          </div>

          {isUpdating || isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
          ) : isSubscribed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-slate-300" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
