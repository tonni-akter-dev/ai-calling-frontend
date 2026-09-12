import { Cloud, Hash, Megaphone, Disc, BarChart3, Wallet } from "lucide-react";

export default function TrustValueBar() {
  const items = [
    { icon: Cloud, title: "Cloud PBX", desc: "Build a professional business phone system with extensions, IVR, call routing, and call management." },
    { icon: Hash, title: "Business IP Number", desc: "Give customers one official number for your business." },
    { icon: Megaphone, title: "Bulk Voice Campaigns", desc: "Reach large customer groups with automated voice communication." },
    { icon: Disc, title: "Call Recording", desc: "Keep supported business conversations accessible for review." },
    { icon: BarChart3, title: "Reports & Analytics", desc: "Understand your communication activity through clear reports." },
    { icon: Wallet, title: "Easy Billing", desc: "Manage balance, recharge, transactions, and usage from one dashboard." },
  ];

  return (
    <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl p-8 shadow-[0_20px_60px_-15px_rgba(9,21,64,0.3)] sm:p-12 lg:p-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Everything Your Business Needs to Communicate Better
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="group relative flex gap-5 rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 text-primary transition-all duration-500 group-hover:from-primary group-hover:to-blue-700 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}