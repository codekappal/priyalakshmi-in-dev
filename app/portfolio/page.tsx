import React from "react";

import { getPortfolioBlogPosts } from "./utils";

import { HeroSection } from "@/components/portfolio/hero-section";
import { ExpertiseSection } from "@/components/portfolio/expertise-section";
import { BlogSection } from "@/components/portfolio/blog-section";

export const metadata = {
  title: "Priyalakshmi - Talent Acquisition Specialist",
  description:
    "Passionate Talent Acquisition professional with 11+ years of comprehensive experience in SaaS & FinTech recruitment",
};

export default function PortfolioHome() {
  // Get highlighted blog posts and sort by date (newest first), take only the first 3
  const blogPosts = getPortfolioBlogPosts()
    .filter((post) => post.metadata.highlighted === true)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <HeroSection />
      {/* Blog Highlights */}
      <BlogSection blogPosts={blogPosts} />
      
    </main>
  );
}
