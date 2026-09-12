import { 
  Layers, 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  Check, 
  X 
} from "lucide-react";

export default function BenefitsComparison() {
  const benefits = [
    { num: "01", icon: Layers, title: "One Centralized Platform", desc: "Manage calls, campaigns, contacts, and billing from a single dashboard." },
    { num: "02", icon: Phone, title: "Professional Business Communication", desc: "Give your business a professional number, extensions, and IVR." },
    { num: "03", icon: Users, title: "Easy for Non-Technical Teams", desc: "Simple controls designed for business owners and teams." },
    { num: "04", icon: Zap, title: "Flexible for Growing Businesses", desc: "Start with what you need and scale as your team grows." },
    { num: "05", icon: BarChart3, title: "Real-Time Visibility", desc: "See call activity, campaigns, and usage clearly." },
    { num: "06", icon: Settings, title: "Managed Setup & Support", desc: "Our team assists with supported setup and configuration." },
    { num: "07", icon: Wallet, title: "Clear Pricing & Billing", desc: "Transparent monthly fees and usage visibility." },
    { num: "08", icon: ShieldCheck, title: "Business-Focused Features", desc: "Practical tools built for customer communication." },
  ];

  const traditional = [
    "Personal numbers", "Manual calls", "Separate devices", "Limited visibility", 
    "Difficult team management", "Harder reporting", "Harder to scale"
  ];

  const aicall = [
    "Professional business communication", "Centralized dashboard", "Extensions", 
    "Call management", "Recording", "Voice campaigns", "Reports", "Scalable setup"
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-4xl bg-linear-to-b from-blue-50/50 to-transparent blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ==================== BENEFITS (BALANCED EDITORIAL GRID) ==================== */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-32">
          
          {/* Left: Header (Now Compact & Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]">
              Why Businesses Choose{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                aicall.bd
              </span>
            </h2>
            <p className="text-slate-500 mt-5 text-sm leading-relaxed">
              Practical, business-focused tools designed to simplify your communication workflow — built for Bangladesh businesses.
            </p>
          </div>

          {/* Right: 2-Column Compact Grid */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {benefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="group flex gap-4 transition-all duration-300 hover:-translate-y-1">
                    {/* Number */}
                    <span className="text-sm font-bold text-slate-300 group-hover:text-orange-500 transition-colors pt-1 shrink-0">
                      {item.num}
                    </span>
                    
                    {/* Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ==================== TRADITIONAL VS AICALL (CLEAN COMPARISON) ==================== */}
        <div className="border-t border-slate-100 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Traditional vs aicall.bd
            </h3>
            <p className="text-slate-500 mt-3 text-sm">
              See the difference a modern communication system makes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
            
            {/* Traditional */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 md:p-10">
              <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-500">
                  <X className="h-4 w-4" />
                </span>
                Traditional Setup
              </h4>
              <ul className="space-y-4">
                {traditional.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <X className="h-4 w-4 text-red-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* aicall.bd */}
            <div className="rounded-3xl border border-primary/10 bg-linear-to-br from-[#0A1128] to-[#0F1E55] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary/10">
              <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
              
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                    <Check className="h-4 w-4" />
                  </span>
                  aicall.bd
                </h4>
                <ul className="space-y-4">
                  {aicall.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-blue-100 text-sm font-medium">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}