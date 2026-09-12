"use client";

import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

interface Plan {
  name: string;
  price: number;
  recordingPrice: number;
  setupFee: string;
  setupFeeFree?: boolean;
  popular?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: 500,
    recordingPrice: 99,
    setupFee: "৳1,000",
    features: [
      "Free Corporate IP Number",
      "Call Rate: 40 Paisa + 15% VAT",
      "Extension to Extension — FREE",
      "05 Extensions",
      "02 Call Channels",
      "IVR / PBX System",
    ],
  },
  {
    name: "Pro",
    price: 750,
    recordingPrice: 199,
    setupFee: "৳500",
    popular: true,
    features: [
      "Free Corporate IP Number",
      "Call Rate: 40 Paisa + 15% VAT",
      "Extension to Extension — FREE",
      "10 Extensions",
      "05 Call Channels",
      "IVR / PBX System",
    ],
  },
  {
    name: "Enterprise",
    price: 1000,
    recordingPrice: 299,
    setupFee: "FREE",
    setupFeeFree: true,
    features: [
      "Free Corporate IP Number",
      "Call Rate: 40 Paisa + 15% VAT",
      "Extension to Extension — FREE",
      "20 Extensions",
      "10 Call Channels",
      "IVR / PBX System",
    ],
  },
];

export const Packages: React.FC = () => {
  const [recordingEnabled, setRecordingEnabled] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleRecording = (idx: number) => {
    setRecordingEnabled((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-175 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Cloud PBX Packages
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]"
          >
            Flexible{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Cloud PBX Plans
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-slate-500 mt-4 text-base leading-relaxed"
          >
            Choose the perfect package for your team. All plans include a free
            corporate IP number with per-second billing.
          </motion.p>
        </motion.div>

        {/* Pricing Cards Grid - items-stretch for equal height */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto"
        >
          {plans.map((plan, idx) => {
            const isRecordingOn = recordingEnabled[idx] || false;
            const totalMonthly =
              plan.price + (isRecordingOn ? plan.recordingPrice : 0);

            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`relative h-full rounded-3xl p-8 lg:p-9 flex flex-col transition-all duration-500 ${
                  plan.popular
                    ? "bg-linear-to-br from-primary to-[#0F1E55] text-white shadow-2xl shadow-primary/30 border border-white/10 md:-translate-y-4 z-10"
                    : "bg-white text-slate-900 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30 whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Decorative glow on popular card */}
                {plan.popular && (
                  <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
                )}

                {/* ============ CONTENT AREA (flex-1) ============ */}
                <div className="relative flex-1 flex flex-col">
                  
                  {/* Price */}
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                      ৳{totalMonthly.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm ml-1.5 font-medium ${
                        plan.popular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      /mo
                    </span>
                  </div>

                  {/* Subtitle */}
                  <p
                    className={`text-sm font-medium mb-6 ${
                      plan.popular ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    Cloud PBX Package
                  </p>

                  {/* Divider */}
                  <div
                    className={`border-t mb-6 ${
                      plan.popular ? "border-white/10" : "border-slate-100"
                    }`}
                  />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-6">
                    {plan.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start text-sm font-medium"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 shrink-0 mt-0.5 ${
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

                  {/* Add Call Recording Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleRecording(idx)}
                    className={`group cursor-pointer w-full flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all duration-300 text-left mb-5 ${
                      isRecordingOn
                        ? plan.popular
                          ? "border-orange-500/50 bg-orange-500/10"
                          : "border-primary/30 bg-primary/5"
                        : plan.popular
                          ? "border-white/10 bg-white/5 hover:border-white/20"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                        isRecordingOn
                          ? "bg-orange-500 border-2 border-orange-500"
                          : plan.popular
                            ? "border-2 border-white/30 bg-transparent"
                            : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {isRecordingOn && (
                        <Check className="w-3.5 h-3.5 text-white stroke-3" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div
                        className={`text-sm font-bold ${
                          plan.popular ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Add Call Recording
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${
                          plan.popular ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        + ৳{plan.recordingPrice}/month
                      </div>
                    </div>
                  </button>

                  {/* Setup Fee */}
                  <div className="text-center mb-3">
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Setup Fee:{" "}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        plan.setupFeeFree
                          ? "text-emerald-500"
                          : plan.popular
                            ? "text-white"
                            : "text-slate-900"
                      }`}
                    >
                      {plan.setupFee}
                      {plan.setupFeeFree && " 🎉"}
                    </span>
                  </div>

                  {/* Total Line - Always reserve space (invisible when off) */}
                  <div
                    className={`text-center p-1 mb-2 rounded-md border transition-all duration-300 ${
                      isRecordingOn
                        ? plan.popular
                          ? "bg-white/10 border-white/20 opacity-100"
                          : "bg-blue-50 border-blue-100 opacity-100"
                        : "opacity-0 border-transparent"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        plan.popular ? "text-white" : "text-primary"
                      }`}
                    >
                      Total: ৳{totalMonthly.toLocaleString()}/mo
                    </span>
                  </div>

                </div>

                {/* ============ CTA BUTTON (mt-auto for bottom alignment) ============ */}
                <button
                  className={`relative group w-full py-3.5 mt-auto rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-white text-primary hover:bg-slate-100 shadow-lg"
                      : "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};