"use client";

import { motion } from "framer-motion";
import { Volume2, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default function BulkVoiceCall() {
  const perfectForItems = [
    "Promotional campaigns",
    "Eid Mubarak greetings",
    "Awareness messages",
    "Payment reminders",
    "Event announcements",
    "Customer feedback calls",
  ];

  const features = [
    "API integration for automated campaigns",
    "Reach thousands of customers at once",
    "Real-time delivery tracking",
    "Custom voice message recording",
    "Campaign analytics and reports",
    "Schedule campaigns in advance",
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
        
        {/* ============ LEFT: Pricing Card Stack ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInLeft}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm group/card">
            
            {/* Orange Tilted Card - Hover: More tilt + lift */}
            <motion.div
              whileHover={{ rotate: -6, y: -8, scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 -rotate-3 bg-linear-to-br from-orange-500 to-amber-600 rounded-3xl p-7 text-white text-center shadow-2xl shadow-orange-500/30 transition-shadow duration-500 group-hover/card:shadow-orange-500/50"
            >
              
              {/* Icon Circle - Rotating on hover */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-5 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Volume2 className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>

              {/* Price - Counting-like pop effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.5 }}
                className="text-5xl font-extrabold tracking-tight"
              >
                ৳250
              </motion.div>
              <div className="text-sm font-medium opacity-90 mt-1">
                per month
              </div>

              {/* Pill Button - Pulse on card hover */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 mt-5 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-[11px] font-semibold cursor-default"
              >
                <Check className="w-3 h-3" />
                With API Integration
              </motion.div>
            </motion.div>

            {/* White Card - Overlapping */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              className="relative -mt-10 pt-16 bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-shadow duration-500 hover:shadow-2xl hover:shadow-orange-100/50"
            >
              
              <h4 className="text-base font-bold text-slate-900 mb-4 px-1">
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
                    whileHover={{ x: 6, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group/item flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 cursor-default"
                  >
                    <motion.span
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center shrink-0"
                    >
                      <Check className="w-2.5 h-2.5 text-white stroke-3" />
                    </motion.span>
                    <span className="text-xs font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

          </div>
        </motion.div>

        {/* ============ RIGHT: Service Details ============ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="md:col-span-7 space-y-6"
        >
          
          {/* Badge */}
          <motion.div
            variants={fadeInRight}
            className="inline-flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-[0.15em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Volume2 className="w-3.5 h-3.5" />
            </motion.span>
            <span>Bulk Voice Call with API</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInRight}
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]"
          >
            Reach Thousands{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
              Simultaneously
            </span>{" "}
            with Voice Broadcasts
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            variants={fadeInRight}
            className="text-slate-500 text-base leading-relaxed"
          >
            Reach thousands of customers simultaneously with our Bulk Voice Call
            service. Perfect for promotional campaigns, reminders, notifications,
            and announcements.
          </motion.p>

          <motion.p
            variants={fadeInRight}
            className="text-slate-500 text-base leading-relaxed"
          >
            Integrate with your existing systems using our powerful API. Automate
            your voice campaigns and track delivery in real-time through our
            management panel.
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
            variants={fadeInRight}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
          >
            {/* Primary Button - Arrow slide + shadow glow on hover */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40"
              >
                View Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>

            {/* Secondary Button - Border glow on hover */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-primary/20 hover:border-primary/60 hover:bg-primary/5 text-primary px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
              >
                Get API Access
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}