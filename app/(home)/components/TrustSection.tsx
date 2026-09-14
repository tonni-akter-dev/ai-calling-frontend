import {
  BadgeCheck,
  FileText,
  PhoneCall,
  Lock,
  Settings,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function TrustSection() {
  const trustItems = [
    { icon: BadgeCheck, text: "Verified company information" },
    { icon: FileText, text: "Transparent pricing" },
    { icon: PhoneCall, text: "Professional support" },
    { icon: Lock, text: "Secure account access" },
    { icon: Settings, text: "Managed setup" },
    { icon: ShieldCheck, text: "Clear service terms" },
  ];

  return (
    <section className="py-24 bg-[#0A1128] relative overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-100 w-100 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-orange-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Headline */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4" /> Trust & Reliability
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 tracking-tight leading-[1.15]">
              Built for Business. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r  from-orange-400 to-amber-500 ml-2">
                Designed for Simplicity.
              </span>
            </h2>
            <p className="text-blue-100/60 mt-6 text-base leading-relaxed max-w-md">
              We focus on transparency, reliability, and clear service terms so
              you can focus on running your business with confidence.
            </p>
          </div>

          {/* Right: Trust Items Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {trustItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-orange-400 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-white">
                        {item.text}
                      </span>
                    </div>
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
