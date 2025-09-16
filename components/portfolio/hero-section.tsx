"use client";
import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Mail, Linkedin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import OptimizedImage from "../common/ui/optimized-images";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-black via-black/40 to-black flex items-center justify-center overflow-hidden">
      {/* Fixed Background Image */}
      <div className="fixed top-40 right-0 w-1/2 h-[80vh] z-0 lg:block hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            fill
            priority
            alt="Priyalakshmi - Talent Acquisition Leader"
            className="w-full h-full object-contain object-center"
            src="/images/common/priya-hero.png"
          />
          {/* Gradient overlay to blend with the background */}
          {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" /> */}
        </div>
      </div>

      {/* Mobile Fixed Background Image */}
      <div className="fixed top-0 right-0 w-2/3 h-1/2 z-0 lg:hidden block">
        <OptimizedImage
          fill
          priority
          alt="Priyalakshmi - Talent Acquisition Leader"
          className="w-full h-full object-cover object-center opacity-50"
          src="/images/common/priya-hero.png"
        />
        {/* Gradient overlay for mobile */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/70" />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/3 rounded-full blur-3xl" />
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(132,204,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(132,204,22,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Takes full width on mobile, left half on desktop */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-lime-100 to-lime-400 bg-clip-text text-transparent leading-tight font-handwritten">
                Talent Acquisition Leader
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 font-light font-handwritten">
                <span className="text-lime-400 font-semibold">
                  HR, is my calling!
                </span>
              </h2>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
            
              <Link
                className="text-gray-400 hover:text-lime-400 transition-colors"
                href="https://linkedin.com/in/priyalakshmi-r"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </motion.div>

          {/* Empty space for desktop layout balance - image is now fixed in background */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-lime-500/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-lime-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};
