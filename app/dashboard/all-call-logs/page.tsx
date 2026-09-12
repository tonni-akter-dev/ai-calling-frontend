"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface CallLogItem {
  sn: number;
  callType: "Inbound" | "Outbound" | "Missed";
  fromTo: string;
  ipNumber: string;
  agent: string;
  duration: string;
  startedAt: string;
  status: "Completed" | "Failed" | "No Answer";
}

export default function AllCallLogsPage() {
  const [mobileSearch, setMobileSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState("");
  const [agentSearch, setAgentSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock call logs data
  const callLogs: CallLogItem[] = [
    {
      sn: 1,
      callType: "Inbound",
      fromTo: "01752606733",
      ipNumber: "09649111303",
      agent: "Agent 01 (Rahim)",
      duration: "02m 45s",
      startedAt: "2026-09-01 13:45:10",
      status: "Completed",
    },
    {
      sn: 2,
      callType: "Outbound",
      fromTo: "01640940227",
      ipNumber: "09649111303",
      agent: "Agent 03 (Karim)",
      duration: "00m 52s",
      startedAt: "2026-09-01 13:20:05",
      status: "Completed",
    },
    {
      sn: 3,
      callType: "Missed",
      fromTo: "01342148650",
      ipNumber: "09649111304",
      agent: "Unassigned",
      duration: "00m 00s",
      startedAt: "2026-09-01 12:55:40",
      status: "No Answer",
    },
    {
      sn: 4,
      callType: "Outbound",
      fromTo: "01406058723",
      ipNumber: "09649111303",
      agent: "Agent 02 (Suma)",
      duration: "00m 00s",
      startedAt: "2026-09-01 11:10:18",
      status: "Failed",
    },
  ];

  // Helper badge generator for Call Type
  const getCallTypeBadge = (type: CallLogItem["callType"]) => {
    switch (type) {
      case "Inbound":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-primary border border-blue-200">
            <PhoneIncoming className="w-3 h-3 text-blue-500" />
            <span>Inbound</span>
          </span>
        );
      case "Outbound":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <PhoneOutgoing className="w-3 h-3 text-emerald-500" />
            <span>Outbound</span>
          </span>
        );
      case "Missed":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
            <PhoneMissed className="w-3 h-3 text-rose-500" />
            <span>Missed</span>
          </span>
        );
    }
  };

  // Helper badge generator for Status
  const getStatusBadge = (status: CallLogItem["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Completed</span>
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-500" />
            <span>Failed</span>
          </span>
        );
      case "No Answer":
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>No Answer</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto bg-slate-50 min-h-screen p-4 md:p-6 text-slate-800">
      {/* Header Banner */}
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
              Filter, search, and monitor incoming and outgoing call records across your PBX network.
            </p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition flex items-center space-x-2 shadow-sm self-start md:self-auto">
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filter Options Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Mobile Filter */}
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

          {/* Status Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-primary focus:bg-white transition"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="No Answer">No Answer</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Start Date - End Date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>
          </div>

          {/* Agent Filter */}
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

          {/* Filter Action Button */}
          <div>
            <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-md shadow-primary/10 transition flex items-center justify-center space-x-2 text-xs h-[38px]">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
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
              {callLogs.length > 0 ? (
                callLogs.map((row) => (
                  <tr key={row.sn} className="hover:bg-slate-50 transition duration-150">
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                      {row.sn}
                    </td>
                    <td className="py-3.5 px-4">{getCallTypeBadge(row.callType)}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {row.fromTo}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {row.ipNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {row.agent}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800">
                      {row.duration}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {row.startedAt}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(row.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-primary hover:bg-primary hover:text-white transition border border-blue-100 font-semibold text-xs"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty state when no records are found */
                <tr>
                  <td colSpan={9} className="py-16 text-center text-slate-500 font-medium bg-slate-50/50">
                    No call logs found for this user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination Bar */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          {/* Per Page Selector */}
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800 focus:outline-none focus:border-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries</span>
          </div>

          {/* Result Counter */}
          <div className="font-medium">
            Showing <span className="font-bold text-slate-900">1</span> to{" "}
            <span className="font-bold text-slate-900">{callLogs.length}</span> of{" "}
            <span className="font-bold text-slate-900">{callLogs.length}</span> results
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1 rounded-lg font-bold bg-primary text-white shadow-sm"
            >
              1
            </button>
            <button
              disabled
              onClick={() => setCurrentPage((p) => p + 1)}
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