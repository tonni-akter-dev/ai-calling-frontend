import React from 'react'
import {
  Smartphone,
  Cpu,
  ArrowRight,
} from "lucide-react";
const Compatible = () => {
  return (
    <div>
        <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Compatible VoIP Softphones
          </h2>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto mb-10">
            Configure your AI CALL BD account with standard SIP clients. We highly recommend Zoiper for the best calling experience.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {/* Zoiper Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Zoiper Softphone</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Powerful softphone application for Windows, Android, iOS, and macOS. Fully compatible with our network for seamless voice, video, and SMS features.
                </p>
                <button className="mt-2 text-xs font-semibold text-primary hover:text-blue-700 inline-flex items-center">
                  Get Zoiper Setup Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            {/* Other Devices Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Other SIP Devices</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Works seamlessly with standard SIP-compliant IP phones, softphones, ATA adapters, and VoIP hardware gateways.
                </p>
                <button className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center">
                  View Hardware Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Compatible
