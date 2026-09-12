/* eslint-disable react/no-unescaped-entities */
import SolutionSection from "./SolutionSection";
import calling from '../../../public/calling-image.png'
import Image from "next/image";

export default function ProblemSolution() {
  const problems = [
    "Too many numbers and devices",
    "Manual and repetitive calling",
    "No centralized call history",
    "Limited team visibility",
    "Difficult reporting and performance monitoring",
    "Traditional systems that are harder to scale",
    "Hard-to-manage customer follow-up",
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 leading-tight">
              Business Communication Shouldn't Be Complicated
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed">
              As your business grows, managing calls through personal numbers,
              separate devices, manual follow-ups, and spreadsheets becomes
              difficult. Your team needs one system that is professional,
              manageable, and built to scale.
            </p>

            {/* 2-Column Grid List */}
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <Image
              src={calling}
              alt="Business communication challenges"
              className="relative z-10 w-full h-auto rounded-3xl  object-cover"
            />
          </div>
        </div>
      </div>
        <SolutionSection />
    </section>
  );
}
