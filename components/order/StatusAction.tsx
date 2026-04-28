"use client";

import React from "react";
import { OrderStatus } from "@/types/order.types";
import { useAdminOrder } from "@/hooks/order/useAdminOrder";
import { Loader2, ChevronDown, Lock } from "lucide-react";

interface StatusActionProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export const StatusAction: React.FC<StatusActionProps> = ({
  orderId,
  currentStatus,
}) => {
  const { updateStatus, isUpdating } = useAdminOrder();

  // ✅ Backend Logic: Aligned exactly with validateStateTransition
  const getAvailableTransitions = (status: OrderStatus): OrderStatus[] => {
    const allowed: Record<string, OrderStatus[]> = {
      [OrderStatus.CREATED]: [
        OrderStatus.AWAITING_PAYMENT,
        OrderStatus.CANCELLED,
      ],
      [OrderStatus.AWAITING_PAYMENT]: [
        OrderStatus.PAID,
        OrderStatus.FAILED,
        OrderStatus.CANCELLED,
      ],
      [OrderStatus.PAID]: [OrderStatus.CANCELLED],
      [OrderStatus.FAILED]: [], // No transitions allowed from FAILED
      [OrderStatus.CANCELLED]: [], // No transitions allowed from CANCELLED
    };

    return allowed[status] || [];
  };

  const transitions = getAvailableTransitions(currentStatus);

  // ✅ Finalized State UI: If order is Cancelled or Failed, show a locked status
  if (transitions.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl">
        <Lock size={10} className="text-slate-300" />
        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
          Locked
        </span>
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      {/* Loading Spinner Overload */}
      {isUpdating && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
        </div>
      )}

      <div className="relative">
        <select
          disabled={isUpdating}
          className="appearance-none pl-4 pr-10 py-2 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-indigo-500/10"
          onChange={(e) =>
            updateStatus({ id: orderId, status: e.target.value as OrderStatus })
          }
          value="" // Always resets to "Update" label after selection
        >
          <option value="" disabled className="text-slate-400">
            Action
          </option>
          {transitions.map((s) => (
            <option
              key={s}
              value={s}
              className="bg-white text-slate-900 font-bold py-2"
            >
              {s.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* Premium Styled Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-600 transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
