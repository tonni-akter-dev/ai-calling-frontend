"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  PhoneCall,
  Megaphone,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
  Receipt,
} from "lucide-react";
import { menu } from "@/app/utils/data";



export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-62.5 flex-col
          border-r border-slate-800
          bg-[#182437]
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-700 px-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <PhoneCall className="h-4 w-4 text-white" />
            </div>

            <div>
              <h1 className="text-[16px] font-extrabold tracking-tight">
                <span className="text-blue-400">AI CALL</span>{" "}
                <span className="text-white">BD</span>
              </h1>

              <p className="text-[8px] font-semibold tracking-[0.16em] text-slate-400">
                SUPER ADMIN
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="text-slate-400 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
            <div className="mb-6">
              <div className="space-y-1">
                {menu.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-center gap-3
                        rounded-lg
                        px-3 py-2.5
                        text-[13px]
                        font-medium
                        transition-all
                        duration-200
                        ${
                          active
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }
                      `}>
                      <Icon
                        className={`
                          h-4.25 w-4.25
                          ${active ? "text-white" : "text-slate-400"}
                        `}
                      />

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          
        </div>

        {/* Bottom Logout */}
        <div className="border-t border-slate-700 p-3">
          <button
            className="
              flex w-full items-center gap-3
              rounded-lg
              px-3 py-2.5
              text-sm text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
            "
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
