"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  MoreHorizontal,
  Phone,
  Receipt,
  Smartphone,
  User,
  Wallet,
  XCircle,
  ShieldCheck,
  Hash,
  ArrowDownToLine,
} from "lucide-react";

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
  gatewayTransactionId: string;
  reference: string;
  fee: number;
  netAmount: number;
  walletBalanceBefore: number;
  walletBalanceAfter: number;
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
    gatewayTransactionId: "BK9A82KLM21",
    reference: "CREDIT-PURCHASE-1001",
    fee: 75,
    netAmount: 4925,
    walletBalanceBefore: 2350,
    walletBalanceAfter: 14850,
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
    gatewayTransactionId: "NG7B19NPK44",
    reference: "CREDIT-PURCHASE-1002",
    fee: 37.5,
    netAmount: 2462.5,
    walletBalanceBefore: 1200,
    walletBalanceAfter: 7450,
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
    gatewayTransactionId: "BK3C82QWE72",
    reference: "CREDIT-PURCHASE-1003",
    fee: 150,
    netAmount: 9850,
    walletBalanceBefore: 850,
    walletBalanceAfter: 850,
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

export default function PaymentDetailsPage() {
  const params = useParams();

  const paymentId = String(params.id);

  const payment =
    payments.find(
      (item) =>
        item.id.toLowerCase() === paymentId.toLowerCase()
    ) || payments[0];

  return (
    <div className="space-y-6 pb-10">
      {/* Back */}
      <Link
        href="/admin/payments"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Payments
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Receipt className="h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Payment {payment.id}
                </h1>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[payment.status]}`}
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

                  {payment.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Hash className="h-4 w-4" />
                  {payment.transactionId}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {payment.date}
                </span>

                <span>{payment.time}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {payment.status === "Completed" && (
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowDownToLine className="h-4 w-4" />
                Download Receipt
              </button>
            )}

            {payment.status === "Pending" && (
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Verify Payment
              </button>
            )}

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Amount */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AmountCard
          title="Payment Amount"
          value={`৳${payment.amount.toLocaleString()}`}
          subtitle="Gross amount"
          icon={<Wallet className="h-5 w-5" />}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <AmountCard
          title="Credits Purchased"
          value={payment.credits.toLocaleString()}
          subtitle="Credits added"
          icon={<CreditCard className="h-5 w-5" />}
          iconClass="bg-blue-50 text-primary"
        />

        <AmountCard
          title="Payment Fee"
          value={`৳${payment.fee.toLocaleString()}`}
          subtitle="Gateway / processing fee"
          icon={<Receipt className="h-5 w-5" />}
          iconClass="bg-orange-50 text-orange-600"
        />

        <AmountCard
          title="Net Amount"
          value={`৳${payment.netAmount.toLocaleString()}`}
          subtitle="After payment fee"
          icon={<ShieldCheck className="h-5 w-5" />}
          iconClass="bg-violet-50 text-violet-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Payment Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Payment Information
              </h2>

              <p className="text-xs text-slate-500">
                Transaction and gateway details
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            <InfoItem
              label="Payment ID"
              value={payment.id}
            />

            <InfoItem
              label="Transaction ID"
              value={payment.transactionId}
            />

            <InfoItem
              label="Payment Method"
              value={
                <span
                  className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${methodStyles[payment.method]}`}
                >
                  {payment.method}
                </span>
              }
            />

            <InfoItem
              label="Gateway Transaction ID"
              value={payment.gatewayTransactionId}
            />

            <InfoItem
              label="Payment Reference"
              value={payment.reference}
            />

            <InfoItem
              label="Payment Date"
              value={`${payment.date}, ${payment.time}`}
            />

            <InfoItem
              label="Payment Amount"
              value={`৳${payment.amount.toLocaleString()}`}
            />

            <InfoItem
              label="Credits Purchased"
              value={`${payment.credits.toLocaleString()} credits`}
            />
          </div>
        </div>

        {/* User */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Customer
              </h2>

              <p className="text-xs text-slate-500">
                Payment owner
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">
              {payment.user
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                {payment.user}
              </p>

              <p className="text-xs text-slate-400">
                User ID: USR-
                {payment.id.replace("PAY-", "")}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Mail className="h-4 w-4 text-slate-400" />

              <span className="text-sm text-slate-600">
                {payment.email}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Phone className="h-4 w-4 text-slate-400" />

              <span className="text-sm text-slate-600">
                {payment.phone}
              </span>
            </div>
          </div>

          <Link
            href={`/admin/users/${payment.id.replace("PAY-", "")}`}
            className="mt-5 flex h-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            View User Profile
          </Link>
        </div>
      </div>

      {/* Wallet + Credit Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Wallet Balance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Wallet Balance
              </h2>

              <p className="text-xs text-slate-500">
                Balance before and after this payment
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <BalanceBox
              label="Before Payment"
              value={`৳${payment.walletBalanceBefore.toLocaleString()}`}
            />

            <BalanceBox
              label="After Payment"
              value={`৳${payment.walletBalanceAfter.toLocaleString()}`}
              highlight
            />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div>
              <p className="text-xs font-medium text-emerald-700">
                Wallet Added
              </p>

              <p className="mt-1 text-lg font-bold text-emerald-800">
                +৳{payment.amount.toLocaleString()}
              </p>
            </div>

            <ArrowDownToLine className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        {/* Credit Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Credit Purchase
              </h2>

              <p className="text-xs text-slate-500">
                Credit allocation from this payment
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Credits Purchased
              </span>

              <span className="text-xl font-bold text-slate-900">
                {payment.credits.toLocaleString()}
              </span>
            </div>

            <div className="my-4 h-px bg-slate-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Price Per Credit
              </span>

              <span className="text-sm font-semibold text-slate-700">
                ৳
                {(
                  payment.amount / payment.credits
                ).toFixed(2)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Credit Status
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Added to wallet
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Clock3 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Payment Activity
            </h2>

            <p className="text-xs text-slate-500">
              Timeline of this transaction
            </p>
          </div>
        </div>

        <div className="mt-7">
          <TimelineItem
            title="Payment Completed"
            description={`Payment of ৳${payment.amount.toLocaleString()} was successfully received.`}
            time={`${payment.date} • ${payment.time}`}
            icon={<CheckCircle2 className="h-4 w-4" />}
            active
          />

          <TimelineItem
            title="Credits Added"
            description={`${payment.credits.toLocaleString()} credits were added to the user's account.`}
            time={`${payment.date} • 10:43 AM`}
            icon={<CreditCard className="h-4 w-4" />}
            active
          />

          <TimelineItem
            title="Payment Gateway Verified"
            description={`Gateway transaction ${payment.gatewayTransactionId} was verified successfully.`}
            time={`${payment.date} • 10:42 AM`}
            icon={<ShieldCheck className="h-4 w-4" />}
            active
          />

          <TimelineItem
            title="Payment Initiated"
            description={`Payment initiated using ${payment.method}.`}
            time={`${payment.date} • 10:41 AM`}
            icon={<Smartphone className="h-4 w-4" />}
            last
          />
        </div>
      </div>

      {/* Admin Note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Super Admin Payment View
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              This page contains the complete transaction history,
              payment gateway information, customer information,
              wallet balance and credit allocation for this payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Amount Card
-------------------------------- */

function AmountCard({
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
   Info Item
-------------------------------- */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[64px] items-center justify-between gap-4 border-b border-slate-100 py-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* --------------------------------
   Balance Box
-------------------------------- */

function BalanceBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-emerald-100 bg-emerald-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-xl font-bold ${
          highlight
            ? "text-emerald-700"
            : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* --------------------------------
   Timeline Item
-------------------------------- */

function TimelineItem({
  title,
  description,
  time,
  icon,
  active = false,
  last = false,
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            active
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {icon}
        </div>

        {!last && (
          <div className="mt-2 h-full min-h-10 w-px bg-slate-200" />
        )}
      </div>

      <div className="pb-7">
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

        <p className="mt-1.5 text-xs text-slate-400">
          {time}
        </p>
      </div>
    </div>
  );
}
