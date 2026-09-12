/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import {  ArrowRight, CheckCircle2 } from "lucide-react";
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

export default function ServiceCloudRecording() {
  const features = [
    "Automatic recording",
    "Cloud storage",
    "Playback",
    "Download",
    "Recording management",
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-100 w-100 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Cloud Recording
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]"
            >
              Keep Important Business{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600">
                Conversations Accessible
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-5 text-base leading-relaxed"
            >
              Record supported business calls and review available recordings
              for service quality, training, support, and business records.
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Get Cloud Recording
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual Mockup */}
          {/* Right: Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-emerald-500/20 to-teal-500/20 blur-2xl opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Cloud Recording - Customer Support"
              className="relative w-full h-105 object-cover rounded-3xl shadow-2xl shadow-emerald-500/20 border border-slate-200"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
