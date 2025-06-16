import React from "react";
import { Metadata } from "next";

import AboutPageClient from "./page-client";

export const metadata: Metadata = {
  title: "About - Priyalakshmi",
  description:
    "Learn more about Priyalakshmi's journey in talent acquisition and HR",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
