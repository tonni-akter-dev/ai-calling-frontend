/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
  Plus,
  TrendingUp,
  TrendingDown,
  Ban,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetSubscriptionByIdQuery,
} from "@/app/redux/features/apis/subscriptionApi";
import { Subscription } from "@/app/utils/type";

export default function SubscriptionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: subscription, isLoading, error, refetch } =
    useGetSubscriptionByIdQuery(id);

  // 🆕 Action loading state
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // ============================================
  // Handlers
  // ============================================
  const handleAddCredits = () => {
    if (!subscription?.company_id) return;
    router.push(`/dashboard/credit`);
  };

  const handleSuspend = async () => {
    if (!subscription) return;
    if (
      !confirm(
        `Suspend ${subscription.company_name}? All campaigns will stop.`
      )
    )
      return;

    setActionLoading("suspend");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/subscriptions/${subscription.id}/suspend`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to suspend");
      }

      toast.success("Subscription suspended");
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to suspend");
    } finally {
      setActionLoading(null);
    }
  };

  const handleManageSubscription = () => {
    if (!subscription) return;
    router.push(`/admin/subscriptions/${subscription.id}/edit`);
  };

  // ============================================
  // Helpers
  // ============================================
  const getStatusBadge = (status: string, endDate: string) => {
    const now = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (status === "expired" || (status === "active" && daysUntilExpiry < 0)) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-700",
        icon: XCircle,
      };
    } else if (status === "active" && daysUntilExpiry <= 7) {
      return {
        label: "Expiring Soon",
        className: "bg-yellow-100 text-yellow-700",
        icon: AlertCircle,
      };
    } else if (status === "active") {
      return {
        label: "Active",
        className: "bg-emerald-50 text-emerald-600",
        icon: CheckCircle2,
      };
    } else if (status === "suspended") {
      return {
        label: "Suspended",
        className: "bg-slate-100 text-slate-700",
        icon: Ban,
      };
    }
    return {
      label: status || "Unknown",
      className: "bg-gray-100 text-gray-700",
      icon: XCircle,
    };
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getDaysLeft = (endDate: string) => {
    try {
      const now = new Date();
      const expiry = new Date(endDate);
      const daysLeft = Math.ceil(
        (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysLeft > 0 ? `${daysLeft} Days` : "Expired";
    } catch {
      return "N/A";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAdminName = (users: Subscription["users"]) => {
    if (!users || users.length === 0) return null;
    const admin = users.find(
      (u) => u.role === "admin" || u.role === "super_admin"
    );
    return admin || users[0];
  };

  const formatCurrency = (amount: number | string) => {
    return `৳${Number(amount || 0).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ============================================
  // Loading state
  // ============================================
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-slate-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="mx-auto max-w-375 space-y-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>Error loading subscription details</p>
          <button
            onClick={() => router.push("/admin/subscriptions")}
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Subscriptions
          </button>
        </div>
      </div>
    );
  }

  const status = getStatusBadge(
    subscription.status,
    subscription.current_period_end
  );
  const StatusIcon = status.icon;
  const adminUser = getAdminName(subscription.users);

  // 🆕 Wallet from API response
  const wallet = subscription.wallet || {
    balance: Number(subscription.wallet_balance_bdt || 0),
    total_added: Number(subscription.wallet_balance_bdt || 0),
    total_used: 0,
    currency: "BDT",
  };

  const callUsagePercent = Math.min(
    ((subscription.calls_used_this_period || 0) /
      (subscription.monthly_call_limit || 1)) *
      100,
    100
  );

  return (
    <div className="mx-auto max-w-375 space-y-6">
      {/* Back */}
      <Link
        href="/admin/subscriptions"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to subscriptions
      </Link>

      {/* User Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-primary">
              {adminUser ? getInitials(adminUser.name) : "U"}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {subscription.company_name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {subscription.company_email}
                {adminUser && ` · ${adminUser.name}`}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Subscription ID: #{subscription.id} ·{" "}
                {subscription.users?.length || 0} users
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSuspend}
              disabled={actionLoading === "suspend" || subscription.status === "suspended"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {actionLoading === "suspend" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Ban className="h-3.5 w-3.5" />
              )}
              Suspend User
            </button>

            <button
              onClick={handleManageSubscription}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              <Settings className="h-3.5 w-3.5" />
              Manage Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Subscription + Wallet Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subscription Info */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Current Subscription
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {subscription.plan_name}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-4">
            <Info
              label="Monthly Price"
              value={formatCurrency(subscription.price_bdt)}
            />
            <Info
              label="Started"
              value={formatDate(subscription.current_period_start)}
            />
            <Info
              label="Renewal"
              value={formatDate(subscription.current_period_end)}
            />
            <Info
              label="Days Left"
              value={getDaysLeft(subscription.current_period_end)}
            />
          </div>

          {/* Call Usage */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Call Usage
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {subscription.calls_used_this_period || 0} /{" "}
                  {subscription.monthly_call_limit} calls used
                </p>
              </div>
              <span className="text-xs text-slate-500">
                {subscription.max_concurrent_calls} concurrent calls allowed
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${callUsagePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Wallet Card — Real data from API */}
        <div className="rounded-xl bg-primary p-5 text-white shadow-lg shadow-primary/10">
          <div className="flex items-start justify-between">
            <Wallet className="h-6 w-6 text-blue-100" />
            <Plus className="h-4 w-4 text-blue-100 opacity-50" />
          </div>

          <p className="mt-5 text-sm text-blue-100">
            Current Wallet Balance
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {formatCurrency(wallet.balance)}
          </h2>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-100">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Total Added
              </span>
              <span className="font-semibold text-white">
                {formatCurrency(wallet.total_added)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-blue-100">
              <span className="inline-flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Total Used
              </span>
              <span className="font-semibold text-white">
                {formatCurrency(wallet.total_used)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddCredits}
            className="mt-4 w-full rounded-full bg-white/20 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-white/30 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Credits
          </button>
        </div>
      </div>

      {/* Users List */}
      {subscription.users && subscription.users.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Users</h3>
            <p className="text-xs text-slate-500">
              {subscription.users.length} users associated with this company
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {subscription.users.map((user: any) => (
              <div
                key={user.id}
                className="px-5 py-3 flex items-center justify-between hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    user.role === "super_admin"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}