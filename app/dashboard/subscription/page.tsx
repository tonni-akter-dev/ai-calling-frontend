/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Crown,  AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  useGetPlansQuery,
  useGetMySubscriptionQuery,
  useInitiateSubscriptionMutation,
} from "@/app/redux/features/apis/subscriptionApi";

interface Plan {
  id: number;
  name: string;
  price_bdt: number;
  monthly_call_limit: number;
  max_concurrent_calls: number;
  is_active: boolean;
}

interface Subscription {
  id: number;
  plan_name: string;
  price_bdt: number;
  monthly_call_limit: number;
  max_concurrent_calls: number;
  status: string;
  calls_used_this_period: number;
  current_period_start: string;
  current_period_end: string;
}

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isInitiating, setIsInitiating] = useState(false);

  // Fetch plans
  const { data: plans = [], isLoading: plansLoading } = useGetPlansQuery({});
  
  // Fetch current subscription
  const { 
    data: subscription, 
    isLoading: subLoading,
    refetch: refetchSubscription 
  } = useGetMySubscriptionQuery({});

  const [initiateSubscription] = useInitiateSubscriptionMutation();

  const isLoading = plansLoading || subLoading;

  // Check if user has active subscription
  const hasActiveSubscription = subscription?.status === 'active' && 
    new Date(subscription.current_period_end) > new Date();

  // Handle subscription initiation
  const handleSubscribe = async (planId: number) => {
    if (hasActiveSubscription) {
      toast.error("You already have an active subscription");
      return;
    }

    setIsInitiating(true);
    try {
      const result = await initiateSubscription({ planId }).unwrap();
      toast.success(result.message || "Subscription activated successfully!");
      await refetchSubscription();
      setSelectedPlan(null);
      
      // Redirect to dashboard after successful subscription
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to activate subscription");
    } finally {
      setIsInitiating(false);
    }
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

  // Calculate days left
  const getDaysLeft = (endDate: string) => {
    try {
      const now = new Date();
      const expiry = new Date(endDate);
      const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysLeft > 0 ? daysLeft : 0;
    } catch {
      return 0;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-125">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-slate-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  // If user has active subscription, show current plan
  if (hasActiveSubscription && subscription) {
    const daysLeft = getDaysLeft(subscription.current_period_end);
    const usagePercentage = subscription.monthly_call_limit > 0 
      ? Math.round((subscription.calls_used_this_period / subscription.monthly_call_limit) * 100)
      : 0;

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Subscription</h1>
          <p className="mt-1 text-sm text-slate-500">
            You are currently subscribed to the {subscription.plan_name} plan
          </p>
        </div>

        {/* Active Subscription Card */}
        <div className="bg-linear-to-r from-primary to-indigo-600 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-semibold text-blue-100">Active Plan</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">{subscription.plan_name}</h2>
              <p className="text-blue-100 text-sm mt-1">
                ৳{subscription.price_bdt.toLocaleString()}/month
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-sm font-semibold">{daysLeft} Days Left</p>
              <p className="text-xs text-blue-100">Until renewal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-sm text-blue-100">Calls Used</p>
              <p className="text-xl font-bold">
                {subscription.calls_used_this_period.toLocaleString()} / {subscription.monthly_call_limit.toLocaleString()}
              </p>
              <div className="mt-2 h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    usagePercentage > 90 ? 'bg-red-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-blue-100">Max Concurrent Calls</p>
              <p className="text-xl font-bold">{subscription.max_concurrent_calls}</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Renewal Date</p>
              <p className="text-xl font-bold">{formatDate(subscription.current_period_end)}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20 flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-primary px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => toast.info("Upgrade feature coming soon")}
              className="bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/30 transition backdrop-blur"
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900">Usage Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Calls Used</p>
              <p className="text-lg font-bold text-slate-900">{subscription.calls_used_this_period.toLocaleString()}</p>
              <p className="text-xs text-slate-500">of {subscription.monthly_call_limit.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Concurrent Calls</p>
              <p className="text-lg font-bold text-slate-900">{subscription.max_concurrent_calls}</p>
              <p className="text-xs text-slate-500">Maximum allowed</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Days Remaining</p>
              <p className="text-lg font-bold text-slate-900">{daysLeft} days</p>
              <p className="text-xs text-slate-500">Until {formatDate(subscription.current_period_end)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show pricing plans if no active subscription
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Choose Your Plan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Select a plan that fits your business needs. All plans include a free corporate IP number.
        </p>
        {subscription && subscription.status === 'expired' && (
          <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Your previous subscription has expired. Please choose a new plan to continue.
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan: Plan) => {
          const isPopular = plan.name === "Pro";
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 ${
                isPopular
                  ? "bg-[#0b1329] text-white shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/40 md:-translate-y-2 py-10 z-10"
                  : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Most Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="flex-1">
                {/* Plan Header */}
                <h3 className={`text-base font-semibold ${isPopular ? "text-slate-200" : "text-slate-600"}`}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2 flex items-baseline">
                  <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    ৳{plan.price_bdt.toLocaleString()}
                  </span>
                  <span className={`text-xs ml-1 font-medium ${isPopular ? "text-slate-400" : "text-slate-500"}`}>
                    /mo
                  </span>
                </div>

                {/* Subtitle */}
                <p className={`text-xs pb-6 mb-6 border-b ${isPopular ? "text-slate-400 border-slate-800" : "text-slate-400 border-slate-100"}`}>
                  {plan.monthly_call_limit.toLocaleString()} calls per month
                </p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-xs md:text-sm font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 shrink-0 ${isPopular ? "bg-blue-500 text-slate-950" : "bg-primary text-white"}`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className={isPopular ? "text-slate-200" : "text-slate-700"}>
                      {plan.monthly_call_limit.toLocaleString()} Call Minutes
                    </span>
                  </li>
                  <li className="flex items-center text-xs md:text-sm font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 shrink-0 ${isPopular ? "bg-blue-500 text-slate-950" : "bg-primary text-white"}`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className={isPopular ? "text-slate-200" : "text-slate-700"}>
                      {plan.max_concurrent_calls} Concurrent Calls
                    </span>
                  </li>
                  <li className="flex items-center text-xs md:text-sm font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 shrink-0 ${isPopular ? "bg-blue-500 text-slate-950" : "bg-primary text-white"}`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className={isPopular ? "text-slate-200" : "text-slate-700"}>
                      Free Corporate IP Number
                    </span>
                  </li>
                  <li className="flex items-center text-xs md:text-sm font-medium">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 shrink-0 ${isPopular ? "bg-blue-500 text-slate-950" : "bg-primary text-white"}`}>
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className={isPopular ? "text-slate-200" : "text-slate-700"}>
                      IVR / PBX System
                    </span>
                  </li>
                  {plan.name === "Pro" && (
                    <li className="flex items-center text-xs md:text-sm font-medium">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mr-3 shrink-0 bg-blue-500 text-slate-950">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-200">Call Transfer & Forwarding</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isInitiating || hasActiveSubscription}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isPopular
                    ? "bg-primary hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white border-2 border-primary text-primary hover:bg-blue-50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isInitiating && selectedPlan === plan.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Activating...
                  </span>
                ) : hasActiveSubscription ? (
                  "Already Subscribed"
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}