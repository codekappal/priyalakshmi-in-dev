import React from "react";

import { ExperienceSection } from "@/components/portfolio/experience-section";

export const metadata = {
  title: "Experience - Priyalakshmi",
  description:
    "Professional experience and career journey in talent acquisition",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <ExperienceSection />
    </div>
  );
}
