/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Phone,
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  ChevronLeft,
  ChevronRight,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { authHeaders } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface CallLog {
  id: number;
  call_type: "in" | "out";
  caller: string;
  ipnumber: string;
  agent: string;
  duration: number;
  status: string;
  call_time: string;
  recording: string | null;
}

function secondsToDuration(sec: number) {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}m ${String(r).padStart(2, "0")}s`;
}

export default function AllCallLogsPage() {
  const [mobileSearch, setMobileSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [callTypeFilter, setCallTypeFilter] = useState<"" | "in" | "out">("");

  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [logs, setLogs] = useState<CallLog[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (resetPage = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(resetPage ? 1 : currentPage));
        params.set("per_page", String(perPage));

        if (mobileSearch.trim()) params.set("mobile", mobileSearch.trim());
        if (statusFilter !== "All") params.set("status", statusFilter);
        if (agentSearch.trim()) params.set("agent", agentSearch.trim());
        if (callTypeFilter) params.set("call_type", callTypeFilter);
        if (dateFrom) params.set("date_from", dateFrom);
        if (dateTo) params.set("date_to", dateTo);

        const res = await fetch(
          `${API_BASE}/campaigns/all-call-logs?${params.toString()}`,
          {
            cache: "no-store",
            credentials: "include",
            headers: authHeaders(),
          }
        );

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load call logs");
        }

        if (resetPage) setCurrentPage(1);
        setLogs(json.data || []);
        setTotal(json.total ?? 0);
        setTotalPages(json.total_pages ?? 1);
      } catch (err: any) {
        console.error("load error:", err?.message);
        setLogs([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [
      mobileSearch,
      statusFilter,
      agentSearch,
      callTypeFilter,
      dateFrom,
      dateTo,
      currentPage,
      perPage,
    ]
  );

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);

  // ============================================
  // Badges
  // ============================================
  const getCallTypeBadge = (type: string) => {
    const t = type?.toLowerCase();
    if (t === "in") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary border border-blue-200">
          <PhoneIncoming className="w-3 h-3 text-blue-500" />
          <span>Inbound</span>
        </span>
      );
    }
    if (t === "out") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
          <PhoneOutgoing className="w-3 h-3 text-emerald-500" />
          <span>Outbound</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
        <PhoneMissed className="w-3 h-3 text-rose-500" />
        <span>Missed</span>
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    if (s === "ANSWERED") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>Completed</span>
        </span>
      );
    }
    if (s === "FAILED" || s === "BUSY") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-500" />
          <span>{s === "BUSY" ? "Busy" : "Failed"}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-500" />
        <span>No Answer</span>
      </span>
    );
  };

  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  return (
    <div className="space-y-6 container mx-auto min-h-screen text-slate-800">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-50 text-primary border border-blue-100">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-wide">
              All Call Logs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter, search, and monitor incoming and outgoing call records.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition flex items-center space-x-2 shadow-sm self-start md:self-auto">
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Mobile</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search with Mobile"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-primary focus:bg-white transition"
            >
              <option value="All">All</option>
              <option value="ANSWERED">Answered</option>
              <option value="FAILED">Failed</option>
              <option value="BUSY">Busy</option>
              <option value="NO ANSWER">No Answer</option>
              <option value="Missed">Missed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Date From</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Date To</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Agent</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Agent"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={callTypeFilter}
              onChange={(e) =>
                setCallTypeFilter(e.target.value as "" | "in" | "out")
              }
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-primary focus:bg-white transition"
            >
              <option value="">All Types</option>
              <option value="in">Inbound</option>
              <option value="out">Outbound</option>
            </select>
            <button
              onClick={() => load(true)}
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-md shadow-primary/10 transition flex items-center justify-center space-x-2 text-xs h-9.5"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-primary text-white font-bold tracking-wider uppercase border-b border-blue-500">
                <th className="py-3.5 px-4 text-center">SN</th>
                <th className="py-3.5 px-4">CALL TYPE</th>
                <th className="py-3.5 px-4">FROM / TO</th>
                <th className="py-3.5 px-4">IP NUMBER</th>
                <th className="py-3.5 px-4">AGENT</th>
                <th className="py-3.5 px-4">DURATION</th>
                <th className="py-3.5 px-4">STARTED AT</th>
                <th className="py-3.5 px-4 text-center">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <Loader2 className="w-5 h-5 animate-spin inline text-slate-400" />
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition duration-150"
                  >
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                      {start + idx}
                    </td>
                    <td className="py-3.5 px-4">
                      {getCallTypeBadge(row.call_type)}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {row.caller}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {row.ipnumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {row.agent || "Unassigned"}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {secondsToDuration(row.duration)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {row.call_time}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(row.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {row.recording ? (
                        <a
                          href={row.recording}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-primary hover:bg-primary hover:text-white transition border border-blue-100 font-semibold text-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </a>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="py-16 text-center text-slate-500 font-medium bg-slate-50/50"
                  >
                    No call logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800 focus:outline-none focus:border-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>

          <div className="font-medium">
            Showing <span className="font-bold text-slate-900">{start}</span> to{" "}
            <span className="font-bold text-slate-900">{end}</span> of{" "}
            <span className="font-bold text-slate-900">{total}</span> results
          </div>

          <div className="flex items-center space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-lg font-bold bg-primary text-white shadow-sm">
              {currentPage}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}