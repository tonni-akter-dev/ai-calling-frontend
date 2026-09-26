'use client';

import { useForgotPasswordMutation } from "@/app/redux/features/apis/auth-api";
import Link from "next/link";
import React, { useState } from "react";

/* ---------------- Icons ---------------- */
const MailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </svg>
);

const ArrowLeftIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Spinner = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

/* ---------------- Types ---------------- */
interface ResetData {
  email: string;
  resetUrl: string;
  expiresInMinutes: number;
}

/* ---------------- Page ---------------- */
const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");
  const [resetData, setResetData] = useState<ResetData | null>(null);

  const [forgotPassword, { isLoading, error, reset }] = useForgotPasswordMutation();

  const apiError = error as { data?: { message?: string; error?: string } } | undefined;
  const serverError =
    apiError?.data?.message ||
    apiError?.data?.error ||
    (error ? "Something went wrong. Please try again." : "");

  const validate = (): string => {
    const value = email.trim();
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = validate();
    setFieldError(v);
    if (v) return;

    try {
      const response = await forgotPassword({
        data: { email: email.trim().toLowerCase() },
      }).unwrap();

      setResetData({
        email: email.trim().toLowerCase(),
        resetUrl: response.resetUrl,
        expiresInMinutes: response.expiresInMinutes || 30,
      });
    } catch {
      // Error handled via RTK Query state
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070d1e] px-4 py-10 relative overflow-hidden">
      {/* soft background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-[#0b1224] shadow-2xl shadow-black/50">
          <div className="p-8 sm:p-10">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
              <LockIcon />
            </div>

            {resetData ? (
              /* ---------------- SUCCESS + LINK SHOWN HERE ---------------- */
              <div className="text-center">
               
                <h1 className="text-2xl font-semibold tracking-tight text-white">Reset link ready</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Account peye gechi <span className="font-medium text-slate-200">{resetData.email}</span> er jonno.
                  Niche button e click kore notun password set korun.
                </p>

                {/* BIG RESET BUTTON (Using <a> because resetUrl is an absolute URL) */}
                <a
                  href={resetData.resetUrl}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0b1224]"
                >
                  Set New Password
                  <ArrowRightIcon />
                </a>

                {/* Expiry note */}
                <div className="mt-4 rounded-xl bg-amber-500/10 p-3.5 ring-1 ring-amber-500/20">
                  <p className="text-xs leading-relaxed text-amber-400">
                    This link is valid for <strong>{resetData.expiresInMinutes} minute</strong>
                  </p>
                </div>
              </div>
            ) : (
              /* ---------------- FORM STATE ---------------- */
              <>
                <div className="text-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">Forgot your password?</h1>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Account er email din, sathe sathe reset link peye jaben.
                  </p>
                </div>

                {serverError && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">
                    <AlertIcon className="mt-0.5 w-5 h-5 shrink-0 text-red-400" />
                    <p className="text-sm leading-relaxed text-red-400">{serverError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                      Email address
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                        <MailIcon />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                          if (fieldError) setFieldError("");
                          if (serverError) reset();
                        }}
                        aria-invalid={Boolean(fieldError)}
                        className={`w-full rounded-xl border bg-[#070d1e] py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 shadow-sm transition
                          focus:outline-none focus:ring-2 focus:ring-offset-0
                          ${
                            fieldError
                              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                              : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                          }`}
                      />
                    </div>
                    {fieldError && (
                      <p className="mt-1.5 text-xs font-medium text-red-400">{fieldError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition
                      hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0b1224]
                      disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        Link toiri hocche…
                      </>
                    ) : (
                      "Get reset link"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-800 px-8 py-5 sm:px-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-indigo-400"
            >
              <ArrowLeftIcon />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;