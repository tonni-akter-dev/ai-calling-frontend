"use client";

import {
  Bell,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="pl-12 lg:pl-0">
        <h2 className="text-lg font-bold text-slate-900">
          Super Admin
        </h2>

        <p className="hidden text-xs text-slate-500 sm:block">
          Manage subscriptions, users and platform activity
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Balance */}
        <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs sm:block">
          <span className="text-slate-500">
            Platform Balance:
          </span>

          <span className="ml-2 font-bold text-emerald-600">
            ৳ 1,250,000
          </span>
        </div>

        {/* Notification */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
          <Bell className="h-4 w-4" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        {/* Admin */}
        <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-800">
              Super Admin
            </p>

            <p className="text-[10px] text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}