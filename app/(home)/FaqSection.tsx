"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../utils/data";

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-linear-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          Support & Help
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-5 tracking-tight leading-[1.15]">
          Frequently Asked 
          <span className="ml-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
             Questions
          </span>
        </h2>
        <p className="text-slate-500 mt-4 text-base leading-relaxed">
          Have questions about how our IP TSP platform works, setup times, or{" "}
          <br />
          regulatory compliance? Find quick answers right here.
        </p>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`group border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isOpen
                    ? "border-primary/20 bg-white shadow-lg shadow-primary/5"
                    : "border-slate-100 bg-white/70 hover:bg-white hover:border-slate-200 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-4 flex justify-between items-center transition-colors"
                >
                  <span
                    className={`text-base lg:text-lg font-bold pr-4 transition-colors ${
                      isOpen
                        ? "text-primary"
                        : "text-slate-800 group-hover:text-primary"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 text-sm lg:text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
