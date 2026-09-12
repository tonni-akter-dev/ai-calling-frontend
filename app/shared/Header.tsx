"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PhoneCall, ArrowRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Caller Tune", href: "/caller-tune" },
  { name: "IP Number", href: "/ip-number" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full mt-5  px-5 lg:px-20 ">
      <div className="max-w-7xl mx-auto flex h-19.5 items-center  border border-slate-200 bg-white rounded-full justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center   shadow-md rounded-xl bg-primary shadow-primary/20">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              <span className="text-primary"> AI CALL</span> BD
            </h2>

            <p className="text-[10px] font-medium tracking-[0.18em] text-slate-400">
              COMMUNICATION
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Portal Button */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white  hover:bg-white
                ease-in-out transition-all duration-300
                 hover:text-primary hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
          >
                     Portal Login
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 xl:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-xl xl:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white"
              >
                Portal Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
