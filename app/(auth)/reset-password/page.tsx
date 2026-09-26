'use client';

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useValidateResetTokenQuery,
  useResetPasswordMutation,
} from "@/app/redux/features/apis/auth-api";

/* ---------------- Icons ---------------- */
const LockIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
);

const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const AlertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </svg>
);

const Spinner = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

/* ---------------- Password Rules ---------------- */
interface Rule {
  key: string;
  label: string;
  test: (v: string) => boolean;
}

const RULES: Rule[] = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { key: "lower", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { key: "number", label: "One number", test: (v) => /\d/.test(v) },
];

const strengthMeta = (score: number) => {
  if (score <= 1) return { label: "Weak", color: "bg-red-500", text: "text-red-400", width: "w-1/4" };
  if (score === 2) return { label: "Fair", color: "bg-amber-500", text: "text-amber-400", width: "w-2/4" };
  if (score === 3) return { label: "Good", color: "bg-sky-500", text: "text-sky-400", width: "w-3/4" };
  return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-400", width: "w-full" };
};

/* ---------------- Layout Shell ---------------- */
// Fixed: Renamed from `div` to `Shell`. You cannot use `div` as a component name.
const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#070d1e] px-4 py-10 relative overflow-hidden">
    {/* soft background accents */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
    
    <div className="relative w-full max-w-md">{children}</div>
  </div>
);

/* ---------------- Page Component ---------------- */
const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirm?: string }>({});
  const [done, setDone] = useState(false);

  // 1. Validate the token on mount
  const { data: tokenCheck, isLoading: isChecking } = useValidateResetTokenQuery(
    { token },
    { skip: !token }
  );

  // 2. Reset password mutation
  const [resetPassword, { isLoading: isSaving, error, reset }] = useResetPasswordMutation();
  
  const apiError = error as { data?: { error?: string; message?: string } } | undefined;
  const serverError =
    apiError?.data?.error || apiError?.data?.message || (error ? "Something went wrong. Please try again." : "");

  const passed = useMemo(
    () => RULES.filter((r) => r.test(password)).length,
    [password]
  );
  const meta = strengthMeta(passed);

  const validate = () => {
    const errs: { password?: string; confirm?: string } = {};
    if (!password) errs.password = "Password is required";
    else if (passed < RULES.length) errs.password = "Password doesn't meet all requirements";
    if (!confirm) errs.confirm = "Please confirm your password";
    else if (confirm !== password) errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      await resetPassword({ data: { token, password } }).unwrap();
      setDone(true);
      setTimeout(() => router.push("/login"), 2500); 
    } catch {
      /* error shown via `error` */
    }
  };

  /* ---------- No Token ---------- */
  if (!token) {
    return (
      <Shell>
        <div className="rounded-2xl border border-slate-800 bg-[#0b1224] p-8 text-center shadow-2xl shadow-black/50 sm:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
            <AlertIcon className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-semibold text-white">Missing reset token</h1>
          <p className="mt-2 text-sm text-slate-400">
            Ei page ta valid reset link chara kaj kore na. Notun link request korun.
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-block w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Request a new link
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---------- Validating Token ---------- */
  if (isChecking) {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-[#0b1224] p-12 shadow-2xl shadow-black/50">
          <Spinner className="w-7 h-7 text-indigo-400" />
          <p className="text-sm text-slate-400">Verifying your reset link…</p>
        </div>
      </Shell>
    );
  }

  /* ---------- Invalid / Expired Token ---------- */
  if (tokenCheck && !tokenCheck.valid) {
    return (
      <Shell>
        <div className="rounded-2xl border border-slate-800 bg-[#0b1224] p-8 text-center shadow-2xl shadow-black/50 sm:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
            <AlertIcon className="w-7 h-7" />
          </div>
          {/* Fixed: Escaped apostrophe */}
          <h1 className="text-xl font-semibold text-white">{"Link can't be used"}</h1>
          <p className="mt-2 text-sm text-slate-400">
            {tokenCheck.error || "Ei reset link ta invalid ba expire hoye geche."}
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-block w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Request a new link
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---------- Success ---------- */
  if (done) {
    return (
      <Shell>
        <div className="rounded-2xl border border-slate-800 bg-[#0b1224] p-8 text-center shadow-2xl shadow-black/50 sm:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            <CheckIcon className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-semibold text-white">Password updated!</h1>
          <p className="mt-2 text-sm text-slate-400">
            Apnar password successfully change hoye geche. Login page e redirect hocche…
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Go to sign in
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---------- Form ---------- */
  return (
    <Shell>
      <div className="rounded-2xl border border-slate-800 bg-[#0b1224] shadow-2xl shadow-black/50">
        <div className="p-8 sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
            <LockIcon />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Set a new password</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Notun ekta strong password din.
            </p>
          </div>

          {serverError && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">
              <AlertIcon className="mt-0.5 w-5 h-5 shrink-0 text-red-400" />
              <p className="text-sm leading-relaxed text-red-400">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  autoFocus
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
                    if (serverError) reset();
                  }}
                  className={`w-full rounded-xl border bg-[#070d1e] py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 shadow-sm transition
                    focus:outline-none focus:ring-2
                    ${
                      fieldErrors.password
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 transition hover:text-slate-300"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {password && (
                <div className="mt-2.5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className={`h-full rounded-full transition-all duration-300 ${meta.color} ${meta.width}`} />
                  </div>
                  <p className={`mt-1.5 text-xs font-medium ${meta.text}`}>Strength: {meta.label}</p>
                </div>
              )}

              <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {RULES.map((rule) => {
                  const ok = rule.test(password);
                  return (
                    <li
                      key={rule.key}
                      className={`flex items-center gap-1.5 text-xs ${
                        ok ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full ${
                          ok ? "bg-emerald-500/20" : "bg-slate-800"
                        }`}
                      >
                        {ok && <CheckIcon className="w-3 h-3" />}
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>

              {fieldErrors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-slate-300">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirm(e.target.value);
                    if (fieldErrors.confirm) setFieldErrors((p) => ({ ...p, confirm: "" }));
                  }}
                  className={`w-full rounded-xl border bg-[#070d1e] py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 shadow-sm transition
                    focus:outline-none focus:ring-2
                    ${
                      fieldErrors.confirm
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 transition hover:text-slate-300"
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {fieldErrors.confirm && (
                <p className="mt-1.5 text-xs font-medium text-red-400">{fieldErrors.confirm}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition
                hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0b1224]
                disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Spinner />
                  Updating password…
                </>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </div>

        <div className="border-t border-slate-800 px-8 py-5 sm:px-10">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-400 transition hover:text-indigo-400"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </Shell>
  );
};

export default ResetPassword;