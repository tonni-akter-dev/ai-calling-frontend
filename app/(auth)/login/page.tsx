/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useLoginMutation } from "@/app/redux/features/apis/auth-api";


export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.username.trim()) {
    toast.error("Please enter your username or email.");
    return;
  }

  if (!formData.password) {
    toast.error("Please enter your password.");
    return;
  }

  try {
    const response = await login({
      data: {
        email: formData.username.trim(),
        password: formData.password,
      },
    }).unwrap();

    console.log("Login response:", response);

    if (response?.token) {
      Cookies.set("accessToken", response.token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (response?.user) {
      Cookies.set("user", JSON.stringify(response.user), {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    toast.success(response?.message || "Login successful!");

    const userRole = response?.user?.role;

    if (userRole === "super_admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (error: any) {
    // 🔍 Full error console এ দেখুন
    console.error("Login error (full):", error);
    console.error("Error status:", error?.status);
    console.error("Error data:", error?.data);

    // 🎯 Error message extract করার improved logic
    let errorMessage = "Invalid email or password.";

    if (typeof error === "string") {
      errorMessage = error;
    } else if (error?.data) {
      // Backend response body থেকে message নিন
      errorMessage =
        error.data.error ||
        error.data.message ||
        error.data.msg ||
        error.data.errors?.[0]?.message ||
        (typeof error.data === "string" ? error.data : null) ||
        errorMessage;
    } else if (error?.error) {
      // RTK Query network/FETCH_ERROR
      errorMessage =
        error.error === "FETCH_ERROR"
          ? "Cannot connect to server. Please check your internet or backend."
          : error.error === "TIMEOUT_ERROR"
          ? "Request timeout. Server is not responding."
          : error.error === "PARSING_ERROR"
          ? "Server returned invalid response."
          : error.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    // Status code অনুযায়ী custom message
    if (error?.status === 401) {
      errorMessage = errorMessage || "Invalid credentials. Please try again.";
    } else if (error?.status === 500) {
      errorMessage =
        errorMessage || "Server error. Please try again later.";
    } else if (error?.status === "FETCH_ERROR") {
      errorMessage =
        "⚠️ Cannot reach backend. Check your API URL / CORS / Node app status.";
    }

    toast.error(errorMessage, {
      duration: 5000, 
    });
  }
};

  return (
    <div className="min-h-screen w-full bg-[#070d1e] flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased">

      {/* ==========================================
          BACKGROUND AMBIENT GLOWS
      ========================================== */}

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ==========================================
          MAIN LOGIN CARD
      ========================================== */}

      <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative z-10">

        {/* ========================================
            HEADER
        ========================================= */}

        <div className="bg-linear-to-r from-primary to-indigo-600 px-8 py-8 text-center text-white relative">

          <div
            className="absolute inset-x-0 bottom-0 h-4 bg-[#0f172a]"
            style={{
              clipPath: "ellipse(75% 100% at 50% 100%)",
            }}
          />

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">
            Welcome to{" "}
            <span className="text-orange-400">
              AI Call BD
            </span>
          </h1>

          <p className="text-blue-100 text-xs md:text-sm font-medium opacity-90">
            Admin Login to AI Call BD Dashboard
          </p>
        </div>

        {/* ========================================
            FORM BODY
        ========================================= */}

        <div className="p-8 pt-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ====================================
                USERNAME / EMAIL
            ==================================== */}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Username{" "}
                <span className="text-rose-500">
                  *
                </span>
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>

                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />

              </div>
            </div>

            {/* ====================================
                PASSWORD
            ==================================== */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="block text-xs font-semibold text-slate-300">
                  Password{" "}
                  <span className="text-rose-500">
                    *
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition font-medium"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>

              </div>
            </div>

            {/* ====================================
                LOGIN BUTTON
            ==================================== */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-primary to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-bold transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 mt-2"
            >

              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    LOGGING IN...
                  </span>
                </>
              ) : (
                <>
                  <span>LOGIN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}

            </button>

          </form>

          {/* ========================================
              FOOTER
          ========================================= */}

          <div className="mt-8 text-center border-t border-slate-800/80 pt-5">

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition font-medium inline-flex items-center space-x-1"
            >
              <span>
                ← Back to main website
              </span>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}