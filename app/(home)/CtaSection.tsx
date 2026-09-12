import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";

interface CtaSectionProps {
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  showSecondaryCta?: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Make Your Business",
  highlightedText = "Communication Smarter",
  description = "Bring your calls, numbers, campaigns, contacts, recordings, and communication management together in one platform.",
  primaryCtaText = "Start Free Demo",
  primaryCtaHref = "/register",
  secondaryCtaText = "Talk to Sales",
  secondaryCtaHref = "/contact",
  showSecondaryCta = true,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-primary via-[#0B1329] to-[#0F1E55] py-16 sm:py-20">
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-75 w-150 rounded-full bg-orange-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-75 w-125 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.15]">
          {title} <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
            {highlightedText}
          </span>
        </h2>

        {/* Subtitle */}
        {description && (
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary Button */}
          <Link
            href={primaryCtaHref}
            className="group w-full sm:w-auto bg-white text-primary hover:bg-slate-100 px-7 py-3.5 rounded-xl font-bold transition-all duration-300 text-sm inline-flex items-center justify-center shadow-xl shadow-white/5"
          >
            {primaryCtaText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Secondary Button */}
          {showSecondaryCta && (
            <Link
              href={secondaryCtaHref}
              className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold transition-all duration-300 text-sm inline-flex items-center justify-center"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-orange-400" />
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};