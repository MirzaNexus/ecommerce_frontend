"use client";

import { useSearchParams, useRouter } from "next/navigation";
import UserTable from "@/components/user/admin/UserTable";
import UserDetailCard from "@/components/user/admin/UserDetailCard";
import {
  Users,
  ChevronLeft,
  UserCircle2,
  ShieldCheck,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL se userId utha rahy hain
  const selectedUserId = searchParams.get("userId");

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("userId");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* --- Dynamic Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">
            {selectedUserId ? (
              <UserCircle2 size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
            <span>
              {selectedUserId ? "Account Investigation" : "Access Control"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {selectedUserId ? "User Profile" : "User Directory"}
          </h1>

          <p className="text-slate-500 font-medium max-w-md leading-relaxed">
            {selectedUserId
              ? "Deep dive into user activities, permissions, and account history."
              : "Manage system access, roles, and monitor user engagement."}
          </p>
        </div>

        {/* Quick Actions for List View */}
        {/* {!selectedUserId && (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-4 py-2 border border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="bg-transparent border-none focus:ring-0 text-sm font-medium ml-2 text-slate-600 w-48"
              />
            </div>
          </div>
        )} */}
      </div>

      {/* --- Main Content Logic --- */}
      {!selectedUserId ? (
        /* --- USER LIST VIEW --- */
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-400">
              <Users size={18} />
            </div>
            <span className="text-sm font-black text-slate-700 uppercase tracking-widest">
              Active Accounts
            </span>
          </div>

          <div className="p-2">
            <UserTable />
          </div>
        </div>
      ) : (
        /* --- USER DETAIL VIEW --- */
        <div className="space-y-6">
          {/* Back Button with Hover Animation */}
          <Button
            onClick={handleBack}
            variant="ghost"
            className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl px-4 py-6 transition-all"
          >
            <div className="p-2 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white rounded-xl transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold tracking-tight">
              Return to Directory
            </span>
          </Button>

          <div className="animate-in slide-in-from-right-4 duration-700 ease-out">
            <UserDetailCard userId={selectedUserId} />
          </div>
        </div>
      )}

      {/* Footer Branding (Optional) */}
      <div className="pt-10 flex items-center justify-center opacity-20">
        <div className="h-px w-12 bg-slate-400" />
        <span className="mx-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          System Secure
        </span>
        <div className="h-px w-12 bg-slate-400" />
      </div>
    </div>
  );
}
