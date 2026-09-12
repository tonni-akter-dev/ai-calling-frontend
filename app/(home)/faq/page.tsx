/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Minus,
  MessageSquare,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/app/utils/data";


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
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};



export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800">
      
      {/* ============ HERO ============ */}
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] pt-80 pb-24 text-white text-center overflow-hidden">
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

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            SUPPORT & HELP
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1]"
          >
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Questions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Find quick answers about our platform, services, and setup process.
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
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-orange-400 font-medium">FAQ</span>
          </motion.div>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px" }}
              variants={staggerContainer}
              className="lg:col-span-4 lg:sticky lg:top-30 lg:self-start"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Help Center
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]"
              >
                Got Questions?{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                  We've Got Answers.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-slate-500 mt-5 text-base leading-relaxed"
              >
                Browse the most common questions about our platform. Still can't
                find what you're looking for? Our team is just a message away.
              </motion.p>

              {/* Support Card */}
              <motion.div
                variants={fadeInUp}
                className="mt-8 relative overflow-hidden bg-linear-to-br from-[#0A1128] via-[#0F1E55] to-[#0A1128] rounded-3xl p-6 text-white"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
                
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5 text-orange-400" />
                  </div>
                  
                  <h3 className="text-base font-bold mb-1.5">
                    Still need help?
                  </h3>
                  <p className="text-blue-100/70 text-xs leading-relaxed mb-5">
                    Talk to our support team and get answers directly.
                  </p>

                  <div className="space-y-2">
                    <Link
                      href="/contact"
                      className="group flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs font-bold">Call Support</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-200/50 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="mailto:support@aicall.bd"
                      className="group flex items-center justify-between gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs font-bold">Email Us</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-200/50 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ============ RIGHT: FAQ Accordion ============ */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-8"
            >
              <div className="space-y-3">
                {faqs.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-primary/20 bg-white shadow-lg shadow-primary/5"
                          : "border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-primary text-sm md:text-base transition-colors group/btn"
                      >
                        <span className="flex items-start gap-4 flex-1">
                          <span
                            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                              isOpen
                                ? "bg-primary text-white"
                                : "bg-slate-200 text-slate-600 group-hover/btn:bg-primary group-hover/btn:text-white"
                            }`}
                          >
                            Q
                          </span>
                          <span className="flex-1 leading-snug pt-0.5">
                            {item.question}
                          </span>
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? "bg-primary text-white"
                              : "bg-white text-slate-500 border border-slate-200 group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:border-primary"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 md:px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/60">
                              <div className="flex items-start gap-4">
                                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold bg-emerald-100 text-emerald-700 mt-3">
                                  A
                                </span>
                                <p className="flex-1 pt-3">{item.answer}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="relative bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] text-white py-24 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-125 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-[1.15]"
            >
              Still Have{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
                Questions?
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-300 text-base max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Our support team is ready to help. Reach out via phone, WhatsApp,
              or email.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-primary hover:bg-slate-100 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg"
              >
                Contact Support
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="https://wa.me/8801891116631"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                WhatsApp Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}