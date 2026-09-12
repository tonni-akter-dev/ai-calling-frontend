/* eslint-disable react/no-unescaped-entities */
import {
  Mic,
  MessageSquare,
  FileText,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Headphones,
  Settings,
  Sparkles,
  Music,
  BadgeCheck,
  Star,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Business Caller Tune & IVR Voice Recording | aicall.bd",
  description:
    "Create professional business welcome greetings, IVR announcements, promotional messages, and after-hours voice recordings.",
};

export default function CallerTunePage() {
  /* ============ WHAT WE CAN CREATE ============ */
  const greetingTypes = [
    {
      icon: PhoneCall,
      title: "Corporate Welcome Greeting",
      desc: "Professional welcome message for your business number.",
      bgColor: "bg-blue-50 text-primary",
    },
    {
      icon: Headphones,
      title: "Customer Service IVR",
      desc: "Interactive menu with department routing options.",
      bgColor: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: Settings,
      title: "Department Routing Message",
      desc: "Guide callers to Sales, Support, or any department.",
      bgColor: "bg-violet-50 text-violet-600",
    },
    {
      icon: Sparkles,
      title: "Promotional Offer",
      desc: "Announce special offers and seasonal promotions.",
      bgColor: "bg-amber-50 text-amber-600",
    },
    {
      icon: Music,
      title: "After-Hours Message",
      desc: "Let customers know your business hours.",
      bgColor: "bg-rose-50 text-rose-600",
    },
    {
      icon: BadgeCheck,
      title: "Holiday / Campaign Greeting",
      desc: "Custom greetings for festivals and campaigns.",
      bgColor: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: FileText,
      title: "Custom Brand Announcement",
      desc: "Any business announcement in a professional voice.",
      bgColor: "bg-cyan-50 text-cyan-600",
    },
  ];

  /* ============ HOW IT WORKS ============ */
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Contact Us",
      desc: "Tell us what kind of greeting you need.",
      bgColor: "bg-blue-50 text-primary",
    },
    {
      step: "02",
      icon: FileText,
      title: "Share Your Script",
      desc: "Send your approved text or ask our team for help structuring it.",
      bgColor: "bg-amber-50 text-amber-600",
    },
    {
      step: "03",
      icon: Mic,
      title: "Voice Recording",
      desc: "The selected professional voice artist records the script.",
      bgColor: "bg-rose-50 text-rose-600",
    },
    {
      step: "04",
      icon: CheckCircle2,
      title: "Review & Setup",
      desc: "After approval, the recording is prepared and configured for the supported service.",
      bgColor: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* ==================== 1. HERO BANNER ==================== */}
      <section className="relative bg-[#0b1329] text-white pt-40 pb-30 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-100 h-100 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
            <Mic className="w-3.5 h-3.5 text-orange-400" />
            PROFESSIONAL VOICE GREETINGS
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.15]">
            Give Your Customers a <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Professional First Impression
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Create a custom business greeting for your IP number, IVR, <br />
            promotional message, or after-hours announcement.
          </p>

          <div className="mt-6 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>{" "}
            <span className="mx-2">/</span>{" "}
            <span className="text-orange-400">Caller Tune</span>
          </div>
        </div>
      </section>

      {/* ==================== 2. MAIN CONTENT: INFO + SAMPLE AUDIO ==================== */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xs">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Professional Voice Recording
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Turn Your Script Into a Clear,{" "}
              <span className="text-primary">Professional Voice Greeting</span>
            </h2>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
              Our team can help turn your approved script into a clear,
              professional voice greeting suitable for your business
              communication flow.
            </p>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
              Whether you need a welcome greeting, IVR menu, promotional
              announcement, or after-hours message — our expert voice artists
              deliver high-quality recordings that represent your brand
              professionally.
            </p>

            <div className="bg-[#0b1329] text-white rounded-2xl p-6 mb-8 flex items-center space-x-4 border border-slate-800 shadow-md">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-orange-400 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PER VOICE RECORDING
                </span>
                <div className="text-3xl font-extrabold text-white">৳150</div>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  by Professional Voice Artist
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-semibold transition inline-flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
              >
                <span>Order a Caller Tune</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://wa.me/8809611029422"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl text-xs font-semibold transition inline-flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Us</span>
              </Link>
            </div>

            <p className="text-[11px] text-slate-400 mt-5 italic">
              * Price should be confirmed by the business before publication.
            </p>
          </div>

          <div className="lg:col-span-5 bg-slate-50/70 rounded-3xl p-6 border border-slate-200/70">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-primary flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Sample Recordings
              </h3>
            </div>

            <div className="space-y-3">
              {sampleRecordings.map((sample, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-blue-200 transition flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <button className="w-8 h-8 rounded-full bg-blue-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition shrink-0">
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {sample.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {sample.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    {sample.duration}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-6 italic">
              * Audio samples coming soon. Contact us to hear live samples.
            </p>
          </div>
        </div>
      </section> */}

      {/* ==================== 3. WHAT WE CAN CREATE ==================== */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              What We Can Create
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-5 tracking-tight">
              Greetings for Every{" "}
              <span className="text-primary">Business Scenario</span>
            </h2>
            <p className="text-slate-500 mt-4 text-sm leading-relaxed">
              From corporate welcome greetings to after-hours messages — we <br />
              create  the perfect voice for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {greetingTypes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group cursor-pointer bg-slate-50/60 rounded-3xl p-6 border border-slate-200/60 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div 
                    className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}

            {/* CTA Card - 8th card to fill grid */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0b1329] text-white p-6 group">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-bold text-sm mb-2 leading-snug">
                  Need a Custom Greeting?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  Tell us your idea and we'll turn it into a professional voice recording.
                </p>
                <Link
                  href="/contact"
                  className="group/link inline-flex items-center text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Talk to Our Team
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. HOW IT WORKS ==================== */}
      <section
        className="py-20 bg-[#F8FAFC] border-t border-b border-slate-100"
        id="order"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary bg-primary/5 px-4 py-2 rounded-full border border-primary/10 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Order in{" "}
              <span className="text-primary">4 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white cursor-pointer rounded-3xl p-6 border border-slate-200/60 text-center flex flex-col items-center relative hover:border-blue-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center mb-3">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 5. BOTTOM CTA ==================== */}
      <section className="relative bg-[#0b1329] text-white py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Mic className="w-6 h-6 text-orange-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-[1.15]">
            Ready for a{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              Professional Caller Tune?
            </span>
          </h2>

          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Contact our customer care team to place your order today. We'll help
            you create the perfect voice greeting for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-xl text-xs font-semibold transition inline-flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center"
            >
              <span>Order a Caller Tune</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="https://wa.me/8809611029422"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl text-xs font-semibold transition inline-flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}