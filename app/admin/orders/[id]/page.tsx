"use client";

import { useParams } from "next/navigation";

import { useAdminOrder } from "@/hooks/order/useAdminOrder";
import { OrderStatus } from "@/types/order.types";
import { StatusBadge } from "@/components/order/StatusBadge";
import { OrderItemCard } from "@/components/order/OrderItemCard";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Package,
} from "lucide-react";
import Link from "next/link";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const { useGetAdminOrderDetails, updateStatus, isUpdating } = useAdminOrder();
  const { data: order, isLoading } = useGetAdminOrderDetails(id as string);

  if (isLoading || !order)
    return <Loader2 className="m-20 animate-spin mx-auto text-indigo-600" />;

  const handleUpdate = (newStatus: OrderStatus) => {
    updateStatus({ id: order.id, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/orders"
        className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={14} /> Back to List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900">
                Items in Order
              </h2>
              <StatusBadge status={order.status} />
            </div>
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                Order Actions
              </h3>
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </div>

            <div className="space-y-3">
              {/* 1. Logic for CREATED State */}
              {order.status === OrderStatus.CREATED && (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => handleUpdate(OrderStatus.AWAITING_PAYMENT)}
                    disabled={isUpdating}
                    className="w-full justify-start gap-3 h-14 rounded-[1.2rem] bg-amber-500 hover:bg-amber-600 text-white border-0 shadow-lg shadow-amber-900/20 px-4 transition-all active:scale-95"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Clock size={18} />
                    )}
                    <span className="truncate font-bold text-sm">
                      Awaiting Payment
                    </span>
                  </Button>

                  <Button
                    onClick={() => handleUpdate(OrderStatus.CANCELLED)}
                    disabled={isUpdating}
                    className="w-full justify-start gap-3 h-14 rounded-[1.2rem] bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 border border-slate-800 px-4 transition-all"
                  >
                    <XCircle size={18} />
                    <span className="truncate font-bold text-sm">
                      Cancel Order
                    </span>
                  </Button>
                </div>
              )}

              {/* 2. Logic for AWAITING_PAYMENT State */}
              {order.status === OrderStatus.AWAITING_PAYMENT && (
                <div className="space-y-3">
                  <Button
                    onClick={() => handleUpdate(OrderStatus.PAID)}
                    disabled={isUpdating}
                    className="w-full justify-start gap-3 h-14 rounded-[1.2rem] bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg shadow-emerald-900/20 px-4 transition-all"
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                    <span className="truncate font-bold text-sm">
                      Confirm Payment
                    </span>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleUpdate(OrderStatus.FAILED)}
                      disabled={isUpdating}
                      className="justify-center gap-2 h-12 rounded-[1rem] bg-white/5 hover:bg-white/10 text-slate-300 border border-slate-800 font-bold text-[11px] uppercase tracking-wider"
                    >
                      <AlertCircle size={14} /> Failed
                    </Button>
                    <Button
                      onClick={() => handleUpdate(OrderStatus.CANCELLED)}
                      disabled={isUpdating}
                      className="justify-center gap-2 h-12 rounded-[1rem] bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 font-bold text-[11px] uppercase tracking-wider"
                    >
                      <XCircle size={14} /> Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* 3. Logic for PAID State */}
              {order.status === OrderStatus.PAID && (
                <Button
                  onClick={() => handleUpdate(OrderStatus.CANCELLED)}
                  disabled={isUpdating}
                  className="w-full justify-start gap-3 h-14 rounded-[1.2rem] bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 px-4 transition-all font-bold group"
                >
                  <XCircle
                    size={18}
                    className="group-hover:rotate-90 transition-transform"
                  />
                  <span className="truncate">Cancel & Issue Refund</span>
                </Button>
              )}

              {/* 4. Finalized States */}
              {(order.status === OrderStatus.CANCELLED ||
                order.status === OrderStatus.FAILED) && (
                <div className="p-8 border border-slate-800 bg-slate-950/50 rounded-[1.5rem] text-center border-dashed">
                  <div className="inline-flex p-3 bg-slate-900 rounded-full mb-3 text-slate-600">
                    <Package size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                    Order is {order.status}
                    <br />
                    No Actions Available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
