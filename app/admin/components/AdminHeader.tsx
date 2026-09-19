"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Wallet,
  Loader2,
  ShieldCheck,
  Building,
} from "lucide-react";
import { useGetWalletBalanceQuery } from "@/app/redux/features/apis/walletApi";
import { authHeaders, clearAuth } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ============================================
// Types
// ============================================
interface MeData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  company_id: number;
  company_name: string;
}

// ============================================
// Main Component
// ============================================
export default function AdminHeader() {
  const router = useRouter();
  const [me, setMe] = useState<MeData | null>(null);
  const [meLoading, setMeLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ============================================
  // Wallet balance
  // ============================================
  const { data: walletData, isLoading: walletLoading, refetch } =
    useGetWalletBalanceQuery();

  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // ============================================
  // Fetch current user
  // ============================================
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          cache: "no-store",
          credentials: "include",
          headers: authHeaders(),
        });
        const json = await res.json();

        if (mounted && res.ok && json.success && json.data) {
          setMe(json.data);
        } else if (res.status === 401) {
          router.push("/login");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        if (mounted) setMeLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  // ============================================
  // Click outside to close dropdown
  // ============================================
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================================
  // Logout
  // ============================================
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(),
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuth();
      router.push("/login");
      router.refresh();
    }
  };

  // ============================================
  // Helpers
  // ============================================
  const getRoleLabel = (role: string) => {
    if (role === "super_admin") return "Super Admin";
    if (role === "admin") return "Admin";
    if (role === "user") return "User";
    return role || "—";
  };

  const getRoleBadge = (role: string) => {
    if (role === "super_admin")
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    if (role === "admin")
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  const userInitial = me?.name?.charAt(0)?.toUpperCase() || "A";
  const balance = walletData?.balance || 0;
  const currency = walletData?.currency || "BDT";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-700/80 bg-[#1e293b] px-4 sm:px-6">
      {/* Left: Title */}
      <div className="pl-12 lg:pl-0">
        <h2 className="text-lg font-bold text-white">
          {meLoading ? (
            <span className="inline-block h-5 w-32 bg-slate-700 rounded animate-pulse" />
          ) : (
            getRoleLabel(me?.role || "Super Admin")
          )}
        </h2>

        <p className="hidden text-xs text-slate-400 sm:block">
          Manage subscriptions, users and platform activity
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Wallet Balance */}
        <div className="hidden sm:flex rounded-full border border-slate-700/80 bg-slate-900 px-4 py-2 text-xs items-center gap-2">
          <Wallet className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Balance:</span>
          {walletLoading ? (
            <Loader2 className="w-3 h-3 animate-spin text-slate-500" />
          ) : (
            <span className="font-bold text-emerald-400">
              {currency}{" "}
              {Number(balance).toLocaleString("en-BD", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>

        {/* Notification Bell */}
        {/* <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900 text-slate-300 hover:bg-slate-800 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button> */}

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((s) => !s)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-800/60 transition"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shrink-0">
              {meLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                userInitial
              )}
            </div>

            {/* Name + Role */}
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-white truncate max-w-[120px]">
                {meLoading ? "Loading..." : me?.name || "User"}
              </p>
              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                {meLoading ? "..." : getRoleLabel(me?.role || "")}
              </p>
            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu — dark theme */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-700/80 bg-[#1e293b] shadow-xl shadow-slate-950/40 overflow-hidden z-50">
              {/* Header with user info */}
              <div className="px-4 py-3 border-b border-slate-700/80">
                <p className="text-sm font-bold text-white truncate">
                  {me?.name || "User"}
                </p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {me?.email || ""}
                </p>

                {/* Role badge */}
                {me?.role && (
                  <span
                    className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getRoleBadge(
                      me.role
                    )}`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {getRoleLabel(me.role)}
                  </span>
                )}

                {/* Company name */}
                {me?.company_name && (
                  <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
                    <Building className="w-3 h-3" />
                    <span className="truncate">{me.company_name}</span>
                  </div>
                )}
              </div>

              {/* Menu items */}
              <div className="p-1.5 space-y-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>View Profile</span>
                </Link>

                <Link
                  href="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </Link>
              </div>

              {/* Logout */}
              <div className="p-1.5 border-t border-slate-700/80">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}