"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Cloud,
  Disc,
  BarChart3,
  LayoutDashboard,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const detailedSections = [
  {
    id: "platform",
    title: "Platform / Dashboard",
    icon: LayoutDashboard,
    headline: "Your Business Communication. At a Glance.",
    desc: "Give managers and teams a clear view of calls, campaigns, contacts, balance, recordings, and communication activity.",
    bullets: [
      "Calls Today",
      "Active Campaigns",
      "Contacts",
      "Call History",
      "Call Duration",
      "Balance & Transactions",
      "Recordings",
      "Team / Agent Activity",
    ],
  },
  {
    id: "bulk-voice",
    title: "Bulk Voice Campaign",
    icon: Megaphone,
    headline: "Reach More Customers Without Calling One by One",
    desc: "Create automated voice campaigns, upload contacts, schedule campaigns, deliver voice messages, and monitor campaign activity from one dashboard.",
    bullets: [
      "Contact upload",
      "Voice message creation",
      "Campaign scheduling",
      "Automated calls",
      "Delivery / status tracking",
      "Campaign reports",
      "Campaign history",
      "API integration",
    ],
    useCases:
      "Order confirmation • Payment reminders • Appointment reminders • Promotions • Event announcements • Customer feedback • Awareness campaigns",
  },
  {
    id: "cloud-pbx",
    title: "Cloud PBX",
    icon: Cloud,
    headline: "Turn One Business Number Into a Complete Phone System",
    desc: "Connect employees, departments, and customers through one organized business phone system.",
    bullets: [
      "Corporate IP number",
      "Employee extensions",
      "IVR / auto attendant",
      "Call routing",
      "Call transfer",
      "Call forwarding",
      "Business greetings",
      "Call history",
      "Optional recording",
      "Centralized management",
    ],
  },
  {
    id: "call-recording",
    title: "Call Recording",
    icon: Disc,
    headline: "Record. Review. Improve.",
    desc: "Use supported call recording to review conversations, improve service quality, support training, understand customer interactions, and maintain useful business records.",
    bullets: [
      "Quality monitoring",
      "Customer support",
      "Staff training",
      "Sales review",
      "Dispute / detail verification",
      "Record keeping",
    ],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    icon: BarChart3,
    headline: "Turn Call Activity Into Useful Insights",
    desc: "Understand your communication activity through clear reports and analytics.",
    bullets: [
      "Total calls",
      "Answered calls",
      "Missed calls",
      "Call duration",
      "Campaign activity",
      "Call history",
      "Usage and transaction visibility",
    ],
  },
];

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState("platform");

  const activeData = detailedSections.find((s) => s.id === activeTab);

  return (
    <section className="py-24 bg-[#0A1128] relative overflow-hidden">
      {/* Background Glows for Dark Theme */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-125 w-125 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-100 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" /> The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 tracking-tight">
            One Platform for Your Entire Business Communication
          </h2>
          <p className="text-blue-100/70 mt-5 text-base leading-relaxed">
            From customer calls to team extensions, voice campaigns, recordings,
            contacts, and reports, aicall.bd brings your communication workflow
            together in one centralized platform.
          </p>
        </div>

        {/* ==================== INTERACTIVE TABS ==================== */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Tab Navigation */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-blue-200/50 uppercase tracking-[0.15em] mb-6 px-2">
              Explore Features
            </h3>
            {detailedSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeTab === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]"
                      : "bg-white/5 text-blue-100/70 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? "text-white" : "text-blue-300/50"
                    }`}
                  />
                  <span className="font-bold text-sm">{section.title}</span>
                  {isActive && (
                    <ArrowRight className="w-4 h-4 ml-auto text-white/80" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Active Tab Content */}
          <div className="lg:col-span-8">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Inner Glow */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {activeData?.headline}
                </h3>
                <p className="text-blue-100/80 text-base leading-relaxed mb-8 max-w-2xl">
                  {activeData?.desc}
                </p>

                {/* Bullet Points Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeData?.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/5"
                    >
                      <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-blue-50">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
