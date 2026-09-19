/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building,
  Save,
  Camera,
  Loader2,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { authHeaders } from "@/app/lib/authToken";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface MeData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  company_id: number;
  company_name: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [role, setRole] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // ============================================
  // Fetch current user
  // ============================================
  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        cache: "no-store",
        credentials: "include",
        headers: authHeaders(),
      });

      const json = await res.json();

      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.message || "Failed to load profile");
      }

      const me: MeData = json.data;
      setFormData({
        name: me.name || "",
        email: me.email || "",
        phone: me.phone || "",
        company: me.company_name || "",
      });
      setRole(me.role || "");
    } catch (err: any) {
      console.error("loadProfile error:", err.message);
      toast.error(err?.message || "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ============================================
  // Handle input change
  // ============================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================
  // 🆕 LOGOUT — direct in this file
  // ============================================
  const handleLogout = () => {
    // Remove cookies
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("user", { path: "/" });

    toast.success("Logged out successfully");
    router.push("/login");
  };

  // ============================================
  // Submit — update profile
  // ============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Please enter your name");
    if (!formData.company.trim())
      return toast.error("Please enter your company name");

    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/auth/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim() || null,
          company_name: formData.company.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update profile");
      }

      if (json.data) {
        setFormData({
          name: json.data.name || "",
          email: json.data.email || "",
          phone: json.data.phone || "",
          company: json.data.company_name || "",
        });
      }

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("updateProfile error:", err.message);
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================
  // Helpers
  // ============================================
  const getRoleLabel = (r: string) => {
    if (r === "super_admin") return "Super Admin";
    if (r === "admin") return "Admin";
    if (r === "user") return "User";
    return r || "—";
  };

  const getRoleBadge = (r: string) => {
    if (r === "super_admin")
      return "bg-purple-100 text-purple-700 border-purple-200";
    if (r === "admin") return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  const initial = formData.name?.charAt(0)?.toUpperCase() || "U";

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Update your personal information and account details.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin inline text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update your personal information and account details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header with Avatar */}
        <div className="relative bg-linear-to-r from-primary to-indigo-600 px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/30">
                <span className="text-3xl font-bold text-white">{initial}</span>
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-md hover:bg-slate-50 transition-colors"
                title="Change avatar (coming soon)"
              >
                <Camera className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-white truncate">
                {formData.name || "User"}
              </h2>
              <p className="text-blue-100 text-sm truncate">{formData.email}</p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                {role && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getRoleBadge(
                      role,
                    )}`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {getRoleLabel(role)}
                  </span>
                )}

                {formData.company && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/10 backdrop-blur border border-white/20 text-white">
                    <Building className="w-3 h-3" />
                    {formData.company}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-60"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email — read only */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-500 outline-none cursor-not-allowed"
                  title="Email cannot be changed"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Email is used for login and cannot be changed.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-60"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-60"
                  placeholder="Enter your company name"
                />
              </div>
            </div>
          </div>

          {/* Role — read only */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Designation / Role
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={getRoleLabel(role)}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-500 outline-none cursor-not-allowed"
                title="Role cannot be changed"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Role is managed by the platform administrator.
            </p>
          </div>

          {/* Submit */}
          <div className="border-t border-slate-200 pt-6 flex items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Changes are saved to your account immediately.
            </p>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 🆕 Logout Card */}
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-200">
              <LogOut className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Sign Out</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                You will be logged out from this device and redirected to login.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
