/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";

interface CallRecord {
  id: number;
  apiVer: string;
  phone: string;
  createdDate: string;
  createdRelative: string;
  updatedDate: string;
  updatedRelative: string;
  status: "Failed" | "Success" | "Pending";
}

export default function CallsHistoryPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState("1000");

  // Mock data matching the portal layout structure
  const mockCalls: CallRecord[] = [
    {
      id: 990,
      apiVer: "apiV3",
      phone: "01752606733",
      createdDate: "2026-07-16 02:45:09",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:15:14",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 991,
      apiVer: "apiV3",
      phone: "01640940227",
      createdDate: "2026-07-16 02:45:08",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:14:35",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 992,
      apiVer: "apiV3",
      phone: "01342148650",
      createdDate: "2026-07-16 02:45:05",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:13:56",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 993,
      apiVer: "apiV3",
      phone: "01406058723",
      createdDate: "2026-07-16 02:45:01",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:13:17",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 994,
      apiVer: "apiV3",
      phone: "01868320167",
      createdDate: "2026-07-16 02:44:59",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:12:38",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 995,
      apiVer: "apiV3",
      phone: "01330601118",
      createdDate: "2026-07-16 02:44:58",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:11:59",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 996,
      apiVer: "apiV3",
      phone: "01909319081",
      createdDate: "2026-07-16 02:44:55",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:11:20",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 997,
      apiVer: "apiV3",
      phone: "01778149927",
      createdDate: "2026-07-16 02:44:53",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 13:10:40",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 998,
      apiVer: "apiV3",
      phone: "01782250984",
      createdDate: "2026-07-16 00:22:36",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 12:04:38",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 999,
      apiVer: "apiV3",
      phone: "01722634905",
      createdDate: "2026-07-16 00:22:20",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 12:03:58",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
    {
      id: 1000,
      apiVer: "apiV3",
      phone: "01733405597",
      createdDate: "2026-07-16 00:21:48",
      createdRelative: "4 weeks ago",
      updatedDate: "2026-07-15 12:03:20",
      updatedRelative: "4 weeks ago",
      status: "Failed",
    },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(mockCalls.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-700 font-sans text-xs md:text-sm">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header */}
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="p-4 w-10 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.length === mockCalls.length &&
                    mockCalls.length > 0
                  }
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th className="p-4">ID</th>
              <th className="p-4">API Version</th>
              <th className="p-4">Recipient</th>
              <th className="p-4">Created Time</th>
              <th className="p-4">Updated Time</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 font-normal">
            {mockCalls.map((row) => {
              const isSelected = selectedRows.includes(row.id);
              return (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50/80 transition ${
                    isSelected ? "bg-purple-50/30" : ""
                  }`}
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(row.id)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="p-4 font-mono text-slate-600">{row.id}</td>
                  <td className="p-4 font-medium text-slate-700">{row.apiVer}</td>
                  <td className="p-4 font-mono font-medium text-slate-800">
                    {row.phone}
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-slate-700">{row.createdDate}</div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {row.createdRelative}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-mono text-slate-700">{row.updatedDate}</div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {row.updatedRelative}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center space-x-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
                        {row.status}
                      </span>
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="inline-flex items-center space-x-1 border border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold px-3 py-1 rounded-md transition text-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching screenshot */}
      <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Entries Selector */}
        <div className="flex items-center space-x-2 text-slate-500 text-xs">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-purple-500 font-medium text-slate-700"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
          </select>
          <span>entries</span>
        </div>

        {/* Page Controls & Info */}
        <div className="flex items-center space-x-4 text-xs">
          <span className="text-slate-500">
            Showing <strong className="text-slate-700">1</strong> to{" "}
            <strong className="text-slate-700">1000</strong> of{" "}
            <strong className="text-slate-700">2160</strong> results
          </span>

          <div className="flex items-center space-x-1">
            <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md bg-purple-700 text-white font-bold flex items-center justify-center shadow-xs">
              1
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">
              2
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center">
              3
            </button>
            <button className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}