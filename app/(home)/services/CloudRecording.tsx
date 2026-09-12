"use client";

import { motion } from "framer-motion";
import { HardDrive, Check, ArrowRight, Play, Shield, Download } from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const listItemVariant = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CloudRecording() {
  const steps = [
    {
      number: "1",
      icon: Play,
      title: "Automatic Recording",
      description:
        "Every inbound and outbound call is automatically recorded in crystal-clear audio quality.",
      color: "from-primary to-blue-800",
      iconBg: "bg-primary",
    },
    {
      number: "2",
      icon: Shield,
      title: "Secure Cloud Storage",
      description:
        "Audio files are immediately encrypted and backed up to secure high-availability cloud storage.",
      color: "from-amber-500 to-orange-600",
      iconBg: "bg-amber-500",
    },
    {
      number: "3",
      icon: Download,
      title: "Easy Playback & Download",
      description:
        "Access recordings directly from your management dashboard. Stream audio or download MP3 logs anytime.",
      color: "from-emerald-500 to-teal-600",
      iconBg: "bg-emerald-500",
    },
  ];

  const perfectForItems = [
    "Quality Assurance Review",
    "Customer Support Monitoring",
    "Staff Training & Onboarding",
    "Dispute Resolution Records",
    "Legal & Regulatory Compliance",
    "Team Performance Analysis",
  ];

  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      
      {/* Subtle background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-[700px] rounded-full bg-blue-100/30 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============ SECTION HEADER ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-[0.15em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <HardDrive className="w-3.5 h-3.5" />
            Cloud Recording
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]"
          >
            How Cloud Recording{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Works
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-slate-500 mt-4 text-base leading-relaxed"
          >
            Securely record all incoming and outgoing business calls with
            automated archiving for up to 90 days.
          </motion.p>
        </motion.div>

        {/* ============ MAIN CONTENT ============ */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ============ LEFT: Steps ============ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-7 space-y-4"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeInLeft}
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white p-6 rounded-3xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
              >
                {/* Left accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="flex items-start gap-5">
                  {/* Number Badge */}
                  <div className="relative shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-2xl ${step.iconBg} text-white font-bold flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ============ RIGHT: Perfect For Box ============ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
            className="md:col-span-5"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
            >
              
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl" />

              <div className="relative">
                <h4 className="font-bold text-slate-900 text-xl mb-5 flex items-center gap-2">
                  <span className="h-6 w-1 rounded-full bg-orange-500" />
                  Perfect For:
                </h4>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-2.5"
                >
                  {perfectForItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariant}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.2 }}
                      className="group/item flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 cursor-default"
                    >
                      <motion.span
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </motion.span>
                      <span className="text-sm font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ============ PRICING BANNER ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mt-16"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ duration: 0.4 }}
            className="group relative rounded-3xl bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-primary/20 overflow-hidden"
          >
            
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all duration-500" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex items-center gap-5">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0"
              >
                <HardDrive className="w-7 h-7 text-white" />
              </motion.div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-3xl font-extrabold tracking-tight">
                    ৳99
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    /month
                  </span>
                  <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-orange-500/20 uppercase tracking-wider">
                    Includes 90-Day Storage
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  Scalable storage extensions available for large enterprise teams.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full md:w-auto"
            >
              <Link
                href="/pricing"
                className="group/btn inline-flex items-center justify-center gap-2 w-full md:w-auto bg-white hover:bg-slate-100 text-primary px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}