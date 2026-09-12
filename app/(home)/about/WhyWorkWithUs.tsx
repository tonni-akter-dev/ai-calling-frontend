/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function WhyWorkWithUs() {
  const points = [
    "Easier call management",
    "Professional customer communication",
    "Centralized control",
    "A setup that can grow with the organization",
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-100 w-100 rounded-full bg-orange-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Why Businesses Work With Us
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]"
            >
              Practical Outcomes.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                Real Business Value.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-6 text-base leading-relaxed"
            >
              aicall.bd focuses on practical business outcomes. We help you
              simplify communication, gain visibility, and build a scalable
              system that grows with your organization.
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="mt-8 space-y-4"
            >
              {points.map((point, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Talk to Our Team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visual - Dark Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl bg-linear-to-br from-[#0A1128] via-[#0F1E55] to-[#0A1128] p-10 md:p-14 text-white overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="relative z-10 space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400">
                  Our Focus
                </p>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Building Communication Systems That Actually Work for Your Business.
                </h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  From customer calls to team extensions, voice campaigns, recordings, contacts, and reports — aicall.bd brings your communication workflow together in one centralized platform.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-3xl font-bold text-white">Cloud</p>
                    <p className="text-xs text-blue-200/60 mt-1">PBX System</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">Bulk</p>
                    <p className="text-xs text-blue-200/60 mt-1">Voice Campaign</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}