"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrder } from "@/hooks/order/useOrder";
import {
  ShoppingBag,
  ChevronRight,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function BuyerOrdersPage() {
  const [page, setPage] = useState(1);
  const limit = 8; // Per page items

  const { useGetUserOrders } = useOrder();

  // Destructuring for cleaner access
  const { data: ordersData, isLoading } = useGetUserOrders(page, limit);

  // Status badges configuration - Aligned with project theme
  const getStatusStyles = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "paid" || s === "delivered")
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (s === "cancelled" || s === "failed")
      return "bg-rose-50 text-rose-600 border-rose-100";
    return "bg-amber-50 text-amber-600 border-amber-100";
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-lg mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-slate-100 rounded-[2rem] mb-4" />
        ))}
      </div>
    );
  }

  // ✅ Extracting array and meta safely from the response object
  const orders = ordersData?.items || [];
  const meta = ordersData?.meta;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 min-h-screen animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
            My Orders
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2">
            Track your shipments and view your purchase history.
          </p>
        </div>
        <div className="px-4 py-2 bg-slate-900 rounded-xl shadow-lg shadow-slate-200">
          <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
            Total: {meta?.totalItems || 0} Orders
          </span>
        </div>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="group block bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 active:scale-[0.98]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <Package className="w-7 h-7 text-slate-300 group-hover:text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase border transition-colors ${getStatusStyles(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                      {order.firstItemName || "Order Summary"}
                      {order.itemCount > 1 && (
                        <span className="text-indigo-400 font-bold ml-2 text-sm italic">
                          + {order.itemCount - 1} more
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">
                      Purchased on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:gap-10 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
                      Total Amount
                    </p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">
                      ${(order.totalAmount / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Pagination Section */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-slate-100">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-20 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all active:scale-90 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                <span className="text-sm font-black text-slate-900">
                  {page}
                </span>
                <span className="mx-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  of
                </span>
                <span className="text-sm font-black text-slate-400">
                  {meta.totalPages}
                </span>
              </div>

              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-20 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all active:scale-90 shadow-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] rotate-6 animate-pulse" />
            <div className="relative bg-white w-full h-full rounded-[2rem] shadow-xl border border-indigo-50 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-indigo-500" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Your wardrobe is empty
          </h2>
          <p className="text-slate-400 text-sm mt-3 max-w-xs mx-auto font-medium">
            Looks like you haven't discovered our collection yet. Time to start
            your shopping journey!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95"
          >
            Explore Collection
          </Link>
        </div>
      )}
    </div>
  );
}
