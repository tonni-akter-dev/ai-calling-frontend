"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall, Users, Megaphone, Wallet, PhoneMissed, Clock, Contact } from "lucide-react";

export default function HeroBanner() {
  const dashboardStats = [
    { label: "Total Calls", value: "—", icon: PhoneCall },
    { label: "Active Campaigns", value: "—", icon: Megaphone },
    { label: "Total Contacts", value: "—", icon: Contact },
    { label: "Available Balance", value: "—", icon: Wallet },
    { label: "Missed Calls", value: "—", icon: PhoneMissed },
    { label: "Call Duration", value: "—", icon: Clock },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-primary px-4 pt-28 pb-20 sm:px-6 lg:px-20 lg:pt-36 lg:pb-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-45 h-125 w-175 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-40 top-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-950/10 backdrop-blur-md sm:text-sm">
          SMART BUSINESS COMMUNICATION PLATFORM
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
          Connect Your Business
          <span className="mt-2 block bg-linear-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Communicate Smarter.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-blue-50/80 sm:text-lg sm:leading-8">
          aicall.bd gives your business one powerful platform to manage customer
          calls, Cloud PBX, business IP numbers, voice campaigns, call
          recordings, contacts, and communication activity — all from one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-primary shadow-xl shadow-blue-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
          >
            Start Free Demo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
          >
            <Sparkles className="h-4 w-4" />
            Explore Platform
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-blue-100/60">
          <span>✓ Simple Setup</span>
          <span>✓ Powerful Tools</span>
          <span>✓ Business-Focused Support</span>
        </div>

        {/* Dashboard Preview */}
        {/* <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {dashboardStats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-left"
                >
                  <div className="flex items-center gap-2 text-blue-100/70">
                    <Icon className="h-4 w-4 text-orange-300" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </section>
  );
}