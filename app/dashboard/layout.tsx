"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PhoneCall,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Phone,
  FileAudio,
  ListOrdered,
  Headphones,
  Wallet,
  History,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { ReduxProvider } from "../redux/Providers";
import { Toaster } from "sonner";
import { useGetWalletBalanceQuery } from "@/app/redux/features/apis/walletApi";
import { authHeaders } from "@/app/lib/authToken";

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
// User Info Component
// ============================================
function UserInfo({ me }: { me: MeData | null }) {
  if (!me) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse" />
        <div className="hidden md:block">
          <div className="h-3 w-20 bg-slate-700 rounded animate-pulse" />
          <div className="h-2 w-24 bg-slate-700 rounded animate-pulse mt-1" />
        </div>
      </div>
    );
  }

  const initial = me.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-blue-400/30">
        {initial}
      </div>
      <div className="hidden md:block text-left">
        <p className="text-xs font-bold text-white truncate max-w-25">
          {me.name}
        </p>
        <p className="text-[10px] text-slate-400 truncate max-w-25">
          {me.email}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Balance Display
// ============================================
function BalanceDisplay() {
  const { data: walletData, isLoading, refetch } = useGetWalletBalanceQuery();

  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs">
        <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />
        <span className="text-slate-400 font-medium">Balance:</span>
        <span className="text-emerald-400 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  const balance = walletData?.balance || 0;
  const currency = walletData?.currency || "BDT";

  return (
    <div className="hidden sm:flex items-center space-x-3">
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs">
        <Wallet className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-slate-400 font-medium">Balance:</span>
        <span className="text-emerald-400 font-bold">
          {currency} {balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

// ============================================
// Main Layout
// ============================================
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [me, setMe] = useState<MeData | null>(null);
  const [meLoading, setMeLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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
          // Not logged in → redirect
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
  // Click outside handlers
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
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
      // Clear cookies
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      router.push("/login");
    }
  };

  // ============================================
  // Navigation
  // ============================================
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Contact", href: "/dashboard/manage-contacts", icon: Users },
    { name: "Send Voice Call", href: "/dashboard/voice-call", icon: PhoneCall },
    { name: "Calls History", href: "/dashboard/calls-history", icon: History },
    {
      name: "Manage Voice File",
      href: "/dashboard/manage-voice-file",
      icon: FileAudio,
    },
    {
      name: "All Call Logs",
      href: "/dashboard/all-call-logs",
      icon: ListOrdered,
    },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Credit", href: "/dashboard/credit", icon: Wallet },
    {
      name: "Support Ticket",
      href: "/dashboard/support-ticket",
      icon: Headphones,
    },
  ];

  const currentPage =
    navigation.find((n) => n.href === pathname)?.name || "Dashboard";

  // Role display
  const getRoleLabel = (role: string) => {
    if (role === "super_admin") return "Super Admin";
    if (role === "admin") return "Admin";
    if (role === "user") return "User";
    return role;
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === "super_admin")
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    if (role === "admin")
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  const userInitial = me?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <ReduxProvider>
      <Toaster />
      <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans antialiased flex flex-col">
        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1e293b] border-r border-slate-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-700/80 bg-[#1e293b]">
            <Link href="/dashboard" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-primary to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                AI Call <span className="text-orange-400">BD</span>
              </span>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer — 🆕 Real user data */}
          <div className="p-4 border-t border-slate-700/80 bg-[#1e293b]">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30 shrink-0">
                  {meLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    userInitial
                  )}
                </div>
                <div className="text-left overflow-hidden min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {meLoading ? "Loading..." : me?.name || "User"}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {meLoading ? "..." : me?.email || ""}
                  </p>
                  {!meLoading && me?.role && (
                    <span
                      className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getRoleBadgeColor(
                        me.role
                      )}`}
                    >
                      {getRoleLabel(me.role)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-400 transition p-1.5 rounded-lg shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <header className="h-16 bg-[#1e293b] border-b border-slate-700/80 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-sm md:text-base font-bold text-white tracking-wide">
                {currentPage}
              </h2>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <BalanceDisplay />

              {/* Notifications (optional, keep as-is) */}
              <div className="relative" ref={notificationRef}>
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1e293b] border border-slate-700/80 rounded-2xl shadow-xl shadow-slate-950/40 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-700/80">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Notifications
                      </h3>
                    </div>
                    <div className="py-6 text-center text-xs text-slate-500">
                      No notifications right now.
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown — 🆕 Real user data */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer p-1 rounded-xl hover:bg-slate-800/60 transition focus:outline-none"
                >
                  <UserInfo me={me} />
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#1e293b] border border-slate-700/80 rounded-2xl shadow-xl shadow-slate-950/40 py-2 z-50">
                    {/* Header with name, email, role */}
                    <div className="px-4 py-3 border-b border-slate-700/80">
                      <p className="text-sm font-bold text-white truncate">
                        {me?.name || "User"}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {me?.email || ""}
                      </p>
                      {me?.role && (
                        <span
                          className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getRoleBadgeColor(
                            me.role
                          )}`}
                        >
                          <ShieldCheck className="w-3 h-3 inline mr-1" />
                          {getRoleLabel(me.role)}
                        </span>
                      )}
                      {me?.company_name && (
                        <p className="text-xs text-slate-500 mt-2 truncate">
                         <span className="text-white">Company name:</span>  {me.company_name}
                        </p>
                      )}
                    </div>

                    <div className="p-1.5 space-y-1">
                    

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    <div className="p-1.5 border-t border-slate-700/80">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
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

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-8 bg-white overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ReduxProvider>
  );
}