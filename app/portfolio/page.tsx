import React from "react";

import { HeroSection } from "@/components/portfolio/hero-section";
import { ExpertiseSection } from "@/components/portfolio/expertise-section";

export const metadata = {
  title: "Priyalakshmi - Talent Acquisition Specialist",
  description:
    "Passionate Talent Acquisition professional with 11+ years of comprehensive experience in SaaS & FinTech recruitment",
};

export default function PortfolioHome() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Core Expertise */}
      <ExpertiseSection />
    </main>
  );
}
