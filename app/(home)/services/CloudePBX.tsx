"use client";

import { motion } from "framer-motion";
import { Cloud, Check, ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

// Animation variants
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function CloudePBX() {
  const features = [
    "Free Corporate IP Number included",
    "Call Rate: 40 Paisa + 15% VAT",
    "Extension to Extension calls — FREE",
    "IP to IP Number calls — FREE",
    "IVR / PBX System with custom greetings",
    "Call Transfer & Call Forwarding",
    "Detailed Call History & Analytics",
    "Optional Call Recording add-on",
    "Incoming calls — FREE",
    "Per second pulse billing",
  ];

  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Subtle background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-175 rounded-full bg-blue-100/30 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ============ LEFT: Service Details ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="md:col-span-7 space-y-6 order-2 md:order-1"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInLeft}
            className="inline-flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-[0.15em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cloud className="w-3.5 h-3.5" />
            </motion.span>
            <span>Cloud PBX System</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInLeft}
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Enterprise Voice Network{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              for Your Business
            </span>
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            variants={fadeInLeft}
            className="text-slate-500 text-base leading-relaxed"
          >
            Our Cloud PBX (Private Branch Exchange) system is a virtual phone
            system hosted in the cloud, eliminating the need for expensive
            on-premise hardware. It provides enterprise-grade features at a
            fraction of the cost.
          </motion.p>

          <motion.p
            variants={fadeInLeft}
            className="text-slate-500 text-base leading-relaxed"
          >
            Your staff can make and receive calls using a single official IP
            number from anywhere in Bangladesh. Each team member gets their own
            extension, and all calls are routed through our intelligent IVR
            system.
          </motion.p>

          {/* 2-Column Feature List */}
          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-x-6 gap-y-4 pt-2"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={listItemVariant}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="group/feat cursor-pointer flex items-start gap-2.5"
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5"
                >
                  <Check className="w-2.5 h-2.5 text-white stroke-3" />
                </motion.span>
                <span className="text-sm font-medium text-slate-700 leading-snug group-hover/feat:text-primary transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInLeft}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}>
              <Link
                href="#pricing"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40">
                View PBX Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}>
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 border-2 border-primary/20 hover:border-primary/60 hover:bg-primary/5 text-primary px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300">
                Request Demo
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ============ RIGHT: Pricing Card ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInRight}
          className="md:col-span-5 flex justify-center order-1 md:order-2"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group w-full max-w-sm rounded-3xl bg-linear-to-br from-primary to-[#0F1E55] text-white p-8 shadow-2xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-shadow duration-500 text-center relative overflow-hidden"
          >
            {/* Decorative glow inside card */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all duration-500" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              {/* Rocket Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.4 }}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className="w-9 h-9 text-white" />
                </motion.div>
              </motion.div>

              {/* "Starting At" Label */}
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                Starting At
              </div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="text-5xl font-extrabold tracking-tight my-2"
              >
                ৳500
                <span className="text-lg font-medium text-blue-200 ml-1">
                  /mo
                </span>
              </motion.div>

              {/* Subtitle */}
              <p className="text-sm text-blue-100 mb-8">
                Scales as your team grows
              </p>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/pricing"
                  className="group/btn w-full bg-white text-primary hover:bg-blue-50 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  See All Packages
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
