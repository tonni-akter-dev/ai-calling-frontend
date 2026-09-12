import React from "react";
import { PhoneCall, Cloud, Disc } from "lucide-react";
import Link from "next/link";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <PhoneCall className="w-6 h-6 text-primary" />,
    title: "Bulk Voice Call",
    description:
      "Reach thousands of customers instantly with automated voice calls. Personalized campaigns created in seconds.",
  },
  {
    icon: <Cloud className="w-6 h-6 text-indigo-600" />,
    title: "Cloud PBX",
    description:
      "Virtual phone system built for modern teams. Includes routing, extension management, and caller ID customisation.",
  },
  {
    icon: <Disc className="w-6 h-6 text-cyan-600" />,
    title: "Cloud Recording",
    description:
      "Record incoming & outgoing calls securely in real time. Full cloud storage with zero quality loss.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
            Complete Communication
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
            Everything you need for seamless messaging & voice
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.description}</p>
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700"
              >
                Learn More <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};