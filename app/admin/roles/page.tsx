"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  X,
  Users,
  Loader2,
  AlertCircle,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface UserRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  company_id: number;
  company_name: string;
  subscription_status?: string | null;
}

/* =========================================================
   CONFIG
========================================================= */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    null
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminsPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  /* =======================================================
     FETCH USERS
  ======================================================= */

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load users");
      }

      setUsers(data.data || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* =======================================================
     SEARCH FILTER (simple client-side)
  ======================================================= */

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.phone || "").toLowerCase().includes(q) ||
      (u.company_name || "").toLowerCase().includes(q)
    );
  });

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="space-y-6 pb-10">
        {/* =================================================
            HEADER
        ================================================== */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Administrators
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              All registered users of the platform.
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
            TABLE CARD
        ================================================== */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* TOOLBAR */}
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">All Users</h3>
              <p className="mt-1 text-sm text-slate-500">
                Total{" "}
                <span className="font-semibold text-slate-700">
                  {filteredUsers.length}
                </span>{" "}
                user{filteredUsers.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />
              </div>

              <button
                onClick={fetchUsers}
                title="Refresh"
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-20 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading users...
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <AlertCircle className="h-10 w-10 text-red-500" />
                <p className="text-sm font-medium text-red-600">{error}</p>
                <button
                  onClick={fetchUsers}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Retry
                </button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-16 text-center">
                <Users className="mx-auto h-10 w-10 text-slate-300" />
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {search
                    ? "Try changing your search."
                    : "Add your first administrator."}
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <Th>User</Th>
                    <Th>Phone</Th>
                    <Th>Role</Th>
                    <Th>Company</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                    >
                      {/* USER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {user.name}
                            </p>
                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* PHONE */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          {user.phone || "—"}
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      {/* COMPANY */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" />
                          {user.company_name || "—"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================
          ADD USER MODAL (Registration API)
      ==================================================== */}

      {modalOpen && (
        <AddUserModal
          onClose={() => setModalOpen(false)}
          onCreated={() => {
            setModalOpen(false);
            fetchUsers();
          }}
        />
      )}
    </>
  );
}

/* =========================================================
   ADD USER MODAL  →  POST /api/auth/signup
========================================================= */

function AddUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);

    // Validation (matches backend signup requirements)
    if (!form.companyName || !form.name || !form.email || !form.password) {
      setError("Company name, full name, email and password are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          companyName: form.companyName.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create user");
      }

      // Optional: store returned token (signup returns token)
      if (data.token && typeof window !== "undefined") {
        // Uncomment if you WANT to auto-login as the new user:
        // localStorage.setItem("token", data.token);
      }

      onCreated();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

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
              Register a new administrator account.
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
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <InputField
            label="Company Name"
            name="companyName"
            placeholder="Enter company name"
            value={form.companyName}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="Full Name"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="Phone Number"
              name="phone"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* INFO NOTE */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Admin Role
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-700">
                  New users are registered with the <b>admin</b> role
                  automatically via the registration endpoint.
                </p>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Admin
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    super_admin: "bg-violet-50 text-violet-700",
    admin: "bg-blue-50 text-blue-700",
    support_admin: "bg-orange-50 text-orange-700",
    finance_admin: "bg-emerald-50 text-emerald-700",
  };
  const label: Record<string, string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    support_admin: "Support Admin",
    finance_admin: "Finance Admin",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        map[role] || "bg-slate-100 text-slate-700"
      }`}
    >
      {label[role] || role}
    </span>
  );
}

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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getInitials(name: string) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}