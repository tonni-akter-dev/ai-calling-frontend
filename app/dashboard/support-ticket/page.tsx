/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Ticket,
  Clock3,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown,
  MessageSquare,
  Send,
  Paperclip,
  Eye,
  Mail,
} from "lucide-react";

import {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketStatsQuery,
} from "@/app/redux/features/apis/supportApi";

/* ============================================================
   TYPES
============================================================ */

type Category = "Complaint" | "Request" | "Billing" | "";

interface TicketUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface TicketData {
  id: string;
  ticketId: number;
  companyId: number;
  user: TicketUser | null;
  category: string;
  type: string;
  subject: string;
  priority: string;
  status: string;
  description: string;
  attachment: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketStats {
  totalTickets: string;
  openTickets: string;
  inProgress: string;
  resolved: string;
}

interface TicketStatsResponse {
  success: boolean;
  data: TicketStats;
}

interface TicketPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface TicketListData {
  tickets: TicketData[];
  pagination: TicketPagination;
}

interface TicketListResponse {
  success: boolean;
  data: TicketListData;
}


/* ============================================================
   REQUEST TYPES
============================================================ */

const requestTypes = {
  Complaint: [
    "Extension Disconnect",
    "Call Drop",
    "Billing",
    "Bulk Voice Call",
    "Voice Quality Issue",
  ],

  Request: [
    "Extension Remove Request",
    "Call Channel",
    "Call Logs Report",
    "Telephone Configuration",
    "Mobile/PC Configuration",
    "API Integration",
  ],

  Billing: [
    "Add Credit",
    "Payment Issue",
    "Invoice Request",
    "Balance Issue",
  ],
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function SupportTicketPage() {
  /* ==========================================================
     MODAL STATE
  ========================================================== */

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ==========================================================
     FORM STATE
  ========================================================== */

  const [category, setCategory] =
    useState<Category>("");

  const [requestType, setRequestType] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [attachment, setAttachment] =
    useState<File | null>(null);

  /* ==========================================================
     FILTER STATE
  ========================================================== */

  const [search, setSearch] =
    useState("");

  const [filterCategory, setFilterCategory] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  /* ==========================================================
     VIEW TICKET STATE
  ========================================================== */

  const [selectedTicket, setSelectedTicket] =
    useState<TicketData | null>(null);

  /* ==========================================================
     GET STATS
  ========================================================== */

  const {
    data: statsResponse,
    isLoading: statsLoading,
  } = useGetTicketStatsQuery({}) as {
    data: TicketStatsResponse | undefined;
    isLoading: boolean;
  };

  /* ==========================================================
     GET TICKETS
  ========================================================== */

  const {
    data: ticketsResponse,
    isLoading: ticketsLoading,
    isFetching: ticketsFetching,
    refetch: refetchTickets,
  } = useGetTicketsQuery({
    search,
    category: filterCategory,
    status: filterStatus,
    page: 1,
    limit: 10,
  }) as {
    data: TicketListResponse | undefined;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => void;
  };

  /* ==========================================================
     CREATE TICKET
  ========================================================== */

  const [
    createTicket,
    {
      isLoading: isCreating,
    },
  ] = useCreateTicketMutation();

  /* ==========================================================
     API DATA
  ========================================================== */

  const stats =
    statsResponse?.data;

  /**
   * IMPORTANT:
   *
   * API:
   *
   * data: {
   *   tickets: [],
   *   pagination: {}
   * }
   *
   * Therefore tickets must come from:
   *
   * ticketsResponse?.data?.tickets
   */

  const tickets =
    ticketsResponse?.data?.tickets || [];

  const pagination =
    ticketsResponse?.data?.pagination;

  /* ==========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {
    setCategory("");
    setRequestType("");
    setSubject("");
    setPriority("");
    setDescription("");
    setAttachment(null);
  };

  /* ==========================================================
     OPEN MODAL
  ========================================================== */

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  /* ==========================================================
     CLOSE MODAL
  ========================================================== */

  const handleCloseModal = () => {
    if (isCreating) return;

    setIsModalOpen(false);
    resetForm();
  };

  /* ==========================================================
     CREATE TICKET
  ========================================================== */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category.");
      return;
    }

    if (!requestType) {
      alert("Please select a request type.");
      return;
    }

    if (!subject.trim()) {
      alert("Subject is required.");
      return;
    }

    if (!description.trim()) {
      alert("Description is required.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "category",
        category
      );

      formData.append(
        "requestType",
        requestType
      );

      formData.append(
        "subject",
        subject.trim()
      );

      formData.append(
        "priority",
        priority || "Low"
      );

      formData.append(
        "description",
        description.trim()
      );

      if (attachment) {
        formData.append(
          "attachment",
          attachment
        );
      }

      await createTicket(
        formData
      ).unwrap();

      alert(
        "Ticket created successfully."
      );

      setIsModalOpen(false);

      resetForm();

      /**
       * Refresh ticket list
       */
      refetchTickets();
    } catch (error: any) {
      console.error(
        "Create ticket error:",
        error
      );

      alert(
        error?.data?.message ||
          error?.data?.error ||
          error?.data?.detail ||
          "Failed to create ticket."
      );
    }
  };

  /* ==========================================================
     FILE CHANGE
  ========================================================== */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] || null;

    setAttachment(file);
  };

  /* ==========================================================
     CLEAR FILTERS
  ========================================================== */

  const clearFilters = () => {
    setSearch("");
    setFilterCategory("");
    setFilterStatus("");
  };

  /* ==========================================================
     VIEW TICKET
  ========================================================== */

  const handleViewTicket = (
    ticket: TicketData
  ) => {
    setSelectedTicket(ticket);
  };

  /* ==========================================================
     CLOSE VIEW MODAL
  ========================================================== */

  const handleCloseView = () => {
    setSelectedTicket(null);
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-800 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <PageHeader
          onOpenTicket={handleOpenModal}
        />

        {/* ====================================================
            STATISTICS
        ==================================================== */}

        <TicketStatistics
          stats={stats}
          loading={statsLoading}
        />

        {/* ====================================================
            TICKET LIST
        ==================================================== */}

        <TicketList
          tickets={tickets}
          pagination={pagination}
          loading={
            ticketsLoading ||
            ticketsFetching
          }
          search={search}
          filterCategory={filterCategory}
          filterStatus={filterStatus}
          showFilters={showFilters}
          onSearchChange={setSearch}
          onCategoryChange={
            setFilterCategory
          }
          onStatusChange={
            setFilterStatus
          }
          onToggleFilters={() =>
            setShowFilters(
              (prev) => !prev
            )
          }
          onClearFilters={
            clearFilters
          }
          onViewTicket={
            handleViewTicket
          }
        />

        {/* ====================================================
            CREATE TICKET MODAL
        ==================================================== */}

        {isModalOpen && (
          <CreateTicketModal
            category={category}
            requestType={requestType}
            subject={subject}
            priority={priority}
            description={description}
            attachment={attachment}
            isCreating={isCreating}
            onCategoryChange={(
              value
            ) => {
              setCategory(
                value as Category
              );
              setRequestType("");
            }}
            onRequestTypeChange={
              setRequestType
            }
            onSubjectChange={
              setSubject
            }
            onPriorityChange={
              setPriority
            }
            onDescriptionChange={
              setDescription
            }
            onFileChange={
              handleFileChange
            }
            onRemoveFile={() =>
              setAttachment(null)
            }
            onClose={
              handleCloseModal
            }
            onSubmit={
              handleSubmit
            }
          />
        )}

        {/* ====================================================
            VIEW TICKET MODAL
        ==================================================== */}

        {selectedTicket && (
          <ViewTicketModal
            ticket={selectedTicket}
            onClose={
              handleCloseView
            }
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE HEADER
============================================================ */

function PageHeader({
  onOpenTicket,
}: {
  onOpenTicket: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-primary">
          <Ticket className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Support Tickets
          </h1>

          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Manage and track your support requests.
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={onOpenTicket}
        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
      >
        <Plus className="h-4 w-4" />
        Open a Ticket
      </button>
    </div>
  );
}

/* ============================================================
   STATISTICS
============================================================ */

function TicketStatistics({
  stats,
  loading,
}: {
  stats?: TicketStats;
  loading: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Tickets"
        value={
          loading
            ? "..."
            : stats?.totalTickets ||
              "00"
        }
        icon={
          <Ticket className="h-5 w-5" />
        }
        iconClass="border-blue-200 bg-blue-50 text-primary"
      />

      <StatsCard
        title="Open Tickets"
        value={
          loading
            ? "..."
            : stats?.openTickets ||
              "00"
        }
        icon={
          <AlertCircle className="h-5 w-5" />
        }
        iconClass="border-amber-200 bg-amber-50 text-amber-600"
      />

      <StatsCard
        title="In Progress"
        value={
          loading
            ? "..."
            : stats?.inProgress ||
              "00"
        }
        icon={
          <Clock3 className="h-5 w-5" />
        }
        iconClass="border-purple-200 bg-purple-50 text-purple-600"
      />

      <StatsCard
        title="Resolved"
        value={
          loading
            ? "..."
            : stats?.resolved ||
              "00"
        }
        icon={
          <CheckCircle2 className="h-5 w-5" />
        }
        iconClass="border-emerald-200 bg-emerald-50 text-emerald-600"
      />

    </div>
  );
}

/* ============================================================
   STATS CARD
============================================================ */

function StatsCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">

      <div>
        <p className="text-xs font-semibold text-slate-500">
          {title}
        </p>

        <h3 className="mt-1 text-2xl font-black text-slate-900">
          {value}
        </h3>
      </div>

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${iconClass}`}
      >
        {icon}
      </div>

    </div>
  );
}

/* ============================================================
   TICKET LIST
============================================================ */

function TicketList({
  tickets,
  pagination,
  loading,
  search,
  filterCategory,
  filterStatus,
  showFilters,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onToggleFilters,
  onClearFilters,
  onViewTicket,
}: {
  tickets: TicketData[];
  pagination?: TicketPagination;
  loading: boolean;
  search: string;
  filterCategory: string;
  filterStatus: string;
  showFilters: boolean;
  onSearchChange: (
    value: string
  ) => void;
  onCategoryChange: (
    value: string
  ) => void;
  onStatusChange: (
    value: string
  ) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  onViewTicket: (
    ticket: TicketData
  ) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-base font-bold tracking-wide text-slate-900">
            Your Support Requests
          </h2>

          <p className="mt-0.5 text-xs font-medium text-slate-500">
            View and manage all your submitted support tickets.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* SEARCH */}

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) =>
                onSearchChange(
                  e.target.value
                )
              }
              placeholder="Search tickets..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white sm:w-60"
            />
          </div>

          {/* FILTER */}

          <button
            type="button"
            onClick={
              onToggleFilters
            }
            className={`flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition ${
              showFilters ||
              filterCategory ||
              filterStatus
                ? "border-blue-200 bg-blue-50 text-primary"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

        </div>
      </div>

      {/* ======================================================
          FILTER PANEL
      ====================================================== */}

      {showFilters && (
        <FilterPanel
          category={
            filterCategory
          }
          status={filterStatus}
          onCategoryChange={
            onCategoryChange
          }
          onStatusChange={
            onStatusChange
          }
          onClear={
            onClearFilters
          }
        />
      )}

      {/* ======================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-275 text-left">
          <TableHeader />
          <tbody className="divide-y divide-slate-100">

            {loading ? (
              <LoadingRows />
            ) : tickets.length > 0 ? (
              tickets.map(
                (ticket) => (
                  <TicketRow
                    key={
                      ticket.ticketId
                    }
                    ticket={
                      ticket
                    }
                    onView={
                      onViewTicket
                    }
                  />
                )
              )
            ) : (
              <EmptyTable />
            )}

          </tbody>

        </table>
      </div>

      {/* ======================================================
          MOBILE
      ====================================================== */}

      <div className="space-y-4 p-4 md:hidden">

        {loading ? (
          <LoadingCards />
        ) : tickets.length > 0 ? (
          tickets.map(
            (ticket) => (
              <MobileTicketCard
                key={
                  ticket.ticketId
                }
                ticket={
                  ticket
                }
                onView={
                  onViewTicket
                }
              />
            )
          )
        ) : (
          <EmptyState />
        )}

      </div>

      {/* ======================================================
          PAGINATION INFO
      ====================================================== */}

      {pagination &&
        pagination.total > 0 && (
          <div className="border-t border-slate-100 px-5 py-4">

            <p className="text-xs font-medium text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {tickets.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-700">
                {pagination.total}
              </span>{" "}
              tickets
            </p>

          </div>
        )}
    </div>
  );
}

/* ============================================================
   TABLE HEADER
============================================================ */

function TableHeader() {
  const headers = [
    "Ticket ID",
    "User",
    "Category",
    "Request Type",
    "Subject",
    "Priority",
    "Status",
    "Date",
    "Action",
  ];

  return (
    <thead className=" bg-gray-300">
      <tr>
        {headers.map(
          (header, index) => (
            <th
              key={header}
              className={`whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase text-black ${
                index ===
                headers.length - 1
                  ? "text-right"
                  : ""
              }`}
            >
              {header}
            </th>
          )
        )}

      </tr>

    </thead>
  );
}

/* ============================================================
   TICKET ROW
============================================================ */

function TicketRow({
  ticket,
  onView,
}: {
  ticket: TicketData;
  onView: (
    ticket: TicketData
  ) => void;
}) {
  return (
    <tr className="transition hover:bg-slate-50">

      {/* ID */}

      <td className="px-5 py-4">
        <span className="font-mono text-sm font-semibold text-primary">
          {ticket.id}
        </span>
      </td>

      {/* USER */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <UserAvatar
            name={
              ticket.user?.name
            }
          />

          <div className="min-w-0">

            <p className="max-w-37.5 truncate text-sm font-semibold text-slate-800">
              {ticket.user?.name ||
                "Unknown User"}
            </p>

            <p className="max-w-45 truncate text-xs text-slate-500">
              {ticket.user?.email ||
                "No email"}
            </p>

          </div>

        </div>

      </td>

      {/* CATEGORY */}

      <td className="px-5 py-4">
        <span className="text-sm font-medium text-slate-600">
          {ticket.category}
        </span>
      </td>

      {/* TYPE */}

      <td className="px-5 py-4">
        <span className="text-sm text-slate-600">
          {ticket.type}
        </span>
      </td>
      {/* SUBJECT */}
      <td className="max-w-55 px-5 py-4">
        <p
          className="truncate text-sm font-semibold text-slate-800"
          title={
            ticket.subject
          }
        >
          {ticket.subject}
        </p>

      </td>

      {/* PRIORITY */}

      <td className="px-5 py-4">
        <PriorityBadge
          priority={
            ticket.priority
          }
        />
      </td>

      {/* STATUS */}

      <td className="px-5 py-4">
        <StatusBadge
          status={
            ticket.status
          }
        />
      </td>

      {/* DATE */}

      <td className="px-5 py-4">

        <span className="whitespace-nowrap text-sm text-slate-500">
          {ticket.date}
        </span>

      </td>

      {/* ACTION */}

      <td className="px-5 py-4 text-right">

        <button
          type="button"
          onClick={() =>
            onView(ticket)
          }
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
          title="View ticket"
        >
          <Eye className="h-4 w-4" />
        </button>

      </td>

    </tr>
  );
}

/* ============================================================
   MOBILE TICKET
============================================================ */

function MobileTicketCard({
  ticket,
  onView,
}: {
  ticket: TicketData;
  onView: (
    ticket: TicketData
  ) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <p className="font-mono text-xs font-bold text-primary">
            {ticket.id}
          </p>

          <h3 className="mt-1 truncate text-sm font-bold text-slate-900">
            {ticket.subject}
          </h3>

          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {ticket.type}
          </p>

        </div>

        <StatusBadge
          status={
            ticket.status
          }
        />

      </div>

      {/* USER */}

      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

        <UserAvatar
          name={
            ticket.user?.name
          }
        />

        <div className="min-w-0">

          <p className="truncate text-xs font-bold text-slate-800">
            {ticket.user?.name ||
              "Unknown User"}
          </p>

          <p className="truncate text-[11px] text-slate-500">
            {ticket.user?.email ||
              "No email"}
          </p>

        </div>

      </div>

      {/* DETAILS */}

      <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Category
          </p>

          <p className="mt-0.5 text-xs font-semibold text-slate-700">
            {ticket.category}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Priority
          </p>

          <div className="mt-1">
            <PriorityBadge
              priority={
                ticket.priority
              }
            />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Date
          </p>

          <p className="mt-0.5 text-xs font-semibold text-slate-700">
            {ticket.date}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Type
          </p>

          <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
            {ticket.type}
          </p>
        </div>

      </div>

      {/* VIEW */}

      <button
        type="button"
        onClick={() =>
          onView(ticket)
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
      >
        <Eye className="h-4 w-4" />
        View Ticket
      </button>

    </div>
  );
}

/* ============================================================
   FILTER PANEL
============================================================ */

function FilterPanel({
  category,
  status,
  onCategoryChange,
  onStatusChange,
  onClear,
}: {
  category: string;
  status: string;
  onCategoryChange: (
    value: string
  ) => void;
  onStatusChange: (
    value: string
  ) => void;
  onClear: () => void;
}) {
  return (
    <div className="border-b border-slate-100 bg-slate-50/70 p-5">

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Category
          </label>

          <SelectField
            value={category}
            onChange={
              onCategoryChange
            }
            options={[
              {
                label:
                  "All Categories",
                value: "",
              },
              {
                label:
                  "Complaint",
                value:
                  "Complaint",
              },
              {
                label: "Request",
                value: "Request",
              },
              {
                label: "Billing",
                value: "Billing",
              },
            ]}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Status
          </label>

          <SelectField
            value={status}
            onChange={
              onStatusChange
            }
            options={[
              {
                label:
                  "All Status",
                value: "",
              },
              {
                label: "Open",
                value: "Open",
              },
              {
                label:
                  "In Progress",
                value:
                  "In Progress",
              },
              {
                label:
                  "Resolved",
                value:
                  "Resolved",
              },
              {
                label: "Closed",
                value: "Closed",
              },
            ]}
          />
        </div>

        <div className="flex items-end">

          <button
            type="button"
            onClick={onClear}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Clear Filters
          </button>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   CREATE TICKET MODAL
============================================================ */

function CreateTicketModal({
  category,
  requestType,
  subject,
  priority,
  description,
  attachment,
  isCreating,
  onCategoryChange,
  onRequestTypeChange,
  onSubjectChange,
  onPriorityChange,
  onDescriptionChange,
  onFileChange,
  onRemoveFile,
  onClose,
  onSubmit,
}: {
  category: Category;
  requestType: string;
  subject: string;
  priority: string;
  description: string;
  attachment: File | null;
  isCreating: boolean;
  onCategoryChange: (
    value: string
  ) => void;
  onRequestTypeChange: (
    value: string
  ) => void;
  onSubjectChange: (
    value: string
  ) => void;
  onPriorityChange: (
    value: string
  ) => void;
  onDescriptionChange: (
    value: string
  ) => void;
  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemoveFile: () => void;
  onClose: () => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/40 backdrop-blur-xs sm:items-center sm:justify-center sm:p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Open a Ticket
            </h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Tell us how we can help you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isCreating}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={onSubmit}
          className="max-h-[75vh] overflow-y-auto p-6"
        >

          <div className="grid gap-5">

            {/* CATEGORY */}

            <FormField
              label="Select Category"
              required
            >
              <SelectField
                value={category}
                onChange={
                  onCategoryChange
                }
                options={[
                  {
                    label:
                      "Select Category",
                    value: "",
                  },
                  {
                    label:
                      "Complaint",
                    value:
                      "Complaint",
                  },
                  {
                    label: "Request",
                    value:
                      "Request",
                  },
                  {
                    label: "Billing",
                    value:
                      "Billing",
                  },
                ]}
              />
            </FormField>

            {/* TYPE */}

            <FormField
              label="Type of Request"
              required
            >
              <SelectField
                value={
                  requestType
                }
                onChange={
                  onRequestTypeChange
                }
                disabled={
                  !category
                }
                options={[
                  {
                    label: category
                      ? "Select One"
                      : "Select category first",
                    value: "",
                  },
                  ...(category
                    ? requestTypes[
                        category
                      ].map(
                        (item) => ({
                          label:
                            item,
                          value:
                            item,
                        })
                      )
                    : []),
                ]}
              />
            </FormField>

            {/* SUBJECT */}

            <FormField
              label="Subject"
              required
            >
              <input
                required
                value={subject}
                onChange={(e) =>
                  onSubjectChange(
                    e.target.value
                  )
                }
                placeholder="Enter ticket subject"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
              />
            </FormField>

            {/* PRIORITY */}

            <FormField label="Priority">
              <SelectField
                value={priority}
                onChange={
                  onPriorityChange
                }
                options={[
                  {
                    label:
                      "Select Priority",
                    value: "",
                  },
                  {
                    label: "Low",
                    value: "Low",
                  },
                  {
                    label: "Medium",
                    value: "Medium",
                  },
                  {
                    label: "High",
                    value: "High",
                  },
                ]}
              />
            </FormField>

            {/* DESCRIPTION */}

            <FormField
              label="Describe Your Issue"
              required
            >
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) =>
                  onDescriptionChange(
                    e.target.value
                  )
                }
                placeholder="Please provide details about your issue..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
              />
            </FormField>

            {/* ATTACHMENT */}

            <div>

              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Attachment
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-4 text-xs font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/40 hover:text-primary">

                <Paperclip className="h-4 w-4" />

                {attachment
                  ? attachment.name
                  : "Upload screenshot or document"}

                <input
                  type="file"
                  className="hidden"
                  onChange={
                    onFileChange
                  }
                  accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx"
                />

              </label>

              {attachment && (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">

                  <p className="truncate text-[11px] font-medium text-blue-700">
                    {attachment.name}
                  </p>

                  <button
                    type="button"
                    onClick={
                      onRemoveFile
                    }
                    className="ml-2 text-xs font-bold text-rose-500 hover:text-rose-700"
                  >
                    Remove
                  </button>

                </div>
              )}

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={onClose}
                disabled={
                  isCreating
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  isCreating ||
                  !category ||
                  !requestType ||
                  !subject.trim() ||
                  !description.trim()
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Submit Ticket
                  </>
                )}
              </button>

            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

/* ============================================================
   VIEW TICKET MODAL
============================================================ */

function ViewTicketModal({
  ticket,
  onClose,
}: {
  ticket: TicketData;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">

      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>
            <p className="font-mono text-xs font-bold text-primary">
              {ticket.id}
            </p>

            <h2 className="mt-1 text-lg font-extrabold text-slate-900">
              Ticket Details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {/* CONTENT */}

        <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">

          {/* USER */}

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

            <UserAvatar
              name={
                ticket.user?.name
              }
            />

            <div>

              <p className="text-sm font-bold text-slate-900">
                {ticket.user?.name ||
                  "Unknown User"}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5" />

                {ticket.user?.email ||
                  "No email"}
              </div>

            </div>

          </div>

          {/* SUBJECT */}

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Subject
            </p>

            <p className="mt-1 text-sm font-bold text-slate-900">
              {ticket.subject}
            </p>

          </div>

          {/* META */}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

            <DetailItem
              label="Category"
              value={
                ticket.category
              }
            />

            <DetailItem
              label="Request Type"
              value={
                ticket.type
              }
            />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Priority
              </p>

              <div className="mt-1">
                <PriorityBadge
                  priority={
                    ticket.priority
                  }
                />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </p>

              <div className="mt-1">
                <StatusBadge
                  status={
                    ticket.status
                  }
                />
              </div>
            </div>

          </div>

          {/* DESCRIPTION */}

          <div>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Description
            </p>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {ticket.description}
              </p>

            </div>

          </div>

          {/* DATE */}

          <div className="grid grid-cols-2 gap-4">

            <DetailItem
              label="Created At"
              value={
                ticket.createdAt
              }
            />

            <DetailItem
              label="Updated At"
              value={
                ticket.updatedAt
              }
            />

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end border-t border-slate-100 px-6 py-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

/* ============================================================
   DETAIL ITEM
============================================================ */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-700">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   USER AVATAR
============================================================ */

function UserAvatar({
  name,
}: {
  name?: string;
}) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-xs font-bold uppercase text-white">
      {name?.charAt(0) ||
        "U"}
    </div>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<
    string,
    string
  > = {
    Open:
      "border-blue-200 bg-blue-50 text-primary",

    "In Progress":
      "border-purple-200 bg-purple-50 text-purple-600",

    Resolved:
      "border-emerald-200 bg-emerald-50 text-emerald-600",

    Closed:
      "border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${
        styles[status] ||
        styles.Open
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {status}
    </span>
  );
}

/* ============================================================
   PRIORITY BADGE
============================================================ */

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const styles: Record<
    string,
    string
  > = {
    Low:
      "border-emerald-200 bg-emerald-50 text-emerald-600",

    Medium:
      "border-amber-200 bg-amber-50 text-amber-600",

    High:
      "border-rose-200 bg-rose-50 text-rose-600",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
        styles[priority] ||
        "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      {priority || "Low"}
    </span>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </label>

      {children}

    </div>
  );
}

/* ============================================================
   SELECT FIELD
============================================================ */

function SelectField({
  value,
  onChange,
  options,
  disabled,
}: {
  value: string;
  onChange: (
    value: string
  ) => void;
  options: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
}) {
  return (
    <div className="relative">

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 pr-9 text-xs font-semibold text-slate-800 outline-none transition focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map(
          (option) => (
            <option
              key={`${option.label}-${option.value}`}
              value={
                option.value
              }
              className="bg-white text-slate-900"
            >
              {option.label}
            </option>
          )
        )}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

    </div>
  );
}

/* ============================================================
   EMPTY TABLE
============================================================ */

function EmptyTable() {
  return (
    <tr>

      <td
        colSpan={9}
        className="px-5 py-16 text-center"
      >

        <div className="flex flex-col items-center justify-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <MessageSquare className="h-5 w-5 text-slate-400" />
          </div>

          <p className="mt-3 text-sm font-bold text-slate-700">
            No tickets found
          </p>

          <p className="mt-1 text-xs text-slate-500">
            There are no tickets to display.
          </p>

        </div>

      </td>

    </tr>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState() {
  return (
    <div className="flex min-h-62.5 flex-col items-center justify-center p-8 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <MessageSquare className="h-6 w-6" />
      </div>

      <h3 className="mt-3 text-sm font-bold text-slate-700">
        No tickets found
      </h3>

      <p className="mt-1 max-w-sm text-xs text-slate-500">
        Your submitted support requests will appear here.
      </p>

    </div>
  );
}

/* ============================================================
   LOADING ROWS
============================================================ */

function LoadingRows() {
  return (
    <>
      {[1, 2, 3].map(
        (item) => (
          <tr key={item}>

            {Array.from({
              length: 9,
            }).map(
              (_, index) => (
                <td
                  key={index}
                  className="px-5 py-5"
                >
                  <div className="h-4 w-full max-w-32 animate-pulse rounded bg-slate-100" />
                </td>
              )
            )}

          </tr>
        )
      )}
    </>
  );
}

/* ============================================================
   LOADING CARDS
============================================================ */

function LoadingCards() {
  return (
    <>
      {[1, 2, 3].map(
        (item) => (
          <div
            key={item}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4"
          >

            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />

            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />

            <div className="h-16 w-full animate-pulse rounded bg-slate-100" />

            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />

          </div>
        )
      )}
    </>
  );
}