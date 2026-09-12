import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up for aicall.bd and access your business communication dashboard.",
  },
  {
    num: "02",
    title: "Set Up Your Communication",
    desc: "Choose your service, business number, extensions, contacts, campaigns, and supported communication settings.",
  },
  {
    num: "03",
    title: "Start Communicating",
    desc: "Start managing business calls and customer communication from one centralized platform.",
  },
];

export default function HowItWorks() {
  return (
    <section className="pb-32 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-100 w-full max-w-4xl bg-linear-to-b from-blue-50/50 to-transparent blur-3xl opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 tracking-tight">
            Get Started in   <span className="ml-2 text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-800">
             3 Simple Steps
          </span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative w-full flex justify-center items-center mb-4">
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-1/2 w-full h-0.75 bg-linear-to-r from-primary/30 to-primary/10 -translate-y-1/2 z-0" />
                )}

                {/* Step Number Circle */}
                <div className="cursor-pointer relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary to-blue-900 text-white font-bold text-xl shadow-xl shadow-primary/20 border-4 border-white transition-transform duration-500 hover:scale-110">
                  {step.num}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 min-h-14 flex items-end justify-center">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
