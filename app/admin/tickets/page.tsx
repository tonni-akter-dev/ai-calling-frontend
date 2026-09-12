/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Ticket,
  Clock3,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MessageSquare,
  User,
  CalendarDays,
  ArrowUp,
  ArrowDown,
  Minus,
  Loader2,
  Pencil,
  X,
} from "lucide-react";

import PageHeader from "../components/PageHeader";
import { useGetTicketsQuery, useGetTicketStatsQuery, useUpdateTicketStatusMutation } from "@/app/redux/features/apis/supportApi";
import { toast } from "sonner";
import { ApiTicket, TicketCategory, TicketPriority, TicketStatus } from "@/app/utils/type";

export default function SupportTicketsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | TicketStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<"All" | TicketPriority>("All");
  const [categoryFilter, setCategoryFilter] = useState<"All" | TicketCategory>("All");
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<ApiTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<TicketStatus>("Open");
  const [resolutionNote, setResolutionNote] = useState("");

  // Fetch tickets with filters
  const { 
    data: ticketsData, 
    isLoading: ticketsLoading, 
    error: ticketsError,
    refetch 
  } = useGetTicketsQuery({
    search: search || undefined,
    status: statusFilter === "All" ? "" : statusFilter,
    priority: priorityFilter === "All" ? "" : priorityFilter,
    category: categoryFilter === "All" ? "" : categoryFilter,
    page,
    limit: 10,
  });

  // Fetch ticket stats
  const { 
    data: statsData, 
    isLoading: statsLoading 
  } = useGetTicketStatsQuery({});

  // Update ticket status mutation
  const [updateTicketStatus, { isLoading: isUpdating }] = useUpdateTicketStatusMutation();

  const tickets: ApiTicket[] = ticketsData?.data?.tickets || [];
  const pagination = ticketsData?.data?.pagination;
  const stats = statsData?.data;

  const isLoading = ticketsLoading || statsLoading;

  // Filter tickets (frontend filtering for real-time search)
  const filteredTickets = useMemo(() => {
    if (!search.trim()) return tickets;
    
    const query = search.toLowerCase().trim();
    return tickets.filter((ticket: ApiTicket) =>
      String(ticket.ticketId).toLowerCase().includes(query) ||
      ticket.subject?.toLowerCase().includes(query) ||
      ticket.user?.name?.toLowerCase().includes(query) ||
      ticket.user?.email?.toLowerCase().includes(query) ||
      ticket.companyName?.toLowerCase().includes(query)
    );
  }, [tickets, search]);

  // Open edit modal
  const handleEdit = (ticket: ApiTicket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setResolutionNote(ticket.resolutionNote || "");
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setNewStatus("Open");
    setResolutionNote("");
  };

  // Update ticket status
  const handleUpdateStatus = async () => {
    if (!selectedTicket) return;

    try {
      await updateTicketStatus({
         id: selectedTicket.ticketId,
        status: newStatus,
        resolutionNote: resolutionNote || undefined,
      }).unwrap();

      toast.success(`Ticket ${selectedTicket.ticketId} updated to ${newStatus}`);
      handleCloseModal();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update ticket status");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <PageHeader
          title="Support Tickets"
          description="Manage customer support requests, issues and conversations."
        />
        <div className="flex items-center justify-center min-h-100">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="mt-4 text-slate-600">Loading tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (ticketsError) {
    return (
      <div className="space-y-6 pb-10">
        <PageHeader
          title="Support Tickets"
          description="Manage customer support requests, issues and conversations."
        />
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>Error loading tickets: {(ticketsError as any)?.data?.error || "Something went wrong"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Support Tickets"
        description="Manage customer support requests, issues and conversations."
      />
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Tickets"
          value={stats?.totalTickets || "0"}
          subtitle="All support tickets"
          icon={<Ticket className="h-5 w-5" />}
          iconClass="bg-blue-50 text-primary"
        />
        <SummaryCard
          title="Open"
          value={stats?.openTickets || "0"}
          subtitle="Need attention"
          icon={<AlertCircle className="h-5 w-5" />}
          iconClass="bg-orange-50 text-orange-600"
        />
        <SummaryCard
          title="In Progress"
          value={stats?.inProgress || "0"}
          subtitle="Being handled"
          icon={<Clock3 className="h-5 w-5" />}
          iconClass="bg-violet-50 text-violet-600"
        />
        <SummaryCard
          title="Resolved"
          value={stats?.resolved || "0"}
          subtitle={`${stats?.urgent || 0} urgent tickets`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>
      {/* TICKETS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* TABLE HEADER */}
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                All Support Tickets
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and manage customer support requests.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tickets..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-64"
                />
              </div>

              {/* STATUS */}
              <FilterSelect
                icon={<Filter className="h-4 w-4" />}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as "All" | TicketStatus)}
                options={[
                  "All",
                  "Open",
                  "In Progress",
                  "Resolved",
                  "Closed",
                ]}
              />

              {/* PRIORITY */}
              <FilterSelect
                value={priorityFilter}
                onChange={(value) => setPriorityFilter(value as "All" | TicketPriority)}
                options={[
                  "All",
                  "Low",
                  "Medium",
                  "High",
                  "Urgent",
                ]}
              />

              {/* CATEGORY */}
              <FilterSelect
                value={categoryFilter}
                onChange={(value) => setCategoryFilter(value as "All" | TicketCategory)}
                options={[
                  "All",
                  "Complaint",
                  "Request",
                  "Billing",
                ]}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead align="right">Action</TableHead>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.map((ticket: ApiTicket) => (
                <TicketRow 
                  key={ticket.id} 
                  ticket={ticket} 
                  onEdit={handleEdit}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {filteredTickets.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Ticket className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No tickets found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {pagination && pagination.total > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredTickets.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {pagination.total}
              </span>{" "}
              tickets
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={!pagination.hasPreviousPage}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium ${
                    p === page
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                disabled={!pagination.hasNextPage}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && selectedTicket && (
        <EditTicketModal
          ticket={selectedTicket}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          resolutionNote={resolutionNote}
          setResolutionNote={setResolutionNote}
          onClose={handleCloseModal}
          onUpdate={handleUpdateStatus}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}

function TicketRow({
  ticket,
  onEdit,
}: {
  ticket: ApiTicket;
  onEdit: (ticket: ApiTicket) => void;
}) {
  const userName = ticket.user?.name || ticket.companyName || "Unknown";
  const userEmail = ticket.user?.email || ticket.companyEmail || "";
  const userRole = ticket.user?.role || "";

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
      {/* TICKET */}
      <td className="px-5 py-4">
        <div className="max-w-62.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">
              {ticket.id}
            </span>

            {ticket.priority === "Urgent" && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase text-red-600">
                Urgent
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-sm font-medium text-slate-700">
            {ticket.subject}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
            <MessageSquare className="h-3 w-3" />
            {ticket.messages || 0} messages
          </div>
        </div>
      </td>

      {/* CUSTOMER */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-primary">
            {getInitials(userName)}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">
              {userName}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {userEmail}
            </p>
          </div>
        </div>
      </td>

      {/* CATEGORY */}
      <td className="px-5 py-4">
        <CategoryBadge category={ticket.category} />
      </td>

      {/* PRIORITY */}
      <td className="px-5 py-4">
        <PriorityBadge priority={ticket.priority} />
      </td>

      {/* STATUS */}
      <td className="px-5 py-4">
        <StatusBadge status={ticket.status} />
      </td>

      {/* ASSIGNED TO */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <User className="h-3.5 w-3.5" />
          </div>

          <span className="text-sm text-slate-700">
            {userRole === "admin" || userRole === "super_admin" 
              ? "Admin" 
              : "Support Team"}
          </span>
        </div>
      </td>

      {/* UPDATED */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">
          <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
          {ticket.updatedAt || ticket.createdAt}
        </div>
      </td>

      {/* ACTION */}
      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-2">

          <button
            onClick={() => onEdit(ticket)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-600"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   EDIT TICKET MODAL
========================================================= */

function EditTicketModal({
  ticket,
  newStatus,
  setNewStatus,
  resolutionNote,
  setResolutionNote,
  onClose,
  onUpdate,
  isUpdating,
}: {
  ticket: ApiTicket;
  newStatus: TicketStatus;
  setNewStatus: (status: TicketStatus) => void;
  resolutionNote: string;
  setResolutionNote: (note: string) => void;
  onClose: () => void;
  onUpdate: () => void;
  isUpdating: boolean;
}) {
  const statusOptions: TicketStatus[] = ["Open", "In Progress", "Resolved", "Closed"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Update Ticket</h3>
            <p className="mt-1 text-sm text-slate-500">
              {ticket.id} - {ticket.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Ticket Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-500">Customer</label>
              <p className="text-sm font-semibold text-slate-900">
                {ticket.user?.name || ticket.companyName}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Category</label>
              <p className="text-sm font-semibold text-slate-900">{ticket.category}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Priority</label>
              <p className="text-sm font-semibold text-slate-900">{ticket.priority}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Current Status</label>
              <p className="text-sm font-semibold text-slate-900">{ticket.status}</p>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <label className="text-xs font-medium text-slate-500">Issue Description</label>
            <div className="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              {ticket.description}
            </div>
          </div>

          {/* Update Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Update Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Resolution Note */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Resolution Note (Optional)
            </label>
            <textarea
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Add a resolution note..."
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            disabled={isUpdating}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Ticket"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`rounded-xl p-2.5 ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: TicketStatus;
}) {
  const config:any= {
    Open: {
      className: "bg-blue-50 text-blue-700",
      icon: <AlertCircle className="h-3.5 w-3.5" />,
    },

    "In Progress": {
      className: "bg-violet-50 text-violet-700",
      icon: <Clock3 className="h-3.5 w-3.5" />,
    },

    Resolved: {
      className: "bg-emerald-50 text-emerald-700",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },

    Closed: {
      className: "bg-slate-100 text-slate-600",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
  };

  const item = config[status] || {
    className: "bg-gray-100 text-gray-600",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      {item.icon}
      {status || "Unknown"}
    </span>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({
  priority,
}: {
  priority: TicketPriority;
}) {
  const config: Record<
    TicketPriority,
    {
      className: string;
      icon: React.ReactNode;
    }
  > = {
    Low: {
      className: "bg-slate-100 text-slate-600",
      icon: <ArrowDown className="h-3.5 w-3.5" />,
    },

    Medium: {
      className: "bg-blue-50 text-blue-700",
      icon: <Minus className="h-3.5 w-3.5" />,
    },

    High: {
      className: "bg-orange-50 text-orange-700",
      icon: <ArrowUp className="h-3.5 w-3.5" />,
    },

    Urgent: {
      className: "bg-red-50 text-red-700",
      icon: <AlertCircle className="h-3.5 w-3.5" />,
    },
  };

  const item = config[priority];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${item.className}`}
    >
      {item.icon}
      {priority}
    </span>
  );
}

/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({
  category,
}: {
  category: TicketCategory;
}) {
  const config: Record<
    TicketCategory,
    string
  > = {
    Complaint: "bg-orange-50 text-orange-700",
    Request: "bg-blue-50 text-blue-700",
    Billing: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${config[category] || "bg-slate-100 text-slate-600"}`}
    >
      {category}
    </span>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 appearance-none rounded-xl border border-slate-200 bg-white pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          icon ? "pl-9" : "pl-3"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

/* =========================================================
   TABLE HEAD
========================================================= */

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function getInitials(name: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}