/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  User,
  Mail,
  Smartphone,
  Key,
  Save,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  RefreshCw,
  Clock,
  Layers,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { authHeaders } from "@/app/lib/authToken";
import PageHeader from "../components/PageHeader";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

interface IpcallSettings {
  hasApiKey: boolean;
  maskedApiKey: string;
  delaySeconds: number;
  maxBatchSize: number;
  updatedAt: string | null;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [maskedApiKey, setMaskedApiKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(38);
  const [maxBatchSize, setMaxBatchSize] = useState(20);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [keySaving, setKeySaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // ✅ FIX: /api prefix added
      const profileRes = await fetch(`${API_BASE}/auth/me`, {
        cache: "no-store",
        credentials: "include",
        headers: authHeaders(),
      });
      const profileJson = await profileRes.json();
      if (profileRes.ok && profileJson.success && profileJson.data) {
        setProfile({
          name: profileJson.data.name || "",
          email: profileJson.data.email || "",
          phone: profileJson.data.phone || "",
        });
      }

      // ✅ FIX: /api prefix added
      const keyRes = await fetch(`${API_BASE}/admin/settings/ipcall`, {
        cache: "no-store",
        credentials: "include",
        headers: authHeaders(),
      });
      const keyJson = await keyRes.json();
      if (keyRes.ok && keyJson.success && keyJson.data) {
        const d: IpcallSettings = keyJson.data;
        setHasApiKey(d.hasApiKey);
        setMaskedApiKey(d.maskedApiKey);
        setDelaySeconds(d.delaySeconds);
        setMaxBatchSize(d.maxBatchSize);
        setUpdatedAt(d.updatedAt);
      }
    } catch (err: any) {
      console.error("load error:", err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ============================================
  // Save Profile
  // ============================================

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile.name.trim()) return toast.error("Please enter your name");
    if (!profile.email.trim()) return toast.error("Please enter your email");

    setProfileSaving(true);
    try {
      const res = await fetch(`${API_BASE}/auth/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify(profile),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  // ============================================
  // Save API Key Settings
  // ============================================
  const handleApiKeySave = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeySaving(true);

    try {
      const body: any = {
        delaySeconds,
        maxBatchSize,
      };

      if (apiKey.trim()) {
        if (apiKey.trim().length < 20) {
          throw new Error("API key looks too short");
        }
        body.apiKey = apiKey.trim();
      }

      const res = await fetch(`${API_BASE}/admin/settings/ipcall`, {
        method: "PUT",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save settings");
      }

      toast.success("API settings saved!");
      setApiKey("");
      setShowKey(false);
      await load();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save settings");
    } finally {
      setKeySaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <PageHeader
        title="Settings"
        description="Manage your profile and IPCall API configuration."
      />

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin inline text-slate-400" />
        </div>
      ) : (
        <>
          {/* ==========================================
              PROFILE CARD
          ========================================== */}
          <form
            onSubmit={handleProfileSave}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <CardHeader
              icon={<User className="h-5 w-5" />}
              title="Profile"
              description="Your personal information."
            />

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  value={profile.name}
                  onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
                  placeholder="Your name"
                  icon={<User className="h-4 w-4" />}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                  placeholder="you@example.com"
                  icon={<Mail className="h-4 w-4" />}
                />

                <InputField
                  label="Phone Number"
                  value={profile.phone}
                  onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
                  placeholder="01XXXXXXXXX"
                  icon={<Smartphone className="h-4 w-4" />}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition disabled:opacity-60"
                >
                  {profileSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* ==========================================
              API KEY CARD
          ========================================== */}
          <form
            onSubmit={handleApiKeySave}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <CardHeader
              icon={<Key className="h-5 w-5" />}
              title="IPCall API Configuration"
              description="Your secret API credentials for voice calling."
            />

            <div className="p-5 sm:p-6 space-y-6">
              {/* Warning if no key */}
              {!hasApiKey && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">
                      No API key configured
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Voice calls won&apos;t work until you add your IPCall API
                      key below.
                    </p>
                  </div>
                </div>
              )}

              {/* Current masked key */}
              {hasApiKey && (
                <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span className="font-mono text-sm text-slate-600">
                      Current:{" "}
                      <span className="font-bold text-slate-800">
                        {maskedApiKey}
                      </span>
                    </span>
                  </div>
                  {updatedAt && (
                    <span className="text-xs text-slate-400">
                      Updated {new Date(updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}

              {/* API Key input */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  API Key
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Key className="h-4 w-4" />
                  </div>

                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={
                      hasApiKey
                        ? "Enter new key to replace (leave blank to keep)"
                        : "Paste your IPCall API key here"
                    }
                    autoComplete="off"
                    className="h-11 w-full pl-10 pr-12 rounded-xl border border-slate-200 bg-white text-sm font-mono text-slate-900 outline-none transition placeholder:text-slate-400 placeholder:font-sans focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowKey((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                    tabIndex={-1}
                  >
                    {showKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  🔒 Encrypted in database and never shown to the browser.
                </p>
              </div>

              {/* Delay + Batch Size */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 pt-2 border-t border-slate-100">
                <div className="pt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Delay Between Calls (Seconds)
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={600}
                      value={delaySeconds}
                      onChange={(e) => setDelaySeconds(Number(e.target.value))}
                      className="h-11 w-full pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Time to wait before next call request.
                  </p>
                </div>

                <div className="pt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Maximum Batch Size
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Layers className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={maxBatchSize}
                      onChange={(e) => setMaxBatchSize(Number(e.target.value))}
                      className="h-11 w-full pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Numbers queued at once. Recommended: 20.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={keySaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
                >
                  {keySaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save API Settings
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={load}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reload
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function CardHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-5 sm:px-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}
