"use client";

import { OrderTable } from "@/components/order/OrderTable";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">Order Management</h1>
        <p className="text-sm text-slate-400">
          View and manage all customer orders.
        </p>
      </div>

      {/* Ab koi error nahi aayega kyunke hum orders={} pass nahi kar rahe */}
      <OrderTable />
    </div>
  );
}
