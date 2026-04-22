"use client";

import { OrderStatus } from "@/types/order.types";

interface OrderFiltersProps {
  currentStatus?: OrderStatus;
  onStatusChange: (status?: OrderStatus) => void;
}

export const OrderFilters = ({
  currentStatus,
  onStatusChange,
}: OrderFiltersProps) => {
  // All statuses including an 'undefined' for "All Orders"
  const statuses = [undefined, ...Object.values(OrderStatus)];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-2">
      {statuses.map((status) => {
        const isActive = currentStatus === status;

        return (
          <button
            key={status || "all"}
            onClick={() => onStatusChange(status)}
            className={`
              px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105"
                  : "bg-white text-slate-500 border border-slate-100 hover:border-indigo-200 hover:text-slate-900"
              }
            `}
          >
            {status ? status.replace("_", " ") : "Show All"}
          </button>
        );
      })}
    </div>
  );
};
