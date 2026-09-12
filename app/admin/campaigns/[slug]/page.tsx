/* eslint-disable react/no-unescaped-entities */

"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  Phone,
  PhoneCall,
  PlayCircle,
  Users,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  User,
  Activity,
} from "lucide-react";

import { useParams } from "next/navigation";

type CampaignStatus = "Running" | "Completed" | "Scheduled" | "Failed";

interface Campaign {
  id: string;
  name: string;
  user: string;
  email: string;
  phone: string;
  totalContacts: number;
  completed: number;
  success: number;
  failed: number;
  duration: string;
  credits: number;
  status: CampaignStatus;
  date: string;
}

const campaigns: Campaign[] = [
  {
    id: "CMP-1001",
    name: "Monthly Promotion",
    user: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "01712345678",
    totalContacts: 8450,
    completed: 5746,
    success: 5210,
    failed: 536,
    duration: "02:45:32",
    credits: 3378,
    status: "Running",
    date: "Sep 06, 2026",
  },
  {
    id: "CMP-1002",
    name: "Eid Offer Campaign",
    user: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01812345678",
    totalContacts: 5200,
    completed: 5200,
    success: 4810,
    failed: 390,
    duration: "01:52:18",
    credits: 2080,
    status: "Completed",
    date: "Sep 05, 2026",
  },
  {
    id: "CMP-1003",
    name: "Customer Reminder",
    user: "Karim Hasan",
    email: "karim@example.com",
    phone: "01912345678",
    totalContacts: 3200,
    completed: 0,
    success: 0,
    failed: 0,
    duration: "—",
    credits: 1280,
    status: "Scheduled",
    date: "Sep 07, 2026",
  },
  {
    id: "CMP-1004",
    name: "New Product Announcement",
    user: "Sadia Islam",
    email: "sadia@example.com",
    phone: "01612345678",
    totalContacts: 6800,
    completed: 6800,
    success: 6125,
    failed: 675,
    duration: "02:14:42",
    credits: 2720,
    status: "Completed",
    date: "Sep 04, 2026",
  },
  {
    id: "CMP-1005",
    name: "Payment Reminder",
    user: "Tanvir Hossain",
    email: "tanvir@example.com",
    phone: "01512345678",
    totalContacts: 1800,
    completed: 980,
    success: 912,
    failed: 68,
    duration: "00:42:15",
    credits: 720,
    status: "Running",
    date: "Sep 06, 2026",
  },
  {
    id: "CMP-1006",
    name: "Service Feedback",
    user: "Mim Akter",
    email: "mim@example.com",
    phone: "01312345678",
    totalContacts: 2400,
    completed: 2400,
    success: 2215,
    failed: 185,
    duration: "00:58:44",
    credits: 960,
    status: "Completed",
    date: "Sep 03, 2026",
  },
  {
    id: "CMP-1007",
    name: "Weekend Campaign",
    user: "Arif Khan",
    email: "arif@example.com",
    phone: "01412345678",
    totalContacts: 4100,
    completed: 0,
    success: 0,
    failed: 0,
    duration: "—",
    credits: 1640,
    status: "Scheduled",
    date: "Sep 08, 2026",
  },
  {
    id: "CMP-1008",
    name: "Failed Test Campaign",
    user: "Jannat Ara",
    email: "jannat@example.com",
    phone: "01798765432",
    totalContacts: 950,
    completed: 950,
    success: 120,
    failed: 830,
    duration: "00:21:10",
    credits: 380,
    status: "Failed",
    date: "Sep 02, 2026",
  },
];

const statusStyles: Record<CampaignStatus, string> = {
  Running: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200",
  Scheduled: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
};

export default function CampaignDetailsPage() {
  const params = useParams();

  const campaignId = String(params.id);

  const campaign =
    campaigns.find(
      (item) => item.id.toLowerCase() === campaignId.toLowerCase()
    ) || campaigns[0];

  const successRate =
    campaign.completed > 0
      ? Math.round((campaign.success / campaign.completed) * 100)
      : 0;

  const failedRate =
    campaign.completed > 0
      ? Math.round((campaign.failed / campaign.completed) * 100)
      : 0;

  const progress =
    campaign.totalContacts > 0
      ? Math.round((campaign.completed / campaign.totalContacts) * 100)
      : 0;

  return (
    <div className="space-y-6 pb-10">
      {/* Back */}
      <Link
        href="/admin/campaigns"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Campaigns
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
              <PhoneCall className="h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {campaign.name}
                </h1>

                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[campaign.status]}`}
                >
                  {campaign.status === "Running" && (
                    <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  )}

                  {campaign.status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="font-medium text-slate-700">
                  {campaign.id}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {campaign.date}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {campaign.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {campaign.status === "Running" && (
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <XCircle className="h-4 w-4" />
                Stop Campaign
              </button>
            )}

            {campaign.status === "Scheduled" && (
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
              >
                <PlayCircle className="h-4 w-4" />
                Start Now
              </button>
            )}

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value={campaign.totalContacts.toLocaleString()}
          subtitle={`${progress}% processed`}
          icon={<Users className="h-5 w-5" />}
          iconClass="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Successful Calls"
          value={campaign.success.toLocaleString()}
          subtitle={`${successRate}% success rate`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Failed Calls"
          value={campaign.failed.toLocaleString()}
          subtitle={`${failedRate}% failure rate`}
          icon={<XCircle className="h-5 w-5" />}
          iconClass="bg-red-50 text-red-600"
        />

        <StatCard
          title="Credits Used"
          value={campaign.credits.toLocaleString()}
          subtitle="Campaign usage"
          icon={<CreditCard className="h-5 w-5" />}
          iconClass="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Progress + User */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Campaign Progress */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Campaign Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current call processing status
              </p>
            </div>

            <span className="text-sm font-bold text-primary">
              {progress}%
            </span>
          </div>

          <div className="mt-6">
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ProgressItem
              label="Total"
              value={campaign.totalContacts}
            />

            <ProgressItem
              label="Completed"
              value={campaign.completed}
            />

            <ProgressItem
              label="Success"
              value={campaign.success}
            />

            <ProgressItem
              label="Failed"
              value={campaign.failed}
            />
          </div>
        </div>

        {/* User Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Campaign Owner
              </h2>

              <p className="text-xs text-slate-500">
                Subscribed user
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-primary">
              {campaign.user
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                {campaign.user}
              </p>

              <p className="text-xs text-slate-400">
                User ID: USR-{campaign.id.replace("CMP-", "")}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Mail className="h-4 w-4 text-slate-400" />

              <span className="text-sm text-slate-600">
                {campaign.email}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Phone className="h-4 w-4 text-slate-400" />

              <span className="text-sm text-slate-600">
                {campaign.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Campaign Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <Activity className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Campaign Information
              </h2>

              <p className="text-xs text-slate-500">
                General campaign details
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            <InfoRow label="Campaign ID" value={campaign.id} />
            <InfoRow label="Campaign Name" value={campaign.name} />
            <InfoRow label="Status" value={campaign.status} />
            <InfoRow label="Created Date" value={campaign.date} />
            <InfoRow label="Call Duration" value={campaign.duration} />
            <InfoRow
              label="Total Contacts"
              value={campaign.totalContacts.toLocaleString()}
            />
            <InfoRow
              label="Credits Used"
              value={`${campaign.credits.toLocaleString()} credits`}
            />
          </div>
        </div>

        {/* Call Performance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <PhoneCall className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Call Performance
              </h2>

              <p className="text-xs text-slate-500">
                Detailed call statistics
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <PerformanceBar
              label="Successful Calls"
              value={campaign.success}
              total={campaign.completed}
              percentage={successRate}
              type="success"
            />

            <PerformanceBar
              label="Failed Calls"
              value={campaign.failed}
              total={campaign.completed}
              percentage={failedRate}
              type="failed"
            />

            <PerformanceBar
              label="Remaining"
              value={campaign.totalContacts - campaign.completed}
              total={campaign.totalContacts}
              percentage={100 - progress}
              type="remaining"
            />
          </div>
        </div>
      </div>

      {/* Recent Call Logs */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Call Logs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest call activity for this campaign
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            View All Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Date & Time</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <CallLogRow
                phone="01712345678"
                status="Success"
                duration="00:01:24"
                credits="1"
                date="Sep 06, 2026 10:42 AM"
              />

              <CallLogRow
                phone="01812345678"
                status="Success"
                duration="00:00:58"
                credits="1"
                date="Sep 06, 2026 10:40 AM"
              />

              <CallLogRow
                phone="01912345678"
                status="Failed"
                duration="00:00:04"
                credits="1"
                date="Sep 06, 2026 10:38 AM"
              />

              <CallLogRow
                phone="01612345678"
                status="Success"
                duration="00:02:12"
                credits="1"
                date="Sep 06, 2026 10:36 AM"
              />

              <CallLogRow
                phone="01512345678"
                status="Failed"
                duration="00:00:02"
                credits="1"
                date="Sep 06, 2026 10:34 AM"
              />
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-semibold text-blue-900">
            Super Admin View
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-700">
            You are viewing campaign activity and call statistics for
            a subscribed user. Campaign actions may affect the user's
            call balance and active campaign.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Stat Card
-------------------------------- */

function StatCard({
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
   Progress Item
-------------------------------- */

function ProgressItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-800">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

/* --------------------------------
   Info Row
-------------------------------- */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

/* --------------------------------
   Performance Bar
-------------------------------- */

function PerformanceBar({
  label,
  value,
  total,
  percentage,
  type,
}: {
  label: string;
  value: number;
  total: number;
  percentage: number;
  type: "success" | "failed" | "remaining";
}) {
  const barClass =
    type === "success"
      ? "bg-emerald-500"
      : type === "failed"
      ? "bg-red-500"
      : "bg-slate-400";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700">
            {label}
          </p>

          <p className="text-xs text-slate-400">
            {value.toLocaleString()} / {total.toLocaleString()}
          </p>
        </div>

        <span className="text-sm font-bold text-slate-700">
          {percentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* --------------------------------
   Table Head
-------------------------------- */

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

/* --------------------------------
   Call Log Row
-------------------------------- */

function CallLogRow({
  phone,
  status,
  duration,
  credits,
  date,
}: {
  phone: string;
  status: "Success" | "Failed";
  duration: string;
  credits: string;
  date: string;
}) {
  return (
    <tr className="transition hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            <Phone className="h-4 w-4 text-slate-500" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {phone}
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        {status === "Success" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Success
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
            <XCircle className="h-3.5 w-3.5" />
            Failed
          </span>
        )}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {duration}
      </td>

      <td className="px-5 py-4">
        <span className="text-sm font-semibold text-slate-700">
          {credits}
        </span>
      </td>

      <td className="px-5 py-4 text-sm text-slate-500">
        {date}
      </td>
    </tr>
  );
}
