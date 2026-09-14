/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
// "use client";

// import React, { useState } from "react";
// import { Eye, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

// interface CallRecord {
//   id: number;
//   apiVer: string;
//   phone: string;
//   createdDate: string;
//   createdRelative: string;
//   updatedDate: string;
//   updatedRelative: string;
//   status: "Failed" | "Success" | "Pending";
// }

// export default function CallsHistoryPage() {
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [entriesPerPage, setEntriesPerPage] = useState("1000");

//   // Mock data matching the portal layout structure
//   const mockCalls: CallRecord[] = [
//     {
//       id: 990,
//       apiVer: "apiV3",
//       phone: "01752606733",
//       createdDate: "2026-07-16 02:45:09",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:15:14",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 991,
//       apiVer: "apiV3",
//       phone: "01640940227",
//       createdDate: "2026-07-16 02:45:08",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:14:35",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 992,
//       apiVer: "apiV3",
//       phone: "01342148650",
//       createdDate: "2026-07-16 02:45:05",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:13:56",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 993,
//       apiVer: "apiV3",
//       phone: "01406058723",
//       createdDate: "2026-07-16 02:45:01",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:13:17",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 994,
//       apiVer: "apiV3",
//       phone: "01868320167",
//       createdDate: "2026-07-16 02:44:59",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:12:38",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 995,
//       apiVer: "apiV3",
//       phone: "01330601118",
//       createdDate: "2026-07-16 02:44:58",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:11:59",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 996,
//       apiVer: "apiV3",
//       phone: "01909319081",
//       createdDate: "2026-07-16 02:44:55",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:11:20",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 997,
//       apiVer: "apiV3",
//       phone: "01778149927",
//       createdDate: "2026-07-16 02:44:53",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 13:10:40",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 998,
//       apiVer: "apiV3",
//       phone: "01782250984",
//       createdDate: "2026-07-16 00:22:36",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 12:04:38",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 999,
//       apiVer: "apiV3",
//       phone: "01722634905",
//       createdDate: "2026-07-16 00:22:20",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 12:03:58",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//     {
//       id: 1000,
//       apiVer: "apiV3",
//       phone: "01733405597",
//       createdDate: "2026-07-16 00:21:48",
//       createdRelative: "4 weeks ago",
//       updatedDate: "2026-07-15 12:03:20",
//       updatedRelative: "4 weeks ago",
//       status: "Failed",
//     },
//   ];

//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedRows(mockCalls.map((item) => item.id));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSelectRow = (id: number) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-700 font-sans text-xs md:text-sm">
//       {/* Table Container */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           {/* Table Header */}
//           <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
//             <tr>
//               <th className="p-4 w-10 text-center">
//                 <input
//                   type="checkbox"
//                   onChange={handleSelectAll}
//                   checked={
//                     selectedRows.length === mockCalls.length &&
//                     mockCalls.length > 0
//                   }
//                   className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
//                 />
//               </th>
//               <th className="p-4">ID</th>
//               <th className="p-4">API Version</th>
//               <th className="p-4">Recipient</th>
//               <th className="p-4">Created Time</th>
//               <th className="p-4">Updated Time</th>
//               <th className="p-4 text-center">Status</th>
//               <th className="p-4 text-center">Action</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody className="divide-y divide-slate-100 font-normal">
//             {mockCalls.map((row) => {
//               const isSelected = selectedRows.includes(row.id);
//               return (
//                 <tr
//                   key={row.id}
//                   className={`hover:bg-slate-50/80 transition ${
//                     isSelected ? "bg-purple-50/30" : ""
//                   }`}
//                 >
//                   <td className="p-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={isSelected}
//                       onChange={() => handleSelectRow(row.id)}
//                       className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
//                     />
//                   </td>
//                   <td className="p-4 font-mono text-slate-600">{row.id}</td>
//                   <td className="p-4 font-medium text-slate-700">{row.apiVer}</td>
//                   <td className="p-4 font-mono font-medium text-slate-800">
//                     {row.phone}
//                   </td>
//                   <td className="p-4">
//                     <div className="font-mono text-slate-700">{row.createdDate}</div>
//                     <div className="text-[11px] text-slate-400 font-normal">
//                       {row.createdRelative}
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <div className="font-mono text-slate-700">{row.updatedDate}</div>
//                     <div className="text-[11px] text-slate-400 font-normal">
//                       {row.updatedRelative}
//                     </div>
//                   </td>
//                   <td className="p-4 text-center">
//                     <div className="inline-flex items-center space-x-1.5">
//                       <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
//                         {row.status}
//                       </span>
//                       <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
//                     </div>
//                   </td>
//                   <td className="p-4 text-center">
//                     <button className="inline-flex items-center space-x-1 border border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold px-3 py-1 rounded-md transition text-xs">
//                       <Eye className="w-3.5 h-3.5" />
//                       <span>View</span>
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Footer matching screenshot */}
//       <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Entries Selector */}
//         <div className="flex items-center space-x-2 text-slate-500 text-xs">
//           <span>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(e.target.value)}
//             className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-purple-500 font-medium text-slate-700"
//           >
//             <option value="10">10</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//             <option value="1000">1000</option>
//           </select>
//           <span>entries</span>
//         </div>

//         {/* Page Controls & Info */}
//         <div className="flex items-center space-x-4 text-xs">
//           <span className="text-slate-500">
//             Showing <strong className="text-slate-700">1</strong> to{" "}
//             <strong className="text-slate-700">1000</strong> of{" "}
//             <strong className="text-slate-700">2160</strong> results
//           </span>

//           <div className="flex items-center space-x-1">
//             <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:bg-slate-50 disabled:opacity-50">
//               <ChevronLeft className="w-4 h-4" />
//             </button>
//             <button className="w-8 h-8 rounded-md bg-purple-700 text-white font-bold flex items-center justify-center shadow-xs">
//               1
//             </button>
//             <button className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">
//               2
//             </button>
//             <button className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">
//               3
//             </button>
//             <button className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Play,
  Search,
  Filter,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { authHeaders } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface CallRow {
  id: number;
  campaign_id: number;
  campaign_name: string;
  phone: string;
  status: string;
  duration: number;
  external_call_id: string | null;
  recording_url: string | null;
  dtmf: string | null;
  created_at: string;
  updated_at: string;
}

export default function CallsHistoryPage() {
  const [rows, setRows] = useState<CallRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
      });
      if (statusFilter) params.set("status", statusFilter);
      if (mobileFilter.trim()) params.set("mobile", mobileFilter.trim());

      const res = await fetch(
        `${API_BASE}/campaigns/history?${params.toString()}`,
        {
          cache: "no-store",
          credentials: "include",
          headers: authHeaders(),
        }
      );

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      setRows(json.data || []);
      setTotal(json.total || 0);
      setTotalPages(json.total_pages || 1);
    } catch (err: any) {
      console.error("load error:", err.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [page, perPage, statusFilter, mobileFilter]);

  useEffect(() => {
    load();
    const id = setInterval(load, 10_000);
    return () => clearInterval(id);
  }, [load]);

  const statusBadge = (status: string) => {
    const s = status?.toLowerCase();
    const config: Record<
      string,
      { cls: string; icon: React.ReactNode; label: string }
    > = {
      completed: {
        cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
        label: "Completed",
      },
      answered: {
        cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 className="w-3 h-3" />,
        label: "Answered",
      },
      ringing: {
        cls: "bg-purple-50 text-purple-700 border-purple-200",
        icon: <Loader2 className="w-3 h-3 animate-spin" />,
        label: "Ringing",
      },
      queued: {
        cls: "bg-slate-100 text-slate-600 border-slate-200",
        icon: <Clock className="w-3 h-3" />,
        label: "Queued",
      },
      failed: {
        cls: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <XCircle className="w-3 h-3" />,
        label: "Failed",
      },
      busy: {
        cls: "bg-rose-50 text-rose-700 border-rose-200",
        icon: <XCircle className="w-3 h-3" />,
        label: "Busy",
      },
      "no-answer": {
        cls: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <AlertCircle className="w-3 h-3" />,
        label: "No Answer",
      },
    };
    const c = config[s] || {
      cls: "bg-slate-100 text-slate-600 border-slate-200",
      icon: <Clock className="w-3 h-3" />,
      label: status,
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${c.cls}`}
      >
        {c.icon}
        {c.label}
      </span>
    );
  };

  const formatTime = (s: string) => {
    if (!s) return "—";
    const d = new Date(s.replace(" ", "T"));
    return isNaN(d.getTime())
      ? s
      : d.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const formatDuration = (sec: number) => {
    if (!sec) return "00:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ═══════════════════════════════════════════
          FILTER BAR
      ═══════════════════════════════════════════ */}
      <div className="p-5 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Call History
              </h2>
              <p className="text-xs text-slate-500">
                {total} total call{total !== 1 ? "s" : ""} recorded
              </p>
            </div>
          </div>

          {/* Right: Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                value={mobileFilter}
                onChange={(e) => {
                  setMobileFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="Search phone..."
                className="h-9 w-56 pl-9 pr-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-9 pl-9 pr-8 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer appearance-none"
                style={{ color: "#1e293b" }}
              >
                <option value="" className="text-slate-900">
                  All Status
                </option>
                <option value="queued" className="text-slate-900">
                  Queued
                </option>
                <option value="ringing" className="text-slate-900">
                  Ringing
                </option>
                <option value="completed" className="text-slate-900">
                  Completed
                </option>
                <option value="failed" className="text-slate-900">
                  Failed
                </option>
                <option value="busy" className="text-slate-900">
                  Busy
                </option>
                <option value="no-answer" className="text-slate-900">
                  No Answer
                </option>
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={load}
              disabled={loading}
              className="h-9 px-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TABLE
      ═══════════════════════════════════════════ */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                ID
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Campaign
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Recipient
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Duration
              </th>
              <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Time
              </th>
              <th className="px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Recording
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="text-xs text-slate-500 font-medium">
                      Loading call records...
                    </span>
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center">
                  <div className="inline-flex flex-col items-center gap-4 max-w-sm">
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        No call records found
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Launch a campaign to see call history here
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #{row.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800 text-[13px]">
                      {row.campaign_name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {row.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {formatDuration(row.duration)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatTime(row.updated_at || row.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {statusBadge(row.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.recording_url ? (
                      <a
                        href={row.recording_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white text-[11px] font-bold transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Play
                      </a>
                    ) : row.status === "completed" ||
                      row.status === "answered" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Syncing
                      </span>
                    ) : (
                      <span className="text-slate-300 text-lg">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ═══════════════════════════════════════════
          PAGINATION
      ═══════════════════════════════════════════ */}
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-medium">Show</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="h-8 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
            style={{ color: "#1e293b" }}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
          <span className="font-medium">entries</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">
            Page <strong className="text-slate-800">{page}</strong> of{" "}
            <strong className="text-slate-800">{totalPages}</strong> —{" "}
            <strong className="text-slate-800">{total}</strong> results
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="min-w-[32px] h-8 px-3 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              {page}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}