"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminOrder } from "@/hooks/order/useAdminOrder";
import { StatusAction } from "./StatusAction";
import { StatusBadge } from "./StatusBadge";
import { OrderStatus, PaginatedOrders } from "@/types/order.types";
import { Package, ArrowLeft, ArrowRight } from "lucide-react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const OrderTable = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(
    undefined,
  );

  const { useGetAdminOrders } = useAdminOrder();

  // Typecasting the response to your PaginatedOrders interface
  const { data: response, isLoading } = useGetAdminOrders({
    page,
    limit: 10,
    status: statusFilter,
  }) as { data: PaginatedOrders | undefined; isLoading: boolean };

  const availableStatuses = Object.values(OrderStatus);

  if (isLoading) return <LoadingSkeleton />;

  // ✅ Mapping fix: Using 'data' instead of 'items' as per your interface
  const orders = response?.data || [];
  const meta = response?.meta;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* 1. Synced Filters Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar shadow-inner">
          <button
            onClick={() => {
              setStatusFilter(undefined);
              setPage(1);
            }}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${!statusFilter ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            All Orders
          </button>
          {availableStatuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${statusFilter === status ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Premium Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Reference
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Customer
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Amount
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-indigo-50/20 transition-all cursor-pointer group relative"
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-indigo-100 transition-all duration-300">
                          <Package className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm tracking-tight italic uppercase">
                            #{order.id.slice(-8)}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-700">
                          {order.user?.firstName} {order.user?.lastName || ""}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold lowercase tracking-normal leading-tight">
                          {order.user?.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-black text-slate-900 tracking-tighter">
                        {/* totalAmount directly from Order interface */}$
                        {(order.totalAmount / 100).toFixed(2)}
                      </p>
                    </td>
                    <td className="p-6" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge status={order.status} />
                    </td>
                    <td
                      className="p-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StatusAction
                        orderId={order.id}
                        currentStatus={order.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                        <Package className="w-8 h-8 text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        No orders found in this category
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Paginated Controls (Using 'meta' from PaginatedOrders) */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Page <span className="text-slate-900">{meta.page}</span> of{" "}
            {meta.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 shadow-sm"
            >
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <button
              disabled={page >= meta.totalPages}
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-20 transition-all active:scale-90 shadow-sm"
            >
              <ArrowRight size={16} className="text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
