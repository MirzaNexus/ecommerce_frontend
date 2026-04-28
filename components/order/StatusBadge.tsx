"use client";

import React from "react";
import { OrderStatus } from "@/types/order.types";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  // ✅ Mapping colors and labels to match your backend enum
  const config: Record<
    OrderStatus,
    { container: string; dot: string; label: string }
  > = {
    [OrderStatus.CREATED]: {
      container: "bg-blue-50 text-blue-700 border-blue-100",
      dot: "bg-blue-500",
      label: "Created",
    },
    [OrderStatus.AWAITING_PAYMENT]: {
      container: "bg-amber-50 text-amber-700 border-amber-100",
      dot: "bg-amber-500",
      label: "Awaiting Payment",
    },
    [OrderStatus.PAID]: {
      container: "bg-emerald-50 text-emerald-700 border-emerald-100",
      dot: "bg-emerald-500",
      label: "Paid",
    },
    [OrderStatus.FAILED]: {
      container: "bg-rose-50 text-rose-700 border-rose-100",
      dot: "bg-rose-500",
      label: "Failed",
    },
    [OrderStatus.CANCELLED]: {
      container: "bg-slate-50 text-slate-500 border-slate-100",
      dot: "bg-slate-400",
      label: "Cancelled",
    },
  };

  const current = config[status] || config[OrderStatus.CREATED];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300 ${current.container}`}
    >
      {/* Dynamic Status Dot */}
      <span
        className={`h-1.5 w-1.5 rounded-full animate-pulse ${current.dot}`}
      />

      {/* Label Styling - Aligned with your Dashboard font style */}
      <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">
        {current.label}
      </span>
    </div>
  );
};
