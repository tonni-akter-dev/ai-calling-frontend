"use client";

import { motion } from "framer-motion";
import { Volume2, Check, ArrowRight } from "lucide-react";
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
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

export default function BulkVoiceSection() {
  const features = [
    "Fast Delivery Engine",
    "Automated Schedule Manager",
    "Flexible HTTP API Access",
    "Dynamic Call Scheduling",
    "Detailed Call Analytics",
    "Interactive Keypress (DTMF)",
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ============ LEFT: Content ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="md:col-span-7 space-y-6"
        >
          
          {/* Badge */}
          <motion.div
            variants={fadeInLeft}
            className="inline-flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-[0.15em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </motion.span>
            <span>Bulk Voice Call with API</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInLeft}
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Broadcast to Thousands{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Simultaneously
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInLeft}
            className="text-slate-500 text-base leading-relaxed"
          >
            Broadcast pre-recorded audio messages automatically to thousands
            of recipients simultaneously with instant status reporting.
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
                className="group/feat flex items-start gap-2.5 cursor-default"
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5"
                >
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </motion.span>
                <span className="text-sm font-medium text-slate-700 leading-snug group-hover/feat:text-primary transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        {/* ============ RIGHT: Pricing Card ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInRight}
          className="md:col-span-5 flex justify-center"
        >
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative w-full max-w-sm rounded-3xl bg-linear-to-br from-orange-500 to-amber-600 text-white p-8 text-center shadow-2xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 transition-shadow duration-500 overflow-hidden"
          >
            
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/20 blur-3xl group-hover:bg-white/30 transition-all duration-500" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

            <div className="relative">
              
              {/* Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.4 }}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Volume2 className="w-9 h-9 text-white" />
                </motion.div>
              </motion.div>

              {/* Label */}
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
                Start Your Campaign
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
                className="text-5xl font-extrabold tracking-tight my-3"
              >
                ৳250
              </motion.div>

              <span className="text-sm font-medium text-white/90 block mb-8">
                per 1000 calls
              </span>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/appcontact"
                  className="group/btn w-full bg-white text-orange-600 hover:bg-orange-50 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started
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