/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Cloud,
  Hash,
  Megaphone,
  Disc,
  Music,
  Settings,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

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

export default function OurServices() {
  const services = [
    {
      num: "01",
      icon: Cloud,
      title: "Cloud PBX",
      desc: "Professional business phone system with extensions, IVR, call routing, and call management.",
    },
    {
      num: "02",
      icon: Hash,
      title: "Corporate IP Numbers",
      desc: "Give your business one official number connected to your team and PBX system.",
    },
    {
      num: "03",
      icon: Megaphone,
      title: "Bulk Voice Campaigns",
      desc: "Reach large customer groups with automated voice communication for promotions and alerts.",
    },
    {
      num: "04",
      icon: Disc,
      title: "Call Recording",
      desc: "Keep supported business conversations accessible for review, training, and records.",
    },
    {
      num: "05",
      icon: Music,
      title: "Caller Tune / Voice Greetings",
      desc: "Custom welcome greetings, IVR announcements, and professional voice recordings.",
    },
    {
      num: "06",
      icon: Settings,
      title: "Communication Management",
      desc: "Organize all incoming and outgoing communication from a centralized system.",
    },
    {
      num: "07",
      icon: Wallet,
      title: "Billing & Account Tools",
      desc: "Manage balance, recharge, transactions, and usage visibility from one dashboard.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-125 w-full max-w-4xl bg-linear-to-b from-blue-50/50 to-transparent blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================== HEADER ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            What We Provide
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]"
          >
            Our Core{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Services
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 mt-5 text-base leading-relaxed"
          >
            Everything your business needs to communicate professionally — in
            one centralized platform.
          </motion.p>
        </motion.div>

        {/* ==================== SERVICES LIST (Editorial Rows) ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto border-t border-slate-200"
        >
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group relative border-b border-slate-200 cursor-pointer transition-all duration-500"
              >
                {/* Hover Background Fill */}
                <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:via-primary/[0.02] group-hover:to-transparent transition-all duration-500" />

                <div className="relative flex items-center gap-6 md:gap-10 py-7 md:py-9 px-2 md:px-4 transition-all duration-500 group-hover:px-4 md:group-hover:px-8">
                  {/* Number */}
                  <span className="text-xs md:text-sm font-bold text-slate-300 group-hover:text-orange-500 transition-colors duration-500 shrink-0 w-6 md:w-8">
                    {item.num}
                  </span>

                  {/* Icon */}
                  <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-110">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2 md:line-clamp-none">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                      <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ==================== BOTTOM CTA ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mt-4 text-center"
        >
          <a
            href="/services"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Explore All Services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
