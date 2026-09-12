/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import SubscriptionTable from "./SubscriptionTable";
import { useGetAllSubscriptionsQuery } from "@/app/redux/features/apis/subscriptionApi";

export default function SubscriptionsPage() {
  const [search, setSearch] = useState("");

  // Fetch all subscriptions
  const { 
    data: subscriptions = [], 
    isLoading, 
    error 
  } = useGetAllSubscriptionsQuery({});

  // Calculate statistics from real data
  const stats = useMemo(() => {
    const total = subscriptions.length;
    
    const active = subscriptions.filter(
      (      sub: { status: string; current_period_end: string | number | Date; }) => sub.status === 'active' && new Date(sub.current_period_end) > new Date()
    ).length;
    
    const expiringSoon = subscriptions.filter((sub: { status: string; current_period_end: string | number | Date; }) => {
      if (sub.status !== 'active') return false;
      const now = new Date();
      const expiry = new Date(sub.current_period_end);
      const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
    }).length;
    
    // Expired
    const expired = subscriptions.filter(
      (sub: { status: string; current_period_end: string | number | Date; }) => sub.status === 'active' && new Date(sub.current_period_end) <= new Date()
    ).length;
    
    return {
      total,
      active,
      expiringSoon,
      expired
    };
  }, [subscriptions]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-375 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage every user's subscription and usage.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-500">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto max-w-375 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage every user's subscription and usage.
          </p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Error loading subscriptions: {
            (error as { data?: { error?: string } })?.data?.error ||
            "Something went wrong"
          }
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-375 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Subscriptions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage every user's subscription and usage.
        </p>
      </div>

      {/* Summary - Now with real data */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Summary
          title="All Subscriptions"
          value={stats.total.toLocaleString()}
        />

        <Summary
          title="Active"
          value={stats.active.toLocaleString()}
        />

        <Summary
          title="Expiring Soon"
          value={stats.expiringSoon.toLocaleString()}
        />

        <Summary
          title="Expired"
          value={stats.expired.toLocaleString()}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Customer Subscriptions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a customer to view complete account details.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-62.5"
              />
            </div>

            <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <SubscriptionTable search={search} subscriptions={subscriptions} />
      </div>
    </div>
  );
}

function Summary({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}