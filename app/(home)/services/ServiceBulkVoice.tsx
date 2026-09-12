/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function ServiceBulkVoice() {
  const features = [
    "API integration",
    "Campaign scheduling",
    "Custom voice messages",
    "Automated campaigns",
    "Delivery tracking",
    "Reports and analytics",
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 h-100 w-100 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative lg:order-1"
          >
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-orange-500/20 to-amber-500/20 blur-2xl opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1200&auto=format&fit=crop"
              alt="Bulk Voice Call - Marketing Campaigns"
              className="relative w-full h-105 object-cover rounded-3xl shadow-2xl shadow-orange-500/20 border border-slate-200"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:order-1"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Bulk Voice Call
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]"
            >
              Reach Large Customer{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                Groups Automatically
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-5 text-base leading-relaxed"
            >
              Automate supported voice communication for promotions, reminders,
              notifications, announcements, and customer engagement.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-8 grid sm:grid-cols-2 gap-3"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Start Bulk Voice
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
