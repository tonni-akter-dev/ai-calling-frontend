import { Cloud, Hash, Megaphone, Disc, BarChart3, Wallet } from "lucide-react";

export default function HomeStats() {
  const items = [
    { icon: Cloud, title: "Cloud PBX", desc: "Professional business phone system with extensions, IVR, call routing, and call management." },
    { icon: Hash, title: "Business IP Number", desc: "Give customers one official number for your business." },
    { icon: Megaphone, title: "Bulk Voice Campaigns", desc: "Reach large customer groups with automated voice communication." },
    { icon: Disc, title: "Call Recording", desc: "Keep supported business conversations accessible for review." },
    { icon: BarChart3, title: "Reports & Analytics", desc: "Understand your communication activity through clear reports." },
    { icon: Wallet, title: "Easy Billing", desc: "Manage balance, recharge, transactions, and usage from one dashboard." },
  ];

  return (
    <section className="relative z-20 mt-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-white/20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-600">
            Everything Your Business Needs <br /> to Communicate Better
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="cursor-pointer group relative flex gap-5 rounded-2xl bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 border border-slate-100"
              >
                {/* Icon Box - Visible Background Before Hover */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br
                 from-white to-white text-black shadow-md transition-all duration-500 group-hover:text-white
                  group-hover:from-primary group-hover:to-blue-900 group-hover:scale-110 group-hover:shadow-blue-600/40">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}