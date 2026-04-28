"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/hooks/order/useOrder";
import { OrderItemCard } from "@/components/order/OrderItemCard";
import { StatusBadge } from "@/components/order/StatusBadge";
import {
  Clock,
  MapPin,
  CreditCard,
  Loader2,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function BuyerTrackingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { useGetOrderDetails } = useOrder();
  const { data: order, isLoading } = useGetOrderDetails(id as string);

  if (isLoading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
          Fetching your order...
        </p>
      </div>
    );

  if (!order) return null;

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🔙 Back to Orders Navigation */}
      <button
        onClick={() => router.push("/orders")}
        className="group flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all font-bold text-xs uppercase tracking-widest"
      >
        <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors">
          <ChevronLeft size={16} />
        </div>
        Back to My Orders
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Order Details
            </h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Reference:{" "}
            <span className="text-slate-900">#{order?.id?.toUpperCase()}</span>
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            Order Placed
          </p>
          <p className="text-slate-900 font-black">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <Clock size={16} />
                </div>
                Order Items
              </h3>
              <span className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs font-black text-slate-500">
                {order.items.length} Items
              </span>
            </div>

            <div className="p-8 space-y-6">
              {order.items.map((item: any) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment */}
        <div className="space-y-8">
          {/* Shipping Address Snapshot */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MapPin size={80} />
            </div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 mb-8 flex items-center gap-2">
              <MapPin size={14} /> Shipping Destination
            </h3>

            <div className="relative z-10 space-y-4">
              <div>
                <p className="text-2xl font-black tracking-tight italic">
                  {order.addressSnapshot.fullName}
                </p>
                <div className="h-1 w-8 bg-indigo-500 mt-2 rounded-full" />
              </div>

              <div className="space-y-1">
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {order.addressSnapshot.line1}
                </p>
                <p className="text-slate-400 text-sm font-bold">
                  {order.addressSnapshot.city}, {order.addressSnapshot.country}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center gap-3 text-xs font-black text-indigo-400 uppercase tracking-widest">
                <span className="p-1.5 bg-slate-800 rounded-lg">📞</span>
                {order.addressSnapshot.phone}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-8 flex items-center gap-2">
              <CreditCard size={14} /> Payment Overview
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest">
                  Subtotal
                </span>
                <span className="text-slate-900 font-black">
                  ${(order.totalAmount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest">
                  Shipping
                </span>
                <span className="text-emerald-500 font-black italic underline decoration-2 underline-offset-4">
                  FREE
                </span>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
                    Grand Total
                  </p>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    ${(order.totalAmount / 100).toFixed(2)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <CreditCard className="text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
