/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
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
  Loader2,
  RefreshCw,
} from "lucide-react";
import { authHeaders } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface DashboardData {
  overview: {
    totalVoiceCallSent: number;
    totalSuccessVoiceCall: number;
    totalProcessingVoiceCall: number;
    totalFailedVoiceCall: number;
  };
  today: {
    activeCallsLive: number;
    successVoiceCallsToday: number;
    successRateToday: string;
    failedVoiceCallsToday: number;
  };
  directory: {
    totalContact: number;
    totalBannedContact: number;
    totalGroup: number;
    totalBannedGroup: number;
  };
  activeCalls: Array<{
    id: number;
    campaignId: number;
    phoneNumber: string;
    status: string;
    duration: number;
  }>;
}

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ============================================
  // Fetch
  // ============================================
  const fetchMetrics = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);

    try {
      const res = await fetch(`${API_BASE}/dashboard/metrics`, {
        cache: "no-store",
        credentials: "include",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
        setLastUpdated(new Date());
      } else {
        console.error("Dashboard error:", json.message);
      }
    } catch (err: any) {
      console.error("Dashboard fetch error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ============================================
  // Initial + Polling (10s)
  // ============================================
  useEffect(() => {
    fetchMetrics();
    const id = setInterval(() => fetchMetrics(), 10000);
    return () => clearInterval(id);
  }, [fetchMetrics]);

  // Fallback values
  const overview = data?.overview || {
    totalVoiceCallSent: 0,
    totalSuccessVoiceCall: 0,
    totalProcessingVoiceCall: 0,
    totalFailedVoiceCall: 0,
  };
  const today = data?.today || {
    activeCallsLive: 0,
    successVoiceCallsToday: 0,
    successRateToday: "0%",
    failedVoiceCallsToday: 0,
  };
  const directory = data?.directory || {
    totalContact: 0,
    totalBannedContact: 0,
    totalGroup: 0,
    totalBannedGroup: 0,
  };
  const activeCalls = data?.activeCalls || [];

  // Card configs
  const topStats = [
    {
      title: "Total Voice Call Sent",
      value: overview.totalVoiceCallSent.toLocaleString(),
      icon: MessageSquare,
      bg: "bg-linear-to-r from-blue-500 to-primary",
    },
    {
      title: "Total Success Voice Call",
      value: overview.totalSuccessVoiceCall.toLocaleString(),
      icon: CheckCircle2,
      bg: "bg-linear-to-r from-emerald-500 to-emerald-600",
    },
    {
      title: "Total Processing Voice Call",
      value: overview.totalProcessingVoiceCall.toLocaleString(),
      icon: Clock,
      bg: "bg-linear-to-r from-cyan-500 to-teal-500",
    },
    {
      title: "Total Failed Voice Call",
      value: overview.totalFailedVoiceCall.toLocaleString(),
      icon: XCircle,
      bg: "bg-linear-to-r from-indigo-900 to-slate-900",
    },
  ];

  const middleStats = [
    {
      title: "Active Calls (Live)",
      value: String(today.activeCallsLive),
      icon: Headphones,
      bgColor: "bg-blue-50/70",
      borderColor: "border-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Success Voice Calls (today)",
      value: String(today.successVoiceCallsToday),
      icon: PhoneCall,
      bgColor: "bg-emerald-50/70",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Success Rate (today)",
      value: today.successRateToday,
      icon: TrendingUp,
      bgColor: "bg-cyan-50/70",
      borderColor: "border-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Failed Voice Calls (today)",
      value: String(today.failedVoiceCallsToday),
      icon: PhoneOff,
      bgColor: "bg-purple-50/70",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const bottomStats = [
    {
      title: "Total Contact",
      value: String(directory.totalContact),
      icon: UserCheck,
      iconBg: "bg-emerald-50 border-emerald-200 text-emerald-500",
    },
    {
      title: "Total Banned Contact",
      value: String(directory.totalBannedContact),
      icon: UserX,
      iconBg: "bg-rose-50 border-rose-200 text-rose-500",
    },
    {
      title: "Total Group",
      value: String(directory.totalGroup),
      icon: Users,
      iconBg: "bg-sky-50 border-sky-200 text-sky-500",
    },
    {
      title: "Total Banned Group",
      value: String(directory.totalBannedGroup),
      icon: UserMinus,
      iconBg: "bg-amber-50 border-amber-200 text-amber-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-5 mx-auto min-h-screen p-4 md:p-6 text-slate-800">
      {/* Live header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold">
              Live · {lastUpdated?.toLocaleTimeString() || "..."}
            </span>
          </div>
          <button
            onClick={() => fetchMetrics(true)}
            disabled={refreshing}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
            title="Refresh"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-slate-500 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`${stat.bg} text-white p-5 rounded-2xl shadow-sm flex items-center justify-between relative overflow-hidden`}
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

      {/* Row 2 */}
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

      {/* Row 3 */}
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

      {/* Active Calls Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <h3 className="text-base font-bold text-slate-900 tracking-wide">
              Active Calls
            </h3>
            <span className="bg-primary text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
              {activeCalls.length}
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
              {activeCalls.length === 0 ? (
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
              ) : (
                activeCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-6 font-mono text-slate-700">
                      #{call.campaignId}
                    </td>
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                      {call.phoneNumber}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200 uppercase">
                        {call.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      {call.duration || 0}s
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button className="text-xs text-primary hover:underline font-semibold">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}