import { Users, Wallet, CheckCircle2, CreditCard, FolderPlus, ListPlus, UserCheck, PhoneCall } from "lucide-react";

export default function ContactBilling() {
  const contactFeatures = [
    "Add contacts",
    "Import contacts",
    "Create groups",
    "Manage customer information",
    "Use contacts in campaigns",
    "Maintain communication context",
  ];

  const billingFeatures = [
    "Easy recharge",
    "Balance tracking",
    "Transaction history",
    "Usage visibility",
    "Supported online payment methods",
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-full max-w-4xl bg-linear-to-b from-blue-50/50 to-transparent blur-3xl opacity-60" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Contact Management */}
          <div className="group relative rounded-3xl p-8 md:p-10 border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <Users className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Keep Your Customer Contacts Organized
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Manage your customer contacts efficiently and use them across your communication workflows.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-4">
                {contactFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Wallet / Billing */}
          <div className="group relative rounded-3xl p-8 md:p-10 border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-orange-500/5 blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                <Wallet className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Stay in Control of Your Communication Spending
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Manage balance, recharge, transactions, and usage from one dashboard.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-4">
                {billingFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}