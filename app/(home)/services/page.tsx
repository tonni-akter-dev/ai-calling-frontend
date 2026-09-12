import { Metadata } from "next";
import ServiceCompo from "./ServiceCompo";

// "use client";
export const metadata: Metadata = {
  title: "Business Communication Services in Bangladesh | aicall.bd",
  description:
    "Explore Cloud PBX, Bulk Voice Call, Cloud Recording, Caller Tune, and corporate IP number solutions for businesses in Bangladesh.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-800">
      {/* ==================== HERO BANNER ==================== */}
      <ServiceCompo />
    </div>
  );
}
