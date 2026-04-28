"use client";

import { XCircle, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-destructive/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <XCircle className="h-12 w-12 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-heading">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong while processing your payment. Don't worry, no
            money was deducted.
          </p>
        </div>

        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 flex items-start gap-4 text-left">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold text-destructive">Possible reasons:</p>
            <ul className="list-disc list-inside mt-1 text-muted-foreground">
              <li>Insufficient funds</li>
              <li>Transaction declined by bank</li>
              <li>Session expired</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="h-12 rounded-full font-bold">
            <Link href="/checkout">
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
            </Link>
          </Button>
          <Button asChild variant="ghost" className="h-12 rounded-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
