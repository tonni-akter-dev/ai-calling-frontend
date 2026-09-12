import React from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Plan {
  name: string;
  price: string;
  subtitle: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "৳750",
    subtitle: "For small teams.",
    features: [
      "Corporate IP Number",
      "5 Extensions",
      "2 Call Channels",
      "IVR / PBX System",
      "Basic call management",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "৳1,050",
    subtitle: "For growing businesses.",
    popular: true,
    features: [
      "Corporate IP Number",
      "10 Extensions",
      "5 Call Channels",
      "IVR / PBX System",
      "Call Transfer",
      "Call Forwarding",
      "Enhanced management",
    ],
    cta: "Start With Growth",
  },
  {
    name: "Business",
    price: "৳1,550",
    subtitle: "For larger teams.",
    features: [
      "Corporate IP Number",
      "20 Extensions",
      "10 Call Channels",
      "IVR / PBX System",
      "Advanced configuration",
      "Business support",
    ],
    cta: "Talk to Sales",
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-175 rounded-full bg-blue-100/30 blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]">
            Simple Plans. 
             <span className="ml-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
             Clear Pricing
          </span>
            {/* <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Built for Growing Businesses.
            </span> */}
          </h2>
          <p className="text-slate-500 mt-4 text-base leading-relaxed">
            Choose a Cloud PBX package based on your team size and communication requirements. Monthly platform fees are shown separately from usage-based calling charges and optional services.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 lg:p-9 flex flex-col justify-between transition-all duration-500 ${
                plan.popular
                  ? "bg-linear-to-br from-primary to-[#0F1E55] text-white shadow-2xl shadow-primary/30 border border-white/10 md:-translate-y-4 py-10 lg:py-12 z-10 scale-100 md:scale-105"
                  : "bg-white text-slate-900 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                  Most Popular
                </div>
              )}

              {/* Decorative glow on popular card */}
              {plan.popular && (
                <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
              )}

              <div className="relative">
                {/* Plan Header */}
                <h3
                  className={`text-2xl font-bold ${
                    plan.popular ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>

                {/* Subtitle */}
                <p
                  className={`text-sm mt-2 ${
                    plan.popular ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="mt-6 mb-6 flex items-baseline">
                  <span className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ml-2 font-medium ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    /month
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={`border-t mb-8 ${
                    plan.popular ? "border-white/10" : "border-slate-100"
                  }`}
                />

                {/* Feature List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm lg:text-[15px] font-medium"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                          plan.popular
                            ? "bg-orange-500 text-white"
                            : "bg-primary text-white"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-3" />
                      </div>
                      <span
                        className={
                          plan.popular ? "text-slate-200" : "text-slate-700"
                        }
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`relative group w-full py-3.5 rounded-xl text-sm lg:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-slate-100 shadow-lg"
                    : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-blue-100"
          >
            View Full Pricing Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};