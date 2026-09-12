"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ShieldCheck,
  Shield,
  UserCog,
  CheckCircle2,
  XCircle,
  Clock3,
  ChevronDown,
  Users,
  KeyRound,
  Activity,
  Mail,
  CalendarDays,
  X,
  CreditCard,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

type AdminStatus = "Active" | "Inactive";
type AdminRole =
  | "Super Admin"
  | "Admin"
  | "Support Admin"
  | "Finance Admin";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: AdminStatus;
  lastLogin: string;
  createdAt: string;
  permissions: number;
}

/* =========================================================
   MOCK DATA
========================================================= */

const initialAdmins: AdminUser[] = [
  {
    id: "ADM-1001",
    name: "Tonni Akter",
    email: "tonni@example.com",
    phone: "01712345678",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Sep 06, 2026 • 10:42 AM",
    createdAt: "Jan 12, 2026",
    permissions: 24,
  },
  {
    id: "ADM-1002",
    name: "Sadia Islam",
    email: "sadia@example.com",
    phone: "01812345678",
    role: "Admin",
    status: "Active",
    lastLogin: "Sep 06, 2026 • 09:35 AM",
    createdAt: "Feb 05, 2026",
    permissions: 18,
  },
  {
    id: "ADM-1003",
    name: "Karim Hasan",
    email: "karim@example.com",
    phone: "01912345678",
    role: "Support Admin",
    status: "Active",
    lastLogin: "Sep 05, 2026 • 05:20 PM",
    createdAt: "Mar 18, 2026",
    permissions: 9,
  },
  {
    id: "ADM-1004",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01612345678",
    role: "Finance Admin",
    status: "Active",
    lastLogin: "Sep 05, 2026 • 03:15 PM",
    createdAt: "Apr 02, 2026",
    permissions: 8,
  },
  {
    id: "ADM-1005",
    name: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "01512345678",
    role: "Admin",
    status: "Inactive",
    lastLogin: "Aug 29, 2026 • 11:40 AM",
    createdAt: "May 21, 2026",
    permissions: 18,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function AdminsRolesPage() {
  const [admins, setAdmins] =
    useState<AdminUser[]>(initialAdmins);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState<"All" | AdminRole>("All");

  const [statusFilter, setStatusFilter] =
    useState<"All" | AdminStatus>("All");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] =
    useState<AdminUser | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const query = search.toLowerCase();

      const matchesSearch =
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query) ||
        admin.id.toLowerCase().includes(query) ||
        admin.phone.includes(query);

      const matchesRole =
        roleFilter === "All" ||
        admin.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        admin.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [admins, search, roleFilter, statusFilter]);

  /* =======================================================
     STATS
  ======================================================= */

  const totalAdmins = admins.length;

  const activeAdmins = admins.filter(
    (admin) => admin.status === "Active"
  ).length;

  const inactiveAdmins = admins.filter(
    (admin) => admin.status === "Inactive"
  ).length;

  const superAdmins = admins.filter(
    (admin) => admin.role === "Super Admin"
  ).length;

  const supportAdmins = admins.filter(
    (admin) => admin.role === "Support Admin"
  ).length;

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = () => {
    if (!selectedAdmin) return;

    setAdmins((prev) =>
      prev.filter(
        (admin) => admin.id !== selectedAdmin.id
      )
    );

    setDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  /* =======================================================
     TOGGLE STATUS
  ======================================================= */

  const toggleStatus = (adminId: string) => {
    setAdmins((prev) =>
      prev.map((admin) => {
        if (admin.id !== adminId) return admin;

        return {
          ...admin,
          status:
            admin.status === "Active"
              ? "Inactive"
              : "Active",
        };
      })
    );
  };

  return (
    <>
      <div className="space-y-6 pb-10">


        {/* =================================================
            TOP ACTION
        ================================================== */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Administrator Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Control who can access and manage the platform.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Administrator
          </button>
        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            title="Total Admins"
            value={totalAdmins.toString()}
            subtitle="Administrator accounts"
            icon={<Users className="h-5 w-5" />}
            iconClass="bg-blue-50 text-primary"
          />

          <SummaryCard
            title="Active"
            value={activeAdmins.toString()}
            subtitle="Currently active"
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            title="Inactive"
            value={inactiveAdmins.toString()}
            subtitle="Disabled accounts"
            icon={<XCircle className="h-5 w-5" />}
            iconClass="bg-red-50 text-red-600"
          />

          <SummaryCard
            title="Super Admin"
            value={superAdmins.toString()}
            subtitle="Full platform access"
            icon={<ShieldCheck className="h-5 w-5" />}
            iconClass="bg-violet-50 text-violet-600"
          />

          <SummaryCard
            title="Support Admins"
            value={supportAdmins.toString()}
            subtitle="Support management"
            icon={
              <UserCog className="h-5 w-5" />
            }
            iconClass="bg-orange-50 text-orange-600"
          />
        </div>

        {/* =================================================
            ROLE OVERVIEW
        ================================================== */}



        {/* =================================================
            ADMIN TABLE
        ================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* TABLE HEADER */}

          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  All Administrators
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage all administrator accounts.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* SEARCH */}

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search admins..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                  />
                </div>

                {/* ROLE */}

                <FilterSelect
                  icon={
                    <Shield className="h-4 w-4" />
                  }
                  value={roleFilter}
                  onChange={(value) =>
                    setRoleFilter(
                      value as
                        | "All"
                        | AdminRole
                    )
                  }
                  options={[
                    "All",
                    "Super Admin",
                    "Admin",
                    "Support Admin",
                    "Finance Admin",
                  ]}
                />

                {/* STATUS */}

                <FilterSelect
                  icon={
                    <Filter className="h-4 w-4" />
                  }
                  value={statusFilter}
                  onChange={(value) =>
                    setStatusFilter(
                      value as
                        | "All"
                        | AdminStatus
                    )
                  }
                  options={[
                    "All",
                    "Active",
                    "Inactive",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <TableHead>Administrator</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead align="right">
                    Actions
                  </TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredAdmins.map((admin) => (
                  <AdminRow
                    key={admin.id}
                    admin={admin}
                    onDelete={() => {
                      setSelectedAdmin(admin);
                      setDeleteModalOpen(true);
                    }}
                    onToggleStatus={() =>
                      toggleStatus(admin.id)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY */}

          {filteredAdmins.length === 0 && (
            <div className="py-16 text-center">
              <Users className="mx-auto h-10 w-10 text-slate-300" />

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No administrators found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* FOOTER */}

          {filteredAdmins.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredAdmins.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {admins.length}
                </span>{" "}
                administrators
              </p>

              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">
                  Previous
                </button>

                <button className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white">
                  1
                </button>

                <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            PERMISSION INFORMATION
        ================================================== */}

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-100 p-2 text-primary">
              <KeyRound className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold text-blue-900">
                Role & Permission Management
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                Assign administrators only the permissions
                they need. Super Admin has complete platform
                access, while Admin, Support Admin and Finance
                Admin can have restricted access based on their
                assigned role.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          ADD ADMIN MODAL
      ==================================================== */}

      {modalOpen && (
        <AddAdminModal
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* ===================================================
          DELETE MODAL
      ==================================================== */}

      {deleteModalOpen && selectedAdmin && (
        <DeleteModal
          admin={selectedAdmin}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedAdmin(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

/* =========================================================
   ADMIN ROW
========================================================= */

function AdminRow({
  admin,
  onDelete,
  onToggleStatus,
}: {
  admin: AdminUser;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
      {/* ADMIN */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">
            {getInitials(admin.name)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">
                {admin.name}
              </p>

              {admin.role === "Super Admin" && (
                <ShieldCheck className="h-3.5 w-3.5 text-violet-500" />
              )}
            </div>

            <p className="mt-0.5 text-xs text-slate-400">
              {admin.email}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {admin.id}
            </p>
          </div>
        </div>
      </td>

      {/* ROLE */}

      <td className="px-5 py-4">
        <RoleBadge role={admin.role} />
      </td>

      {/* STATUS */}

      <td className="px-5 py-4">
        <button
          onClick={onToggleStatus}
          className="inline-flex"
        >
          {admin.status === "Active" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              <XCircle className="h-3.5 w-3.5" />
              Inactive
            </span>
          )}
        </button>
      </td>

      {/* PERMISSIONS */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-slate-400" />

          <span className="text-sm font-medium text-slate-700">
            {admin.permissions}
          </span>

          <span className="text-xs text-slate-400">
            permissions
          </span>
        </div>
      </td>

      {/* LAST LOGIN */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">
          <Activity className="h-3.5 w-3.5 text-slate-400" />

          {admin.lastLogin}
        </div>
      </td>

      {/* CREATED */}

      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays className="h-3.5 w-3.5 text-slate-400" />

          {admin.createdAt}
        </div>
      </td>

      {/* ACTIONS */}

      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
      

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <Pencil className="h-4 w-4" />
          </button>

          {admin.role !== "Super Admin" && (
            <button
              onClick={onDelete}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   ROLE BADGE
========================================================= */

function RoleBadge({
  role,
}: {
  role: AdminRole;
}) {
  const config: Record<
    AdminRole,
    string
  > = {
    "Super Admin":
      "bg-violet-50 text-violet-700",
    Admin: "bg-blue-50 text-blue-700",
    "Support Admin":
      "bg-orange-50 text-orange-700",
    "Finance Admin":
      "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${config[role]}`}
    >
      {role}
    </span>
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

/* =========================================================
   ROLE CARD
========================================================= */

function RoleCard({
  icon,
  title,
  description,
  count,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  className: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
        >
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {count}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   ADD ADMIN MODAL
========================================================= */

function AddAdminModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [role, setRole] =
    useState<AdminRole>("Admin");

  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Administrator
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new administrator account.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}

        <div className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="Full Name"
              placeholder="Enter full name"
            />

            <InputField
              label="Email Address"
              placeholder="admin@example.com"
              type="email"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="Phone Number"
              placeholder="01XXXXXXXXX"
            />

            <InputField
              label="Password"
              placeholder="Create password"
              type="password"
            />
          </div>

          {/* ROLE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Administrator Role
            </label>

            <div className="relative">
              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value as AdminRole
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Admin">
                  Admin
                </option>

                <option value="Support Admin">
                  Support Admin
                </option>

                <option value="Finance Admin">
                  Finance Admin
                </option>

                <option value="Super Admin">
                  Super Admin
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* ROLE INFO */}

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  {role}
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700">
                  {getRoleDescription(role)}
                </p>
              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Create Admin
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteModal({
  admin,
  onClose,
  onConfirm,
}: {
  admin: AdminUser;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-900">
          Delete Administrator?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">
            {admin.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete Admin
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   MODAL OVERLAY
========================================================= */

function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* =========================================================
   FILTER
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
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={`h-10 appearance-none rounded-xl border border-slate-200 bg-white pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 ${
          icon ? "pl-9" : "pl-3"
        }`}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
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
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

/* =========================================================
   ROLE DESCRIPTION
========================================================= */

function getRoleDescription(
  role: AdminRole
) {
  switch (role) {
    case "Super Admin":
      return "Full access to the entire platform, including wallet, withdrawals, admins and settings.";

    case "Admin":
      return "General platform administration with access to users, campaigns, reports and settings.";

    case "Support Admin":
      return "Manage customer support tickets, conversations and customer-related issues.";

    case "Finance Admin":
      return "Manage payments, wallet transactions, credits and financial reports.";

    default:
      return "";
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* =========================================================
   SMALL ICON COMPONENTS
========================================================= */

function MessageIcon() {
  return (
    <MessageSquareIcon className="h-5 w-5" />
  );
}

function CreditIcon() {
  return (
    <CreditCard className="h-5 w-5" />
  );
}

function MessageSquareIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <Activity
      className={className}
    />
  );
}