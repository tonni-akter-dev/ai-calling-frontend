import React from "react";
import {
  Server,
  Award,
  PhoneIncoming,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export const WhyUsSection: React.FC = () => {
  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-125 w-200 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            The Premier Choice
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]">
            Why Leaders Switch to <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              AI CALL BD
            </span>
          </h2>
          <p className="text-slate-500 mt-4 text-base leading-relaxed">
            We deliver enterprise-grade reliability, backed by <br />{" "}
            low-latency infrastructure and intuitive management tools.
          </p>
        </div>

        {/* Bento Grid Layout - First card bigger */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="cursor-pointer group md:col-span-2 relative bg-linear-to-br from-primary to-[#0F1E55] rounded-3xl p-8 md:p-10 overflow-hidden shadow-xl shadow-primary/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all duration-500" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Server className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Own Server & Data Center
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-lg">
                Unlike resellers, we operate our own low-latency data centers.
                This ensures maximum uptime, uncompromised security, and
                lightning-fast performance for your business calls.
              </p>
            </div>

            <div className="relative flex items-center text-xs font-bold text-orange-400 group-hover:text-orange-300 cursor-pointer mt-auto">
              Explore Infrastructure
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="cursor-pointer group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                14+ Years Experience
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Trusted by enterprise clients across multiple industries
                nationwide with proven reliability.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-600 cursor-pointer mt-auto">
              Read Case Studies
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="cursor-pointer group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-500">
                <PhoneIncoming className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Toll-Free Calls
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Dedicated 1800 numbers designed for effortless inbound
                communication and routing.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-sky-600 cursor-pointer mt-auto">
              View Toll-Free Plans
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>

          {/* Card 4 - Wide (spans 2 cols) - Now matches Card 3 vertical layout */}
          <div className="cursor-pointer group md:col-span-2 relative bg-white rounded-3xl p-8 md:p-10 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-500">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                All-In-One Dashboard
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xl">
                Manage messaging, real-time analytics, live monitoring, team
                extensions, and billing right from a single unified control
                portal.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-slate-900 group-hover:text-orange-500 cursor-pointer transition-colors mt-auto">
              See Portal Preview
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
