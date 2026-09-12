"use client";

import { useState } from "react";
import {
  Megaphone,
  X,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  Headphones,
  PhoneCall,
  TrendingUp,
  PhoneOff,
  UserCheck,
  UserX,
  Users,
  UserMinus,
  Activity,
} from "lucide-react";

export default function DashboardOverviewPage() {

  const topStats = [
    {
      title: "Total Voice Call Sent",
      value: "2,133",
      icon: MessageSquare,
      bg: "bg-linear-to-r from-blue-500 to-primary",
      textColor: "text-white",
    },
    {
      title: "Total Success Voice Call",
      value: "559",
      icon: CheckCircle2,
      bg: "bg-linear-to-r from-emerald-500 to-emerald-600",
      textColor: "text-white",
    },
    {
      title: "Total Processing Voice Call",
      value: "62",
      icon: Clock,
      bg: "bg-linear-to-r from-cyan-500 to-teal-500",
      textColor: "text-white",
    },
    {
      title: "Total Failed Voice Call",
      value: "1,512",
      icon: XCircle,
      bg: "bg-linear-to-r from-indigo-900 to-slate-900",
      textColor: "text-white",
    },
  ];

  const middleStats = [
    {
      title: "Active Calls (Live)",
      value: "0",
      icon: Headphones,
      bgColor: "bg-blue-50/70",
      borderColor: "border-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Success Voice Calls (today)",
      value: "0",
      icon: PhoneCall,
      bgColor: "bg-emerald-50/70",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Success Rate (today)",
      value: "0%",
      icon: TrendingUp,
      bgColor: "bg-cyan-50/70",
      borderColor: "border-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Failed Voice Calls (today)",
      value: "0",
      icon: PhoneOff,
      bgColor: "bg-purple-50/70",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const bottomStats = [
    {
      title: "Total Contact",
      value: "1",
      icon: UserCheck,
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-500",
    },
    {
      title: "Total Banned Contact",
      value: "0",
      icon: UserX,
      iconBg: "bg-rose-50 border-rose-200 text-rose-500",
    },
    {
      title: "Total Group",
      value: "0",
      icon: Users,
      iconBg: "bg-sky-50 border-sky-200 text-sky-500",
    },
    {
      title: "Total Banned Group",
      value: "0",
      icon: UserMinus,
      iconBg: "bg-amber-50 border-amber-200 text-amber-500",
    },
  ];

  return (
    <div className="space-y-5 mx-auto bg-slate-100/60 min-h-screen p-4 md:p-6 text-slate-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`${stat.bg} ${stat.textColor} p-5 rounded-2xl shadow-sm flex items-center justify-between relative overflow-hidden`}
            >
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs font-medium opacity-90 mt-1">
                  {stat.title}
                </p>
                <button className="text-[10px] opacity-75 hover:opacity-100 underline mt-2 inline-block font-semibold">
                  View All
                </button>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Icon className="w-7 h-7" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Soft Colored Middle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {middleStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`${stat.bgColor} border ${stat.borderColor} p-5 rounded-2xl flex items-center justify-between shadow-xs`}
            >
              <div>
                <p className="text-xs text-slate-500 font-semibold mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-black text-slate-900">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.iconColor}`}>
                <Icon className="w-7 h-7" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 3: Light Outlined Cards with View All Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bottomStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 p-4 rounded-2xl shadow-xs relative flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl border ${stat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-none">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {stat.title}
                  </p>
                </div>
              </div>

              <button className="text-[10px] font-bold text-slate-400 hover:text-primary border border-slate-200 hover:border-blue-200 px-2 py-0.5 rounded-md transition self-start">
                View All
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Calls Live Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <h3 className="text-base font-bold text-slate-900 tracking-wide">
              Active Calls
            </h3>
            <span className="bg-primary text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              0
            </span>
            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live</span>
            </span>
          </div>

          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition shadow-2xs">
            View All
          </button>
        </div>

        {/* Live Calls Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-6">CAMPAIGN ID</th>
                <th className="py-3.5 px-6">PHONE NUMBER</th>
                <th className="py-3.5 px-6">STATUS</th>
                <th className="py-3.5 px-6">DURATION</th>
                <th className="py-3.5 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Empty state when active calls are 0 */}
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">
                      No active calls right now.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}