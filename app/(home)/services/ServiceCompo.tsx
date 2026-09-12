'use client'
import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { CtaSection } from "../CtaSection";

import ServiceCloudPBX from "./ServiceCloudPBX";
import ServiceBulkVoice from "./ServiceBulkVoice";
import ServiceCloudRecording from "./ServiceCloudRecording";
import ServiceIPNumber from "./ServiceIPNumber";
import ServiceCallerTune from "./ServiceCallerTune";

const ServiceCompo = () => {
  return (
    <div>
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
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Business Communication Solutions
            </span>{" "}
            Built Around Your Workflow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Choose the services your business needs — from Cloud PBX and
            corporate IP numbers to bulk voice campaigns, recording, and
            professional caller greetings.
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
            <span className="text-orange-400 font-medium">Services</span>
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES (Zigzag Alternating) ==================== */}
      <ServiceCloudPBX />
      <ServiceBulkVoice />
      <ServiceCloudRecording />
      <ServiceIPNumber />
      <ServiceCallerTune />

      {/* ==================== CTA ==================== */}
      <CtaSection
        title="Not Sure Which Service"
        highlightedText="Your Business Needs?"
        description="Talk to our team and we'll help you choose the right communication solution for your workflow."
        primaryCtaText="Talk to Sales"
        primaryCtaHref="/contact"
        secondaryCtaText="View Pricing"
        secondaryCtaHref="/pricing"
      />
    </div>
  )
}

export default ServiceCompo
