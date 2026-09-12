"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CtaSection } from "../CtaSection";
import WhoWeAre from "./WhoWeAre";
import OurValues from "./OurValues";
import WhyWorkWithUs from "./WhyWorkWithUs";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white font-sans antialiased text-slate-800">
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] pt-40 pb-24 text-white text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute -bottom-40 right-0 w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Simplifying Business Communication for Modern Businesses in
              Bangladesh
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            aicall.bd is built to help businesses communicate professionally,
            manage calls efficiently, and scale their customer communication
            with practical cloud-based tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 font-medium">About Us</span>
          </motion.div>
        </div>
      </section>
      <WhoWeAre />
      <OurValues />
      <WhyWorkWithUs />
      <CtaSection
        title="Ready to Modernize"
        highlightedText="Your Business Communication?"
        description="Talk to our team and tell us what your business needs."
        primaryCtaText="Talk to Our Team"
        primaryCtaHref="/contact"
        showSecondaryCta={false}
      />
    </div>
  );
}
