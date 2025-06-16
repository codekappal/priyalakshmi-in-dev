"use client";
import { ArrowRightIcon, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { businessMetrics } from "@/config/data/metrics";

const HeroSection = () => {
  return (
    <>
      <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-0 lg:px-8 bg-transparent transition-colors duration-300 pb-12">
        <div className="w-full lg:w-1/2 px-0 lg:px-8 relative z-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight font-display mb-6 text-primary mt-20 lg:-mt-20">
              Redefining <span className="text-brandsecondary">Software </span>{" "}
              For Tomorrow&apos;s
              <span className="text-brandsecondary">World </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Enterprise-grade solutions that transform businesses across
              industrial and agricultural sectors.
            </p>

            <div className="flex flex-row gap-3 mb-12 relative z-30">
              <Button
                as={Link}
                className="bg-gradient-to-tr from-indigo-500 dark:from-indigo-600 via-indigo-500/70 dark:via-indigo-500 to-indigo-500/60 dark:to-indigo-500/80 hover:bg-indigo-500 text-primary px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                href="/synergy"
                size="lg"
              >
                Explore Solutions
                <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                as={Link}
                className="border-2 border-indigo-400 text-indigo-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                href="/contact"
                size="lg"
                variant="light"
              >
                Contact Us
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start items-center pt-6 w-full">
              <div className="flex justify-center lg:justify-start items-center gap-12">
                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-400">
                    {businessMetrics.industries.count}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {businessMetrics.industries.label}
                  </p>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-400">
                    {businessMetrics.products.count}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {businessMetrics.products.label}
                  </p>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-400">
                    {businessMetrics.clients.count}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {businessMetrics.clients.label}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:grid absolute left-1/2 top-3/4 -translate-x-1/2 z-50">
          <ChevronDown className="h-8 w-8 text-indigo-400 animate-bounce" />
        </div>
        {/* Right Content - 3D Globe */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full h-full">{/* Image here */}</div>
          {/* Transparent overlay to block touch/pointer events */}
          <div className="absolute inset-0 z-50 bg-transparent pointer-events-auto" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
