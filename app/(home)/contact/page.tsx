/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  HelpCircle,
  Tag,
  Wrench,
  Send,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    businessType: "",
    teamSize: "",
    monthlyCallVolume: "",
    interestedService: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const response = await emailjs.send(
        serviceID,
        templateID,
        formData,
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          text: "Thank you. Your request has been received. Our team will review your requirements and contact you shortly.",
        });
        toast.success("Request submitted successfully!", {
          description: "Our team will contact you shortly.",
        });

        setFormData({
          fullName: "",
          companyName: "",
          phone: "",
          email: "",
          businessType: "",
          teamSize: "",
          monthlyCallVolume: "",
          interestedService: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        text: "Failed to send your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      
      {/* ==================== HERO BANNER ==================== */}
      <section className="relative bg-[#0b1329] text-white pt-40 pb-28 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-100 h-100 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            LET'S TALK BUSINESS
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 leading-[1.15]">
            Let's Build a Better{" "}
            <span className="text-orange-500">
              Communication System
            </span>{" "}
            for Your Business
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Tell us what your business needs. Our team can help you choose
            Cloud PBX, a corporate IP number, Bulk Voice, Call Recording,
            Caller Tune, or a custom communication setup.
          </p>
        </div>
      </section>

      {/* ==================== FLOATING CONTACT CARDS ==================== */}
      <section className="relative -mt-16 z-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Phone */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 transition duration-200">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Phone</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                +8809611029422
              </p>
            </div>
            <Link
              href="tel:+8809611029422"
              className="w-full py-2.5 rounded-xl border border-blue-200 text-primary text-xs font-semibold hover:bg-blue-50 transition inline-flex items-center justify-center"
            >
              Call Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 transition duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">WhatsApp</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                +8809611029422
              </p>
            </div>
            <Link
              href="https://wa.me/8809611029422"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl border border-emerald-200 text-emerald-600 text-xs font-semibold hover:bg-emerald-50 transition inline-flex items-center justify-center"
            >
              Chat Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 transition duration-200">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Email</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 break-all">
                info@aicallbd.com
              </p>
            </div>
            <Link
              href="mailto:info@aicallbd.com"
              className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-600 text-xs font-semibold hover:bg-orange-50 transition inline-flex items-center justify-center"
            >
              Send Email <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Office */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 text-center flex flex-col items-center justify-between space-y-4 hover:-translate-y-1 transition duration-200">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Office</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Bogura, Sadar
              </p>
            </div>
            <Link
              href="#office-address"
              className="w-full py-2.5 rounded-xl border border-teal-200 text-teal-600 text-xs font-semibold hover:bg-teal-50 transition inline-flex items-center justify-center"
            >
              View Address
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MAIN FORM & SIDEBAR ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Lead Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-md">
            <h2 className="text-2xl font-extrabold text-primary mb-2 tracking-tight">
              Request a Consultation
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-8">
              Fill out the form below and our team will review your requirements
              and contact you shortly.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Row 1: Full Name + Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Business Type + Team Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    required
                  >
                    <option value="">Select business type</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Education">Education</option>
                    <option value="Courier & Delivery">Courier & Delivery</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Call Center">Call Center</option>
                    <option value="Service Business">Service Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Team Size
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5 employees</option>
                    <option value="6-20">6-20 employees</option>
                    <option value="21-50">21-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="100+">100+ employees</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Monthly Call Volume + Interested Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Estimated Monthly Call Volume
                  </label>
                  <select
                    name="monthlyCallVolume"
                    value={formData.monthlyCallVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                  >
                    <option value="">Select estimated volume</option>
                    <option value="Under 1,000">Under 1,000 calls</option>
                    <option value="1,000 - 5,000">1,000 - 5,000 calls</option>
                    <option value="5,000 - 20,000">5,000 - 20,000 calls</option>
                    <option value="20,000 - 50,000">20,000 - 50,000 calls</option>
                    <option value="50,000+">50,000+ calls</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Interested Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="interestedService"
                    value={formData.interestedService}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Cloud PBX">Cloud PBX</option>
                    <option value="IP Number">IP Number</option>
                    <option value="Bulk Voice">Bulk Voice</option>
                    <option value="Call Recording">Call Recording</option>
                    <option value="Caller Tune">Caller Tune</option>
                    <option value="Call Center Solution">Call Center Solution</option>
                    <option value="Custom Enterprise Solution">
                      Custom Enterprise Solution
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  required
                ></textarea>
              </div>

              {/* Success / Error Message */}
              {submitStatus && (
                <div
                  className={`rounded-xl px-4 py-3 text-xs font-medium ${
                    submitStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {submitStatus.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl text-xs transition shadow-lg shadow-blue-500/25 inline-flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Request a Consultation</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Office Card + Quick Help */}
          <div className="lg:col-span-5 space-y-6" id="office-address">
            
            {/* Office Card */}
            <div className="bg-[#0b1329] text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Our Office</span>
              </div>
              <h3 className="text-lg font-bold">aicall.bd Office</h3>
              <p className="text-slate-400 text-xs leading-relaxed space-y-1">
                <span>Bogura, Sadar</span> <br />
                <span>Bangladesh</span>
              </p>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>+8809611029422</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>info@aicallbd.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MessageCircle className="w-3.5 h-3.5 text-orange-400" />
                  <span>WhatsApp: +8809611029422</span>
                </div>
              </div>
            </div>

            {/* Contact CTA Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Not sure what you need?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tell us about your business and we will help you choose the
                right starting point.
              </p>
            </div>

            {/* Quick Help */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 px-1">
                <HelpCircle className="w-4 h-4 text-orange-500" />
                <span>Quick Help</span>
              </div>

              {/* FAQ */}
              <Link
                href="/faq"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition">
                      FAQ
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Find instant answers
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition" />
              </Link>

              {/* Pricing */}
              <Link
                href="/pricing"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                      Pricing
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      View our packages
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
              </Link>

              {/* Services */}
              <Link
                href="/services"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition">
                      Services
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Explore our solutions
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}