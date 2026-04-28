"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { useOrder } from "@/hooks/order/useOrder";
import { OrderStatus } from "@/types/order.types";
import { CheckCircle2, Loader2 } from "lucide-react";

export const PaymentStatusPoller = ({ orderId }: { orderId: string }) => {
  const { useGetOrderDetails } = useOrder();
  const [isFinalized, setIsFinalized] = useState(false);

  const { data: order, refetch } = useGetOrderDetails(orderId);

  // Poll every 3 seconds ONLY if status is not PAID or FAILED yet
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (order && order.status === OrderStatus.AWAITING_PAYMENT) {
      interval = setInterval(() => {
        refetch();
      }, 3000);
    } else if (order?.status === OrderStatus.PAID) {
      setIsFinalized(true);
    }

    return () => clearInterval(interval);
  }, [order, refetch]);

  if (!order) return <Loader2 className="animate-spin" />;

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-card border rounded-2xl shadow-sm">
      {order.status === OrderStatus.PAID ? (
        <>
          <div className="bg-success/10 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Payment Received!</h1>
            <p className="text-muted text-sm">
              Order #{order.id.slice(0, 8)} is being processed.
            </p>
          </div>
        </>
      ) : (
        <>
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <div className="text-center">
            <h1 className="text-2xl font-bold">Verifying Payment...</h1>
            <p className="text-muted text-sm">
              Please do not close this window.
            </p>
          </div>
        </>
      )}
      <div className="w-full pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span>Current Status:</span>
          <StatusBadge status={order.status} />
        </div>
      </div>
    </div>
  );
};
