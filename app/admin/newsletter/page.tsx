"use client";

import { AdminBroadcastCenter } from "@/components/news/AdminBroadcastCenter";
import { Megaphone, Users, Zap } from "lucide-react";

export default function AdminNewsletterPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">
          Marketing Hub
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Engage your squad with real-time push notifications and updates.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Active Subscribers",
            value: "1,284",
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "Campaigns Sent",
            value: "42",
            icon: Megaphone,
            color: "text-indigo-600",
          },
          {
            label: "Avg. Click Rate",
            value: "18.4%",
            icon: Zap,
            color: "text-amber-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Broadcast Form */}
      <div className="max-w-3xl">
        <AdminBroadcastCenter />
      </div>
    </div>
  );
}
