/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Users,
  CreditCard,
  Wallet,
  PhoneCall,
  TrendingUp,
} from "lucide-react";
import StatCard from "./components/StatCard";
import { useGetDashboardStatsQuery } from "@/app/redux/features/apis/dashboardApi";
import { Key } from "react";
import RecentSubscriptions from "./components/RecentSubscriptions";

export default function SuperAdminDashboard() {
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery({});

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(1)}K`;
    }
    return `৳${amount}`;
  };

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-375 space-y-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>
            Error loading dashboard: {
              error &&
              typeof error === "object" &&
              "data" in error &&
              typeof error.data === "object" &&
              error.data !== null &&
              "error" in error.data
                ? String(error.data.error)
                : "Something went wrong"
            }
          </p>
        </div>
      </div>
    );
  }

  const { overview, calls, plan_distribution, revenue, recent } = stats;

  return (
    <div className="mx-auto max-w-375 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of subscriptions, users and platform activity.
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Last updated: {new Date(stats.updated_at).toLocaleString()}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={formatNumber(overview.total_users)}
          description={`${overview.user_growth >= 0 ? "+" : ""}${overview.user_growth}% from last month`}
          icon={Users}
        />

        <StatCard
          title="Active Subscriptions"
          value={formatNumber(overview.active_subscriptions)}
          description={`${overview.subscription_rate}% of total users`}
          icon={CreditCard}
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(overview.monthly_revenue)}
          description={`${overview.revenue_growth >= 0 ? "+" : ""}${overview.revenue_growth}% from last month`}
          icon={TrendingUp}
          iconClass="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Total Calls"
          value={formatNumber(overview.total_calls)}
          description={`${formatNumber(calls.this_month)} calls this month`}
          icon={PhoneCall}
          iconClass="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Subscription Summary & Revenue */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Subscription Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Subscription Overview
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Current active plans
              </p>
            </div>

            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div className="mt-6 space-y-5">
            {plan_distribution && plan_distribution.length > 0 ? (
              plan_distribution.map((plan: {
                price_bdt: number; plan_name: string; count: number 
}) => (
                <PlanRow
                  key={plan.plan_name}
                  name={plan.plan_name}
                  users={formatNumber(plan.count)}
                  percentage={((plan.count / overview.active_subscriptions) * 100).toFixed(0)}
                  price={plan.price_bdt}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500">No active subscriptions</p>
            )}
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Revenue Overview
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Subscription revenue (last 12 months)
              </p>
            </div>

            <Wallet className="h-5 w-5 text-emerald-600" />
          </div>

          <div className="mt-8 flex h-48 items-end gap-3">
            {revenue?.monthly_chart && revenue.monthly_chart.length > 0 ? (
              (() => {
                const maxRevenue = Math.max(...revenue.monthly_chart.map((r: { revenue: any; }) => r.revenue), 1);
                
                return revenue.monthly_chart.map((item: { revenue: number; month: string }, index: Key | null | undefined) => {
                  const height = ((item.revenue / maxRevenue) * 100);
                  const isCurrentMonth = index === revenue.monthly_chart.length - 1;
                  
                  return (
                    <div
                      key={index}
                      className="group flex flex-1 flex-col justify-end"
                    >
                      <div
                        style={{ height: `${Math.max(height, 5)}%` }}
                        className={`rounded-t-md transition group-hover:opacity-80 ${
                          isCurrentMonth ? 'bg-primary' : 'bg-blue-400'
                        }`}
                      />
                      
                      <span className="mt-2 text-center text-[9px] text-slate-400">
                        {item.month}
                      </span>
                    </div>
                  );
                });
              })()
            ) : (
              <div className="w-full text-center text-sm text-slate-500">
                No revenue data available
              </div>
            )}
          </div>
        </div>
      </div>

      <RecentSubscriptions subscriptions={recent?.subscriptions || []} />
    </div>
  );
}

function PlanRow({
  name,
  users,
  percentage,
  price,
}: {
  name: string;
  users: string;
  percentage: string;
  price: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <div>
          <span className="font-medium text-slate-700">
            {name}
          </span>
          <span className="ml-2 text-xs text-slate-400">
            ৳{price}/mo
          </span>
        </div>

        <span className="text-xs text-slate-500">
          {users} users
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
          className="h-full rounded-full bg-primary transition-all duration-500"
        />
      </div>
    </div>
  );
}