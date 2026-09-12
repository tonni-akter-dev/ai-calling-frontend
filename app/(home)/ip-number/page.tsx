import {
  CheckCircle2,
  ArrowRight,
  Phone,
  ShieldCheck,
  Hash,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate IP Number Bangladesh | Business IP Phone | aicall.bd",
  description:
    "Get a professional corporate IP number and connect your team through Cloud PBX, extensions, SIP, and supported business calling tools.",
};
export default function IPNumberPage() {
  const keyBenefits = [
    "One Official Business Number",
    "Multiple Employee Extensions",
    "IVR and Call Routing",
    "SIP / Softphone Compatibility",
    "Centralized Call Management",
    "Professional Customer Experience",
    "Use from Supported Locations",
  ];

  const steps = [
    {
      step: "01",
      icon: "📋",
      title: "Tell Us Your Requirement",
      desc: "Share your business name and extensions.",
    },
    {
      step: "02",
      icon: "🔍",
      title: "Check Availability",
      desc: "We check available business numbers.",
    },
    {
      step: "03",
      icon: "⚙️",
      title: "Complete Setup",
      desc: "We configure PBX / SIP for your business.",
    },
    {
      step: "04",
      icon: "🔗",
      title: "Connect Your Team",
      desc: "Add extensions and supported softphones.",
    },
    {
      step: "05",
      icon: "🚀",
      title: "Go Live",
      desc: "Start making and receiving business calls.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* ==================== HERO ==================== */}
      <section className="relative bg-[#0b1329] text-white pt-40 pb-40 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-100 h-100 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            CORPORATE IP NUMBER
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 leading-[1.15]">
            Get a Professional
            <span className="text-orange-500">Corporate IP Number</span> for
            Your Business
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Give customers one official number while your team uses extensions
            and supported SIP/softphone tools to manage business calls.
          </p>

          <div className="mt-6 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400">IP Number</span>
          </div>
        </div>
      </section>

      {/* ==================== COMBINED: What Is + Benefits + Operator ==================== */}
      <section className="relative -mt-24 z-20 max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="relative p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 bg-blue-50 rounded-full blur-3xl opacity-60" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-3.5 py-1.5 rounded-full border border-primary/10 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  What Is a Business IP Number?
                </span>
                <h2 className="text-2xl md:text-[28px] font-extrabold text-slate-900 tracking-tight mb-5 leading-tight">
                  One Official Number,
                  <span className="text-primary">Connected to Your Team</span>
                </h2>
                <p className="text-[15px] text-slate-500 leading-[1.75] mb-8 max-w-md">
                  An IP number is a business phone number designed to work with
                  internet-based voice communication. With a Cloud PBX setup,
                  one official number can connect customers to multiple
                  employees or departments.
                </p>

                {/* Operator Note - Refined */}
                <div className="relative flex items-start gap-3.5 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 p-5 max-w-md">
                  <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-900 mb-1">
                      Licensed IPTSP Operator Services
                    </p>
                    <p className="text-xs text-emerald-800/80 leading-relaxed">
                      Where applicable, services are provided through licensed
                      IPTSP operators. Contact us for verified operator and
                      regulatory details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ RIGHT — Key Benefits ============ */}
            <div className="relative p-8 md:p-12 lg:p-14">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Key Benefits
                  </h3>
                  <div className="flex-1 h-px bg-linear-to-r from-slate-200 to-transparent" />
                </div>

                <ul className="space-y-3.5 mb-8">
                  {keyBenefits.map((item, idx) => (
                    <li
                      key={idx}
                      className="group flex items-center gap-3.5 text-[15px] text-slate-700"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 group-hover:bg-emerald-500 transition-colors duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                  <Link
                    href="#order-step"
                    className="group flex-1 bg-primary hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  >
                    Get an IP Number
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex-1 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 inline-flex items-center justify-center"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW TO GET YOUR NUMBER ==================== */}
      <section
        className="py-20 bg-white border-t border-slate-100"
        id="order-step"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to Get Your <span className="text-primary">IP Number</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              Follow these 5 simple steps to get your business number live.
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute top-22 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((item, idx) => (
                <div key={idx} className="relative text-center group">
                  <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-white border-2 border-slate-100 group-hover:border-primary/30 flex items-center justify-center mb-5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-2">
                    Step {item.step}
                  </p>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-50 mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative bg-[#0b1329] text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Hash className="w-6 h-6 text-orange-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Get Your Corporate
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              IP Number Today
            </span>
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Contact us to choose your preferred operator and number. Our team
            will guide you through the full setup process.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-900 px-7 py-3.5 rounded-xl text-sm font-semibold transition inline-flex items-center justify-center gap-2"
            >
              Get Your Corporate IP Number
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="tel:+8809611029422"
              className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              +880 9611 029422
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
