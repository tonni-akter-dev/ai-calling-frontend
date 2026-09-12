"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PhoneCall,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Phone,
  User,
  AlertCircle,
  CheckCircle2,
  FileAudio,
  ListOrdered,
  Headphones,
  Wallet,
  History,
  Loader2,
} from "lucide-react";
import { ReduxProvider } from "../redux/Providers";
import { Toaster } from 'sonner';
import { useGetWalletBalanceQuery } from "@/app/redux/features/apis/walletApi";

// ===== USER INFO COMPONENT =====
function UserInfo() {
  // এখানে আপনার user data fetch করার API যোগ করুন
  // উদাহরণ: const { data: userData } = useGetUserQuery();
  
  // ডেমো ডাটা (আসল API থেকে fetch করবেন)
  const userData = {
    name: "Admin User",
    email: "admin@ipcallbd.com",
    avatar: "A",
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-blue-400/30">
        {userData.avatar}
      </div>
      <div className="hidden md:block text-left">
        <p className="text-xs font-bold text-white truncate max-w-25">
          {userData.name}
        </p>
        <p className="text-[10px] text-slate-400 truncate max-w-25">
          {userData.email}
        </p>
      </div>
    </div>
  );
}

// ===== BALANCE DISPLAY COMPONENT =====
function BalanceDisplay() {
  const { data: walletData, isLoading, refetch } = useGetWalletBalanceQuery();
  
  // Auto-refetch every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs">
        <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />
        <span className="text-slate-400 font-medium">Balance:</span>
        <span className="text-emerald-400 font-bold animate-pulse">Loading...</span>
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close profile dropdown when clicking outside
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

  // Close notifications dropdown when clicking outside
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

  // Mock notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Bulk Campaign Finished",
      message: "Eid Promo Broadcast completed with 94% delivery rate.",
      time: "5m ago",
      read: false,
      icon: (
        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      ),
    },
    {
      id: 2,
      title: "Low Talk-Time Balance",
      message:
        "Your current balance is ৳ 1,250. Recharge soon to avoid service interruption.",
      time: "1h ago",
      read: false,
      icon: (
        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
          <AlertCircle className="w-4 h-4" />
        </div>
      ),
    },
    {
      id: 3,
      title: "SIP Trunk Re-connected",
      message: "Primary IPTSP server extension 101 restored connection.",
      time: "3h ago",
      read: true,
      icon: (
        <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
          <PhoneCall className="w-4 h-4" />
        </div>
      ),
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Manage Contact", href: "/dashboard/manage-contacts", icon: Users },
    { name: "Send Voice Call", href: "/dashboard/voice-call", icon: PhoneCall },
    { name: "Calls History", href: "/dashboard/calls-history", icon: History },
    { name: "Manage Voice File", href: "/dashboard/manage-voice-file", icon: FileAudio },
    { name: "All Call Logs", href: "/dashboard/all-call-logs", icon: ListOrdered },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Credit", href: "/dashboard/credit", icon: Wallet },
    { name: "Support Ticket", href: "/dashboard/support-ticket", icon: Headphones },
  ];

  // Get current page name
  const currentPage = navigation.find((n) => n.href === pathname)?.name || "Dashboard";

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

        {/* Sidebar Navigation */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1e293b] border-r border-slate-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand Header */}
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

          {/* Navigation Links */}
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
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer User Card */}
          <div className="p-4 border-t border-slate-700/80 bg-[#1e293b]">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700/80">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                  AD
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">
                    Admin User
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    admin@ipcallbd.com
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="text-slate-400 hover:text-rose-400 transition p-1.5 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main View Area */}
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
              {/* Balance Display */}
              <BalanceDisplay />

              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 text-slate-300 hover:text-white transition rounded-xl bg-slate-900 border border-slate-700/80 focus:outline-none"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900 animate-pulse" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1e293b] border border-slate-700/80 rounded-2xl shadow-xl shadow-slate-950/40 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-[10px] font-mono font-bold bg-primary/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
                      {notifications.length > 0 ? (
                        notifications.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => markAsRead(item.id)}
                            className={`p-3.5 flex items-start space-x-3 cursor-pointer transition ${
                              !item.read
                                ? "bg-slate-900/60 hover:bg-slate-900"
                                : "hover:bg-slate-800/50"
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p
                                  className={`text-xs font-bold truncate ${
                                    !item.read ? "text-white" : "text-slate-300"
                                  }`}>
                                  {item.title}
                                </p>
                                <span className="text-[10px] text-slate-500">
                                  {item.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-snug">
                                {item.message}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-xs text-slate-500">
                          No notifications right now.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer p-1 rounded-xl hover:bg-slate-800/60 transition focus:outline-none"
                >
                  <UserInfo />
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu Container */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#1e293b] border border-slate-700/80 rounded-2xl shadow-xl shadow-slate-950/40 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-700/80">
                      <p className="text-xs font-bold text-white truncate">
                        Admin User
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        admin@ipcallbd.com
                      </p>
                 
                    </div>

                    <div className="p-1.5 space-y-1">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>View Profile</span>
                      </Link>

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
                      <Link
                        href="/login"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        <span>Log Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-4 md:p-8 bg-white overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ReduxProvider>
  );
}