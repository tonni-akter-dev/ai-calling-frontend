import {
  ShoppingCart,
  Stethoscope,
  Home,
  GraduationCap,
  Truck,
  Building2,
  Headphones,
  Briefcase,
} from "lucide-react";

export default function Industries() {
  const industries = [
    {
      icon: ShoppingCart,
      title: "E-commerce",
      desc: "Order confirmation, customer follow-up, promotions, notifications.",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      icon: Stethoscope,
      title: "Healthcare",
      desc: "Appointment reminders, customer communication, support calls.",
      bg: "bg-emerald-50",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Home,
      title: "Real Estate",
      desc: "Lead management, sales calls, follow-ups.",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100 text-orange-600",
    },
    {
      icon: GraduationCap,
      title: "Education",
      desc: "Admissions, student notifications, reminders.",
      bg: "bg-purple-50",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      icon: Truck,
      title: "Courier & Delivery",
      desc: "Delivery communication, customer notifications, confirmations.",
      bg: "bg-cyan-50",
      iconBg: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: Building2,
      title: "Corporate",
      desc: "Business numbers, extensions, team calling, reporting.",
      bg: "bg-slate-100",
      iconBg: "bg-slate-200 text-slate-700",
    },
    {
      icon: Headphones,
      title: "Call Centers",
      desc: "Agent extensions, call management, recording, reporting.",
      bg: "bg-rose-50",
      iconBg: "bg-rose-100 text-rose-600",
    },
    {
      icon: Briefcase,
      title: "Service Businesses",
      desc: "Inquiries, bookings, reminders, customer support.",
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />{" "}
            Industries
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 tracking-tight">
            Built for Businesses  <span className="ml-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
             That Depend on Communication
          </span> 
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.bg}`}
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${item.iconBg}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
