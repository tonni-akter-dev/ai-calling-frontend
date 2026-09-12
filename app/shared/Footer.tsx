import React from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => {
  /* ============ LINK DATA ============ */
  const companyLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Cloud PBX", href: "/services/cloud-pbx" },
    { name: "Bulk Voice", href: "/services/bulk-voice" },
    { name: "Call Recording", href: "/services/call-recording" },
    { name: "Caller Tune", href: "/caller-tune" },
    { name: "IP Number", href: "/ip-number" },
  ];

  const supportLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "Help / Setup Guides", href: "/help" },
    { name: "Contact Support", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const accountLinks = [
    { name: "Login", href: "/login" },
    { name: "Create Account", href: "/register" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Recharge", href: "/recharge" },
  ];

  return (
    <footer className="bg-primary text-slate-400 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================== FOOTER CTA ==================== */}
        <div className="pt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Need a Business Communication Solution?
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Talk to our team and find the right starting point for your business.
              </p>
            </div>

            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange-500/50 shrink-0"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* ==================== TOP GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 py-16 border-b border-white/10">

          {/* Brand Column — Spans 2 */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-bold text-white tracking-tight">
                aicall<span className="text-orange-400">.bd</span>
              </span>
            </Link>

            <p className="text-sm font-medium text-orange-400 leading-snug">
              Smarter Business Communication. Built for Your Business.
            </p>

            <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
              aicall.bd helps businesses manage calls, Cloud PBX, business IP
              numbers, voice campaigns, recordings, contacts, billing, and
              communication activity from one centralized platform.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links + Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Account
            </h4>
            <ul className="space-y-3 text-sm mb-7">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

        </div>


        {/* ==================== BOTTOM BAR ==================== */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="order-2 md:order-1 text-center md:text-left">
            © 2026 aicall.bd. All rights reserved.
          </p>

          <div className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund"
              className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};