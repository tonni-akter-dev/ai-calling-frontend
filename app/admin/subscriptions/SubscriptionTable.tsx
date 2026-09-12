"use client";

import Link from "next/link";
import {
  Eye,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface Subscription {
  id: number;
  company_id: number;
  plan_id: number;
  status: string;
  calls_used_this_period: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
  plan_name: string;
  price_bdt: number;
  monthly_call_limit: number;
  max_concurrent_calls: number;
  company_name: string;
  company_email: string;
  user_count?: number;
}

interface SubscriptionTableProps {
  search: string;
  subscriptions: Subscription[];
}

export default function SubscriptionTable({
  search,
  subscriptions = []
}: SubscriptionTableProps) {
  // Filter subscriptions based on search
  const filtered = subscriptions.filter((sub) => {
    const searchLower = search.toLowerCase().trim();
    if (!searchLower) return true;
    
    return (
      sub.company_name?.toLowerCase().includes(searchLower) ||
      sub.company_email?.toLowerCase().includes(searchLower) ||
      sub.plan_name?.toLowerCase().includes(searchLower) ||
      sub.id?.toString().includes(searchLower)
    );
  });

  // Get status badge
  const getStatusBadge = (status: string, endDate: string) => {
    const now = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (status === "expired" || (status === "active" && daysUntilExpiry < 0)) {
      return {
        label: "Expired",
        icon: XCircle,
        className: "text-red-600",
        iconClass: "h-3.5 w-3.5"
      };
    } else if (status === "active" && daysUntilExpiry <= 7) {
      return {
        label: "Expiring",
        icon: AlertCircle,
        className: "text-orange-600",
        iconClass: "h-3.5 w-3.5"
      };
    } else if (status === "active") {
      return {
        label: "Active",
        icon: CheckCircle2,
        className: "text-emerald-600",
        iconClass: "h-3.5 w-3.5"
      };
    }
    return {
      label: status || "Unknown",
      icon: XCircle,
      className: "text-gray-600",
      iconClass: "h-3.5 w-3.5"
    };
  };

  // Format date
  const formatDate = (dateString: string) => {
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

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num?.toLocaleString() || '0';
  };

  // Format price
  const formatPrice = (price: number) => {
    return `৳${price?.toLocaleString() || '0'}`;
  };

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm font-medium text-slate-600">
          {subscriptions.length === 0 
            ? "No subscriptions available" 
            : `No subscriptions found matching "${search}"`}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275 text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            <th className="px-5 py-3">
              <input type="checkbox" />
            </th>

            {[
              "Customer",
              "Plan",
              "Price",
              "Balance",
              "Calls",
              "Expires",
              "Status",
              "Action",
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.map((sub) => {
            const status = getStatusBadge(sub.status, sub.current_period_end);
            const StatusIcon = status.icon;

            return (
              <tr
                key={sub.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
              >
                <td className="px-5 py-4">
                  <input type="checkbox" />
                </td>

                <td className="px-4 py-4">
                  <Link
                    href={`/admin/subscriptions/${sub.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-primary">
                      {getInitials(sub.company_name)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800 hover:text-primary">
                        {sub.company_name}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {sub.company_email}
                      </p>
                    </div>
                  </Link>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-primary">
                    {sub.plan_name}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                  {formatPrice(sub.price_bdt)}
                  <span className="text-[10px] font-normal text-slate-400">
                    /month
                  </span>
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                  ৳{formatNumber((sub.price_bdt || 0) * 5)}
                </td>

                <td className="px-4 py-4 text-sm text-slate-600">
                  {formatNumber(sub.calls_used_this_period || 0)}
                </td>

                <td className="px-4 py-4 text-xs text-slate-500">
                  {formatDate(sub.current_period_end)}
                </td>

                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${status.className}`}>
                    <StatusIcon className={status.iconClass} />
                    {status.label}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/subscriptions/${sub.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}