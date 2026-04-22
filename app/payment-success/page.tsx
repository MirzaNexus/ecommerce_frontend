"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  // URL se seedha orderId nikal lein
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-700">
      <div className="bg-emerald-100 p-6 rounded-[2rem] mb-6 shadow-sm shadow-emerald-100">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
      </div>

      <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
        Order Confirmed!
      </h1>
      <p className="text-slate-400 font-bold mb-10 max-w-sm uppercase tracking-widest text-[10px]">
        Thank you for your purchase. Your payment was successful.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {/* Tracking Link ab dynamic hai */}
        <Button
          asChild
          className="h-14 rounded-3xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 text-sm uppercase tracking-widest"
        >
          <Link href={orderId ? `/orders/${orderId}` : "/orders"}>
            Track My Order <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="h-12 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
