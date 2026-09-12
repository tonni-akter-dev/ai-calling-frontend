import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Cloud PBX Pricing in Bangladesh | aicall.bd",
  description:
    "Compare aicall.bd Cloud PBX plans for small teams, growing businesses, and larger organizations. Clear monthly pricing with separate usage and add-on information.",
};

const Pricing = () => {
  return (
    <>
      <PricingClient />
    </>
  );
};

export default Pricing;
