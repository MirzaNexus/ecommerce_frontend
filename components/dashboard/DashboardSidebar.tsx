"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

type Item = {
  name: string;
  href: string;
};

// Map names to icons for better visual cues
const iconMap: Record<string, any> = {
  Dashboard: LayoutDashboard,
  Products: Package,
  Categories: Layers,
  Users: Users,
  Settings: Settings,
};

export default function DashboardSidebar({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState("Panel");

  useEffect(() => {
    const role = Cookies.get("role");
    setUserRole(role || "User");
  }, []);

  return (
    <>
      {/* --- Mobile View (Horizontal Scroll Tabs) --- */}
      <div className="md:hidden flex gap-3 overflow-x-auto pb-4 px-4 no-scrollbar">
        {items.map((item) => {
          const Icon = iconMap[item.name] || LayoutDashboard;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-slate-500 border border-slate-100"
              }`}
            >
              <Icon size={14} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex flex-col w-72 h-[calc(100vh-2rem)] sticky top-4 bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm shadow-slate-100">
        {/* Header: Role & Logo */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-100">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                {userRole}
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
                Control Hub
              </h2>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5">
          {items.map((item) => {
            const Icon = iconMap[item.name] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-600"} transition-colors`}
                  />
                  <span
                    className={`text-sm font-bold tracking-tight ${isActive ? "text-white" : "text-slate-600"}`}
                  >
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <ChevronRight size={14} className="text-indigo-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer: Log Out / Help */}
        <div className="mt-auto pt-6 border-t border-slate-50">
          <button
            onClick={() => {
              /* Logout logic */
            }}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-rose-500 font-bold text-sm hover:bg-rose-50 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
