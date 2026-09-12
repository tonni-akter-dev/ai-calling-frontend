/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Rocket,
  Eye,
  ShieldCheck,
  Sparkles,
  ScanEye,
  Headphones,
  Lightbulb,
  Handshake,
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const WhoWeAre = () => {
  const values = [
    { icon: ShieldCheck, title: "Reliability" },
    { icon: Sparkles, title: "Simplicity" },
    { icon: ScanEye, title: "Transparency" },
    { icon: Headphones, title: "Customer Support" },
    { icon: Lightbulb, title: "Practical Innovation" },
    { icon: Handshake, title: "Long-Term Partnership" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-175 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================== WHO WE ARE (Top Row) ==================== */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-6 space-y-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Who We Are
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
            >
              Simplifying Business{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                Communication.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 text-base leading-relaxed"
            >
              Business communication should be simple, professional, and easy
              to manage. aicall.bd brings essential communication tools together
              so businesses can reduce manual work, improve visibility, and
              create a more organized calling experience.
            </motion.p>
          </motion.div>

          {/* Right Side - Mission & Vision Stack */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-6 space-y-6"
          >
            {/* Mission Card */}
            <motion.div
              variants={fadeInUp}
              className="group relative bg-linear-to-br from-primary to-[#0F1E55] rounded-3xl p-8 overflow-hidden shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <Rocket className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Our Mission
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  To make business communication simpler, more accessible, and
                  easier to manage for businesses across Bangladesh.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeInUp}
              className="group bg-white rounded-3xl p-8 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Our Vision
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                To become a trusted business communication technology partner
                for growing organizations in Bangladesh.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ==================== OUR VALUES (Divider) ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-12 bg-linear-to-r from-transparent to-orange-500/60" />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em]">
              Our Values
            </span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-orange-500/60" />
          </motion.div>
          <motion.h3
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight"
          >
            What We Stand For
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="text-slate-500 mt-4 text-sm leading-relaxed"
          >
            The principles that guide every decision, every product, and every
            customer interaction.
          </motion.p>
        </motion.div>

        {/* ==================== VALUES GRID ==================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhoWeAre;