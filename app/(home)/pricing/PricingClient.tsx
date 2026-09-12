"use client";
import { Check, Phone, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Packages } from "./Packages";
import BulkVoiceSection from "./BulkVoiceSection";
import { CtaSection } from "../CtaSection";
import Image from "next/image";
import payment from "../../../public/sslcommerz-badge.webp";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function PricingClient() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
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
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Pricing Plans
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Transparent, affordable pricing for every business size. No <br />{" "}
            hidden charges.
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
            <span className="text-orange-400 font-medium">Pricing</span>
          </motion.div>
        </div>
      </section>

      <Packages />
      <BulkVoiceSection />

      {/* 5. Feature Comparison Table */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Feature Comparison
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Compare features side-by-side to choose the best solution for your
              business needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0b1329] text-white text-xs uppercase tracking-wider">
                  <th className="p-4 rounded-tl-2xl">Features</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center bg-primary">Pro</th>
                  <th className="p-4 text-center rounded-tr-2xl">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-xs text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Monthly Rate</td>
                  <td className="p-4 text-center">৳ 1000</td>
                  <td className="p-4 text-center font-bold text-primary bg-blue-50/40">
                    ৳ 1500
                  </td>
                  <td className="p-4 text-center">৳ 2000</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Extensions</td>
                  <td className="p-4 text-center">05</td>
                  <td className="p-4 text-center bg-blue-50/40">10</td>
                  <td className="p-4 text-center">20</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Call Channels</td>
                  <td className="p-4 text-center">02</td>
                  <td className="p-4 text-center bg-blue-50/40">05</td>
                  <td className="p-4 text-center">10</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Setup Assistance</td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50/40">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Call Rate</td>
                  <td className="p-4 text-center">40p+VAT</td>
                  <td className="p-4 text-center bg-blue-50/40">40p+VAT</td>
                  <td className="p-4 text-center">40p+VAT</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">24/7 Support</td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50/40">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Multi-Level IVR</td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50/40">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Call Forwarding</td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center bg-blue-50/40">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Recording Storage</td>
                  <td className="p-4 text-center">+৳99/mo</td>
                  <td className="p-4 text-center bg-blue-50/40">+৳99/mo</td>
                  <td className="p-4 text-center">+৳99/mo</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-semibold">Activation Fee</td>
                  <td className="p-4 text-center font-semibold text-emerald-600">
                    ৳1,000
                  </td>
                  <td className="p-4 text-center font-semibold text-emerald-600 bg-blue-50/40">
                    ৳500
                  </td>
                  <td className="p-4 text-center font-semibold text-emerald-600">
                    FREE
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Custom Solution Card */}
      <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
        {/* Subtle background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-[700px] rounded-full bg-blue-100/30 blur-3xl"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="group relative bg-white border border-slate-100 rounded-3xl p-10 md:p-14 text-center shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
          >
            {/* Decorative glows inside card */}
            <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              {/* Icon Circle with pulse */}
              <motion.div
                variants={fadeInUp}
                className="flex justify-center mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-20 h-20 rounded-full bg-linear-to-br from-primary to-[#0F1E55] flex items-center justify-center shadow-lg shadow-primary/30 cursor-pointer"
                >
                  {/* Pulse ring */}
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-primary/30"
                  />
                  <HelpCircle className="w-9 h-9 text-white relative z-10" />
                </motion.div>
              </motion.div>

              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Custom Solutions
              </motion.div>

              {/* Heading */}
              <motion.h3
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-[1.15]"
              >
                Need a{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
                  Custom Solution?
                </span>
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-500 text-base max-w-xl mx-auto mb-10 leading-relaxed"
              >
                For high call volumes, specialized SIP trunking, or custom
                software integration, our engineers can tailor a package
                specifically for your company.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                {/* Primary Button */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="#contact"
                    className="group/btn inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40"
                  >
                    Request Custom Pricing
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Secondary Button (Call) */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="tel:09612000000"
                    className="inline-flex items-center justify-center gap-2 w-full border-2 border-primary/20 hover:border-primary/60 hover:bg-primary/5 text-primary px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    09612 000 000
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Accepted Payment Methods */}
      <section className="py-12 bg-slate-50/50 border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h4 className="text-2xl font-bold text-slate-900 uppercase tracking-wider mb-2">
            Accepted Payment Methods
          </h4>
          <p className="text-slate-500 text-base mb-4">
            Pay seamlessly using mobile financial services, local debit/credit
            cards, or online banking.
          </p>
          <div className="py-4 border-b border-white/10">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="flex-1 w-full">
                <div>
                  <Image
                    src={payment} // <-- apnar public folder er image naam ekhane din
                    alt="Accepted Payment Methods"
                    width={1200}
                    height={80}
                    className="w-full h-auto object-contain"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </div>
  );
}
