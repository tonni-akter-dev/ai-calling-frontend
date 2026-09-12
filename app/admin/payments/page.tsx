"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  ChevronDown,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  Wallet,
  CalendarDays,
  User,
  Smartphone,
  Receipt,
  ArrowUpRight,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";

type PaymentMethod = "bKash" | "Nagad" | "Bank Transfer" | "Card";

interface Payment {
  id: string;
  transactionId: string;
  user: string;
  email: string;
  phone: string;
  method: PaymentMethod;
  amount: number;
  credits: number;
  status: PaymentStatus;
  date: string;
  time: string;
}

const payments: Payment[] = [
  {
    id: "PAY-1001",
    transactionId: "TRX9A82KLM21",
    user: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "01712345678",
    method: "bKash",
    amount: 5000,
    credits: 12500,
    status: "Completed",
    date: "Sep 06, 2026",
    time: "10:42 AM",
  },
  {
    id: "PAY-1002",
    transactionId: "TRX7B19NPK44",
    user: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01812345678",
    method: "Nagad",
    amount: 2500,
    credits: 6250,
    status: "Completed",
    date: "Sep 06, 2026",
    time: "09:35 AM",
  },
  {
    id: "PAY-1003",
    transactionId: "TRX3C82QWE72",
    user: "Karim Hasan",
    email: "karim@example.com",
    phone: "01912345678",
    method: "bKash",
    amount: 10000,
    credits: 25000,
    status: "Pending",
    date: "Sep 06, 2026",
    time: "09:12 AM",
  },
  {
    id: "PAY-1004",
    transactionId: "TRX8D92RTY61",
    user: "Sadia Islam",
    email: "sadia@example.com",
    phone: "01612345678",
    method: "Card",
    amount: 7500,
    credits: 18750,
    status: "Completed",
    date: "Sep 05, 2026",
    time: "06:24 PM",
  },
  {
    id: "PAY-1005",
    transactionId: "TRX1E52UIO83",
    user: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "01512345678",
    method: "Bank Transfer",
    amount: 15000,
    credits: 37500,
    status: "Completed",
    date: "Sep 05, 2026",
    time: "04:18 PM",
  },
  {
    id: "PAY-1006",
    transactionId: "TRX4F73PAS29",
    user: "Mim Akter",
    email: "mim@example.com",
    phone: "01312345678",
    method: "Nagad",
    amount: 3000,
    credits: 7500,
    status: "Failed",
    date: "Sep 05, 2026",
    time: "02:51 PM",
  },
  {
    id: "PAY-1007",
    transactionId: "TRX6G12LKJ55",
    user: "Arif Khan",
    email: "arif@example.com",
    phone: "01412345678",
    method: "bKash",
    amount: 5000,
    credits: 12500,
    status: "Completed",
    date: "Sep 04, 2026",
    time: "11:32 AM",
  },
  {
    id: "PAY-1008",
    transactionId: "TRX2H91ZXV38",
    user: "Jannat Ara",
    email: "jannat@example.com",
    phone: "01798765432",
    method: "Card",
    amount: 2000,
    credits: 5000,
    status: "Refunded",
    date: "Sep 03, 2026",
    time: "05:42 PM",
  },
  {
    id: "PAY-1009",
    transactionId: "TRX5J62QAZ17",
    user: "Sabbir Ahmed",
    email: "sabbir@example.com",
    phone: "01898765432",
    method: "bKash",
    amount: 8000,
    credits: 20000,
    status: "Completed",
    date: "Sep 03, 2026",
    time: "01:20 PM",
  },
  {
    id: "PAY-1010",
    transactionId: "TRX9K71MNB42",
    user: "Farzana Rahman",
    email: "farzana@example.com",
    phone: "01987654321",
    method: "Nagad",
    amount: 4500,
    credits: 11250,
    status: "Pending",
    date: "Sep 02, 2026",
    time: "10:15 AM",
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Failed: "border-red-200 bg-red-50 text-red-700",
  Refunded: "border-slate-200 bg-slate-100 text-slate-600",
};

const methodStyles: Record<PaymentMethod, string> = {
  bKash: "bg-pink-50 text-pink-600",
  Nagad: "bg-orange-50 text-orange-600",
  "Bank Transfer": "bg-blue-50 text-primary",
  Card: "bg-violet-50 text-violet-600",
};

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | PaymentStatus>("All");
  const [method, setMethod] = useState<"All" | PaymentMethod>("All");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(searchText) ||
        payment.transactionId.toLowerCase().includes(searchText) ||
        payment.user.toLowerCase().includes(searchText) ||
        payment.email.toLowerCase().includes(searchText) ||
        payment.phone.includes(searchText);

      const matchesStatus =
        status === "All" || payment.status === status;

      const matchesMethod =
        method === "All" || payment.method === method;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [search, status, method]);

  const completedPayments = payments.filter(
    (payment) => payment.status === "Completed"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  );

  const totalRevenue = completedPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const pendingAmount = pendingPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const totalCredits = completedPayments.reduce(
    (sum, payment) => sum + payment.credits,
    0
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <PageHeader
        title="Payments"
        description="Monitor and manage all user payments across the platform."
      />

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value={`৳${totalRevenue.toLocaleString()}`}
          subtitle="Completed payments"
          icon={<Wallet className="h-5 w-5" />}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <SummaryCard
          title="Pending Payments"
          value={`৳${pendingAmount.toLocaleString()}`}
          subtitle={`${pendingPayments.length} transactions pending`}
          icon={<Clock3 className="h-5 w-5" />}
          iconClass="bg-amber-50 text-amber-600"
        />

        <SummaryCard
          title="Successful Payments"
          value={completedPayments.length.toLocaleString()}
          subtitle={`${payments.length} total transactions`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClass="bg-blue-50 text-primary"
        />

        <SummaryCard
          title="Credits Sold"
          value={totalCredits.toLocaleString()}
          subtitle="From completed payments"
          icon={<CreditCard className="h-5 w-5" />}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      {/* Payment Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Payment Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current payment activity across the platform.
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <OverviewItem
              label="Completed"
              value={completedPayments.length}
              amount={totalRevenue}
              type="success"
            />

            <OverviewItem
              label="Pending"
              value={pendingPayments.length}
              amount={pendingAmount}
              type="pending"
            />

            <OverviewItem
              label="Failed"
              value={failedPayments.length}
              amount={failedPayments.reduce(
                (sum, payment) => sum + payment.amount,
                0
              )}
              type="failed"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Smartphone className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Payment Methods
              </h2>

              <p className="text-xs text-slate-500">
                Transaction distribution
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <MethodItem
              method="bKash"
              count={payments.filter((p) => p.method === "bKash").length}
              amount={payments
                .filter((p) => p.method === "bKash")
                .reduce((sum, p) => sum + p.amount, 0)}
            />

            <MethodItem
              method="Nagad"
              count={payments.filter((p) => p.method === "Nagad").length}
              amount={payments
                .filter((p) => p.method === "Nagad")
                .reduce((sum, p) => sum + p.amount, 0)}
            />

            <MethodItem
              method="Card"
              count={payments.filter((p) => p.method === "Card").length}
              amount={payments
                .filter((p) => p.method === "Card")
                .reduce((sum, p) => sum + p.amount, 0)}
            />

            <MethodItem
              method="Bank Transfer"
              count={
                payments.filter((p) => p.method === "Bank Transfer").length
              }
              amount={payments
                .filter((p) => p.method === "Bank Transfer")
                .reduce((sum, p) => sum + p.amount, 0)}
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              All Payments
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage payment transactions from all users.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transaction or user..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-64"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "All" | PaymentStatus)
                }
                className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Method */}
            <div className="relative">
              <select
                value={method}
                onChange={(e) =>
                  setMethod(e.target.value as "All" | PaymentMethod)
                }
                className="h-10 appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Methods</option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">
                  Bank Transfer
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-312.5">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <TableHead>Transaction</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead align="right">Action</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <PaymentRow
                    key={payment.id}
                    payment={payment}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Search className="h-5 w-5 text-slate-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      No payments found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filteredPayments.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {payments.length}
            </span>{" "}
            payments
          </p>

          <p className="text-xs text-slate-400">
            Super Admin View
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Summary Card
-------------------------------- */

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
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
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Overview Item
-------------------------------- */

function OverviewItem({
  label,
  value,
  amount,
  type,
}: {
  label: string;
  value: number;
  amount: number;
  type: "success" | "pending" | "failed";
}) {
  const styles = {
    success: "bg-emerald-50 text-emerald-600",
    pending: "bg-amber-50 text-amber-600",
    failed: "bg-red-50 text-red-600",
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <span
          className={`rounded-lg px-2 py-1 text-xs font-bold ${styles[type]}`}
        >
          {value}
        </span>
      </div>

      <p className="mt-3 text-lg font-bold text-slate-800">
        ৳{amount.toLocaleString()}
      </p>
    </div>
  );
}

/* --------------------------------
   Payment Method Item
-------------------------------- */

function MethodItem({
  method,
  count,
  amount,
}: {
  method: PaymentMethod;
  count: number;
  amount: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${methodStyles[method]}`}
        >
          {method === "Bank Transfer"
            ? "BT"
            : method === "bKash"
            ? "BK"
            : method === "Nagad"
            ? "NG"
            : "CC"}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700">
            {method}
          </p>

          <p className="text-xs text-slate-400">
            {count} transactions
          </p>
        </div>
      </div>

      <p className="text-sm font-bold text-slate-800">
        ৳{amount.toLocaleString()}
      </p>
    </div>
  );
}

/* --------------------------------
   Table Head
-------------------------------- */

function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

/* --------------------------------
   Payment Row
-------------------------------- */

function PaymentRow({
  payment,
}: {
  payment: Payment;
}) {
  return (
    <tr className="group transition hover:bg-slate-50/70">
      {/* Transaction */}
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">
            {payment.id}
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
            <Receipt className="h-3.5 w-3.5" />
            {payment.transactionId}
          </p>
        </div>
      </td>

      {/* User */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-primary">
            {payment.user
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">
              {payment.user}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {payment.email}
            </p>
          </div>
        </div>
      </td>

      {/* Method */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-semibold ${methodStyles[payment.method]}`}
        >
          {payment.method}
        </span>
      </td>

      {/* Amount */}
      <td className="px-5 py-4">
        <p className="text-sm font-bold text-slate-800">
          ৳{payment.amount.toLocaleString()}
        </p>
      </td>

      {/* Credits */}
      <td className="px-5 py-4">
        <p className="text-sm font-semibold text-slate-700">
          {payment.credits.toLocaleString()}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          credits
        </p>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[payment.status]}`}
        >
          {payment.status === "Completed" && (
            <CheckCircle2 className="h-3.5 w-3.5" />
          )}

          {payment.status === "Pending" && (
            <Clock3 className="h-3.5 w-3.5" />
          )}

          {payment.status === "Failed" && (
            <XCircle className="h-3.5 w-3.5" />
          )}

          {payment.status === "Refunded" && (
            <CreditCard className="h-3.5 w-3.5" />
          )}

          {payment.status}
        </span>
      </td>

      {/* Date */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />

          <div>
            <p className="text-sm text-slate-600">
              {payment.date}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {payment.time}
            </p>
          </div>
        </div>
      </td>

      {/* Action */}
      <td className="px-5 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/admin/payments/${payment.id}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

