import { Metadata } from "next";
import HeroBanner from "./components/Banner";
import BenefitsComparison from "./components/BenefitsComparison";
import HomeStats from "./components/HomeStats";
import HowItWorks from "./components/HowItWorks";
import Industries from "./components/Industries";
import ProblemSolution from "./components/ProblemSolution";
import TrustSection from "./components/TrustSection";
import { CtaSection } from "./CtaSection";
import { FaqSection } from "./FaqSection";
import { PricingSection } from "./Pricing";

export const metadata: Metadata = {
  title: "aicall.bd | Cloud PBX & Business Communication Platform in Bangladesh",
  description:
    "aicall.bd helps businesses in Bangladesh manage Cloud PBX, business IP numbers, voice campaigns, call recording, customer calls, and communication analytics from one platform.",
};

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HomeStats />
      <ProblemSolution />
      <HowItWorks/>
      <Industries />
      <BenefitsComparison />
      <TrustSection/>
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
