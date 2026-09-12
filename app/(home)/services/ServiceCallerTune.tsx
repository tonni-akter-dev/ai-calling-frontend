"use client";

import { motion } from "framer-motion";
import { Music, ArrowRight, CheckCircle2, Play, Mic } from "lucide-react";
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

export default function ServiceCallerTune() {
  const features = [
    "Corporate welcome",
    "IVR menu",
    "Promotional announcement",
    "After-hours message",
    "Custom script recording",
    "Setup on supported business number",
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-1/4 h-100 w-100 rounded-full bg-purple-100/40 blur-3xl" />

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
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Caller Tune
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]"
            >
              Make Every Customer Call{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600">
                Feel Professional
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-slate-500 mt-5 text-base leading-relaxed"
            >
              Create branded welcome greetings, IVR announcements, promotional
              messages, and after-hours messages using professional voice
              recording.
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
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-700"
              >
                Order Caller Tune
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

     {/* Right: Image */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  className="relative"
>
  <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-purple-500/20 to-indigo-500/20 blur-2xl opacity-50" />
  <img
    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop"
    alt="Caller Tune - Voice Recording"
    className="relative w-full h-105 object-cover rounded-3xl shadow-2xl shadow-purple-500/20 border border-slate-200"
  />
</motion.div>

        </div>
      </div>
    </section>
  );
}