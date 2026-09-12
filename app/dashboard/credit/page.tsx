/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PhoneCall,
  History,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
  Info,
  ExternalLink,
} from "lucide-react";
import {
  useGetWalletBalanceQuery,
  useGetTransactionsQuery,
  useInitiateTopupMutation,
} from "@/app/redux/features/apis/walletApi";

export default function CreditPage() {
  const [activeTab, setActiveTab] = useState<"account" | "ip">("account");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("50");
  const [historyFilter, setHistoryFilter] = useState<string>("All");

  // Payment states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState<number>(0);
  const [bkashPopup, setBkashPopup] = useState<Window | null>(null);
  const [showTestInfo, setShowTestInfo] = useState<boolean>(true);
  const [bkashDirectUrl, setBkashDirectUrl] = useState<string | null>(null);
  const [popupCheckInterval, setPopupCheckInterval] = useState<NodeJS.Timeout | null>(null);

  const quickAmounts = [50, 100, 200, 500, 1000, 5000, 10000];

  // API Hooks
  const {
    data: walletData,
    isLoading: walletLoading,
    refetch: refetchWallet,
  } = useGetWalletBalanceQuery();

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useGetTransactionsQuery({ limit: 50 });

  const [initiateTopup, { isLoading: initiatingTopup }] =
    useInitiateTopupMutation();

  // Check URL params for payment status (from bKash callback)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const amount = params.get("amount");
    const error = params.get("error");

    if (success === "true" && amount) {
      setPaymentSuccess(true);
      setSuccessAmount(Number(amount));
      setPaymentError(null);

      // Refetch wallet and transactions
      refetchWallet();
      refetchTransactions();

      // Show success message
      setTimeout(() => {
        alert(`✅ Payment successful! ${Number(amount).toFixed(2)} TK added to your wallet.`);
        window.history.replaceState({}, "", "/credit");
        setPaymentSuccess(false);
      }, 1000);
    } else if (success === "false" && error) {
      setPaymentError(decodeURIComponent(error));
      setTimeout(() => {
        window.history.replaceState({}, "", "/credit");
      }, 500);
    }
  }, [refetchWallet, refetchTransactions]);

  // Clean up popup check interval
  useEffect(() => {
    return () => {
      if (popupCheckInterval) {
        clearInterval(popupCheckInterval);
      }
    };
  }, [popupCheckInterval]);

  // Check if bKash popup is closed
  useEffect(() => {
    if (bkashPopup) {
      const interval = setInterval(() => {
        if (bkashPopup.closed) {
          clearInterval(interval);
          setBkashPopup(null);
          setIsProcessing(false);
          // Refetch wallet data when popup closes
          refetchWallet();
          refetchTransactions();
        }
      }, 1000);
      
      setPopupCheckInterval(interval);

      return () => clearInterval(interval);
    }
  }, [bkashPopup, refetchWallet, refetchTransactions]);

  const handleQuickSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setSelectedAmount(Number(val) || 0);
  };

  // Handle bKash payment
// app/credit/page.tsx - শুধু handleBkashPayment ফাংশন আপডেট করুন

const handleBkashPayment = async () => {
  const amount = Number(customAmount);

  if (amount < 20) {
    setPaymentError("Minimum amount is 20 TK");
    return;
  }
  if (amount > 1000000) {
    setPaymentError("Maximum amount is 1,000,000 TK");
    return;
  }

  setIsProcessing(true);
  setPaymentError(null);
  setPaymentSuccess(false);
  setBkashDirectUrl(null);

  try {
    const result = await initiateTopup({ amount }).unwrap();

    console.log("📦 Payment Result:", result);

    if (result.success && result.bkashURL) {
      // Open the URL directly in a new tab (not popup)
      window.open(result.bkashURL, '_blank');
      
      // Show success message after 3 seconds (assuming payment will complete)
      setTimeout(() => {
        refetchWallet();
        refetchTransactions();
        setIsProcessing(false);
        setPaymentSuccess(true);
        setSuccessAmount(amount);
        alert(`✅ Payment initiated! ${amount.toFixed(2)} TK will be added to your wallet after confirmation.`);
      }, 3000);
      
      // Keep processing state until user closes the tab
      setIsProcessing(true);
      
    } else {
      setPaymentError(result.message || "Failed to create payment");
      setIsProcessing(false);
    }
  } catch (error: any) {
    console.error("❌ Payment error:", error);
    setPaymentError(
      error.data?.message || error.message || "Payment failed. Please try again."
    );
    setIsProcessing(false);
  }
};

  // Filter transactions
  const filterTags = [
    { value: "All", label: "All" },
    { value: "topup", label: "Deposits" },
    { value: "call_charge", label: "Usage" },
  ];

  const filteredTransactions =
    historyFilter === "All"
      ? transactionsData || []
      : (transactionsData || []).filter(
          (item: any) => item.type === historyFilter
        );

  // Calculate monthly stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = (transactionsData || []).filter((item: any) => {
    const date = new Date(item.created_at);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalAdded = monthlyTransactions
    .filter((item: any) => item.type === "topup")
    .reduce((sum: number, item: any) => sum + Number(item.amount), 0);

  const totalUsed = monthlyTransactions
    .filter((item: any) => item.type === "call_charge")
    .reduce((sum: number, item: any) => sum + Number(Math.abs(item.amount)), 0);

  return (
    <div className="space-y-6 mx-auto bg-slate-50 min-h-screen p-4 md:p-6 text-slate-800">
      {/* Top Banner Section */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary via-indigo-600 to-blue-700 p-6 md:p-8 shadow-md border border-blue-500/20 text-white">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-blue-100 text-xs md:text-sm font-semibold uppercase tracking-wider">
              <Wallet className="w-4 h-4" />
              <span>Current Credit</span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              {walletLoading ? (
                <div className="h-12 w-32 animate-pulse bg-white/20 rounded-lg" />
              ) : (
                <>
                  <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    {walletData?.balance?.toFixed(2) || "0.00"}
                  </span>
                  <span className="text-lg font-bold text-blue-100">
                    {walletData?.currency || "TK"}
                  </span>
                </>
              )}
            </div>
            {walletData?.ratePerMinute && (
              <p className="text-xs text-blue-200 mt-1">
                Rate: {walletData.ratePerMinute.toFixed(2)} TK/min
              </p>
            )}
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 min-w-35">
              <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Added • This Month</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">
                + {totalAdded.toFixed(2)} TK
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 min-w-35">
              <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Used • This Month</span>
              </div>
              <p className="text-lg font-bold text-white mt-1">
                - {totalUsed.toFixed(2)} TK
              </p>
            </div>
          </div>
        </div>
      </div>

      {paymentError && !bkashDirectUrl && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{paymentError}</span>
          <button
            onClick={() => setPaymentError(null)}
            className="ml-auto text-rose-700 hover:text-rose-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Direct bKash Link (when popup is blocked) */}
      {bkashDirectUrl && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-700 mb-2">
                Click the link below to complete your payment:
              </p>
              <a
                href={bkashDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline break-all hover:text-blue-800 text-sm"
                onClick={() => {
                  // Open in new tab and close the link UI
                  setTimeout(() => {
                    setBkashDirectUrl(null);
                    setPaymentError(null);
                    setIsProcessing(false);
                  }, 3000);
                }}
              >
                {bkashDirectUrl}
              </a>
              <button
                onClick={() => {
                  setBkashDirectUrl(null);
                  setPaymentError(null);
                  setIsProcessing(false);
                }}
                className="mt-2 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm flex flex-col">
          <div className="flex items-center space-x-2.5 mb-5 pb-4 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-blue-50 text-primary border border-blue-100">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-wide">
              Top Up Credit
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === "account"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  activeTab === "account" ? "opacity-100" : "opacity-0"
                }`}
              />
              <span>Credit to Account</span>
            </button>
            <button
              onClick={() => setActiveTab("ip")}
              disabled
              className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === "ip"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-400 cursor-not-allowed"
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Balance to IP Number</span>
            </button>
          </div>

          <div className="space-y-4 flex-1">
            <label className="text-xs font-semibold text-slate-700">
              Choose an amount
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickSelect(amt)}
                  className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold border transition-all ${
                    selectedAmount === amt
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-slate-700">
                Custom amount (20 - 1,000,000 TK)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="1000000"
                  value={customAmount}
                  onChange={handleCustomInputChange}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="Enter amount"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  TK
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Minimum 20 TK • Maximum 1,000,000 TK
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
            <button
              onClick={handleBkashPayment}
              disabled={isProcessing || initiatingTopup || !!bkashDirectUrl}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-primary/10 transition active:scale-[0.99] flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing || initiatingTopup ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Pay with bKash</span>
                </>
              )}
            </button>
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by bKash payment gateway</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm flex flex-col">
          <div className="flex items-center space-x-2.5 mb-5 pb-4 border-b border-slate-200">
            <div className="p-2 rounded-xl bg-blue-50 text-primary border border-blue-100">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-wide">
              Transaction History
            </h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
            {filterTags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setHistoryFilter(tag.value)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  historyFilter === tag.value
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-xl border border-slate-200 overflow-hidden bg-white flex flex-col">
            <div className="bg-primary px-4 py-3 grid grid-cols-12 text-xs font-bold text-white tracking-wide uppercase">
              <div className="col-span-5">Details</div>
              <div className="col-span-4">Activity</div>
              <div className="col-span-3 text-right">Amount</div>
            </div>

            {transactionsLoading ? (
              <div className="flex-1 py-16 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-xs text-slate-500 mt-2">Loading transactions...</p>
              </div>
            ) : filteredTransactions.length > 0 ? (
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-100">
                {filteredTransactions.map((item: any) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 grid grid-cols-12 text-xs items-center hover:bg-slate-50 transition"
                  >
                    <div className="col-span-5">
                      <p className="font-bold text-slate-900 truncate capitalize">
                        {item.reference_type || "System"}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.note || "Transaction"}
                      </p>
                    </div>
                    <div className="col-span-4 text-slate-600">
                      <p className="truncate capitalize">
                        {item.type === "topup" ? "Deposit" : "Call Usage"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div
                      className={`col-span-3 text-right font-mono font-bold ${
                        item.type === "topup" ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {item.type === "topup" ? "+" : "-"} ৳{" "}
                      {Math.abs(Number(item.amount)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 py-16 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-3">
                  <History className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  No transactions found.
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Your transactions will appear here after you make a payment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}