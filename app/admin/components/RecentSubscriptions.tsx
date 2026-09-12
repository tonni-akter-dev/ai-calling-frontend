"use client";

import Link from "next/link";
import { Eye, CheckCircle, AlertCircle, XCircle, LucideIcon } from "lucide-react";

// Types
interface Subscription {
  id: number | string;
  company_name: string;
  company_email: string;
  admin_name?: string;
  plan_name: string;
  price_bdt: number;
  status: string;
  current_period_end: string;
  created_at?: string;
}

interface StatusBadge {
  label: string;
  className: string;
  icon: LucideIcon;
}

interface RecentSubscriptionsProps {
  subscriptions?: Subscription[];
}

export default function RecentSubscriptions({ subscriptions = [] }: RecentSubscriptionsProps) {
  // Get status badge
  const getStatusBadge = (status: string, endDate: string): StatusBadge => {
    const now = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (status === "expired" || (status === "active" && daysUntilExpiry < 0)) {
      return {
        label: "Expired",
        className: "bg-red-100 text-red-700",
        icon: XCircle
      };
    } else if (status === "active" && daysUntilExpiry <= 7) {
      return {
        label: "Expiring",
        className: "bg-yellow-100 text-yellow-700",
        icon: AlertCircle
      };
    } else if (status === "active") {
      return {
        label: "Active",
        className: "bg-green-100 text-green-700",
        icon: CheckCircle
      };
    }
    return {
      label: status || "Unknown",
      className: "bg-gray-100 text-gray-700",
      icon: XCircle
    };
  };

  // Format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-900">Recent Subscriptions</h3>
          <p className="text-xs text-slate-500">
            Latest users who purchased a plan
          </p>
        </div>
        <Link
          href="/admin/subscriptions"
          className="text-xs font-medium text-primary hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-120">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                User
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                Plan
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                Date
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                Status
              </th>
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                  No recent subscriptions
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => {
                const status = getStatusBadge(sub.status, sub.current_period_end);
                const StatusIcon = status.icon;

                return (
                  <tr
                    key={sub.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {sub.company_name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {sub.admin_name || sub.company_email}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sub.plan_name}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      ৳{sub.price_bdt}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(sub.current_period_end)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/subscriptions/${sub.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}