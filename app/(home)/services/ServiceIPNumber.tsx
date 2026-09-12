/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Hash, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ServiceIPNumber() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 h-100 w-100 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
   {/* Left: Image (Reversed) */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  className="relative lg:order-1"
>
  <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-blue-500/20 to-indigo-500/20 blur-2xl opacity-50" />
  <img
    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop"
    alt="Business IP Number - Office Phone"
    className="relative w-full h-105 object-cover rounded-3xl shadow-2xl shadow-primary/20 border border-slate-200"
  />
</motion.div>
          {/* Right: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:order-1"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
           Business IP Number
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight leading-[1.15]">
              Give Your Business{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                One Professional Number
              </span>
            </h2>

            <p className="text-slate-500 mt-5 text-base leading-relaxed">
              Create a consistent customer-facing number and connect it with
              your Cloud PBX and team extensions.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">One Consistent Number</p>
                  <p className="text-xs text-slate-500 mt-0.5">Customers always reach your business through one official number.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                  <Hash className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Connected to Your PBX</p>
                  <p className="text-xs text-slate-500 mt-0.5">Seamlessly works with your Cloud PBX and team extensions.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Get an IP Number
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}