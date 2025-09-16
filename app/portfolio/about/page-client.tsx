"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  TrendingUp,
  MessageSquare,
  Award,
  Calendar,
} from "lucide-react";

import { ProfessionalData } from "@/config/data/data";
import OptimizedImage from "@/components/common/ui/optimized-images";

const personalStats = [
  { label: "Years of Experience", value: "11+", icon: Calendar },
  { label: "Lives Impacted", value: "500+", icon: Users },
  { label: "Years Mentoring", value: "4+", icon: Heart },
  { label: "Teams Built", value: "50+", icon: TrendingUp },
];

const journeyMilestones = [
  {
    year: "2024",
    title: "Talent Acquisition Leader",
    description:
      "Continuing to transform careers and build exceptional teams while expanding mentoring initiatives.",
    highlight: "Current Focus",
  },
  {
    year: "2020",
    title: "Senior Specialist Era",
    description:
      "Leading end-to-end recruitment for Engineering and Product teams, establishing robust frameworks.",
    highlight: "Team Building Expert",
  },
  {
    year: "2018",
    title: "Process Innovation",
    description:
      "Started focusing on recruitment process optimization and workflow enhancement.",
    highlight: "Innovation Phase",
  },
  {
    year: "2013",
    title: "Career Beginning",
    description:
      "Started the journey in talent acquisition with a passion for connecting people.",
    highlight: "The Start",
  },
];

const personalValues = [
  {
    icon: Heart,
    title: "Genuine Connection",
    description:
      "I chose HR for my genuine love of connecting with new people and transforming lives through meaningful opportunities.",
  },
  {
    icon: MessageSquare,
    title: "Mentoring Passion",
    description:
      "4+ years dedicated to guiding emerging talent and helping them grow in their careers - something I'm genuinely excited about.",
  },
  {
    icon: Award,
    title: "Results-Driven",
    description:
      "Strategic thinking combined with hands-on execution to deliver exceptional, life-changing results for professionals.",
  },
];

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-lime-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-lime-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Scrollable Content Column - Left Half */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 overflow-y-auto scrollbar-none"
          initial={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-6 lg:px-12 py-20 relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6">
              <span className="text-lime-400 text-sm font-medium">
                👋 Get to Know Me
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-lime-100 to-lime-400 bg-clip-text text-transparent mb-10 py-8 font-handwritten">
              About Priyalakshmi
            </h1>
            <p className="text-2xl text-gray-200 leading-relaxed text-left font-handwritten mb-6">
              I am a passionate Talent Acquisition professional with{" "}
              {ProfessionalData.getExperienceYears()}+ years of comprehensive
              experience in SaaS & FinTech hiring. My expertise includes
              end-to-end recruitment, building Engineering and Product teams
              from scratch, and establishing robust recruitment processes while
              continuously optimizing them for better outcomes. I have extensive
              experience in setting up talent acquisition frameworks and
              enhancing existing recruitment workflows wherever opportunities
              arise. My approach combines strategic thinking with hands-on
              execution to deliver exceptional results. Additionally, I bring 4+
              years of experience in mentoring junior team members.
            </p>
            <p className="text-2xl text-gray-200 leading-relaxed text-left font-handwritten mb-6">
              I find immense fulfillment in guiding emerging talent and helping
              them grow in their careers – it is something that I am genuinely
              proud, excited and passionate about continuing. I chose HR as a
              Career for my genuine love in connecting with new people and my
              ability to transform lives through meaningful career
              opportunities. Throughout my career, I have had the privilege of
              positively impacting thousands of professional journeys.
              Life-changing, they say – and I believe I truly deliver to that
              promise!{" "}
            </p>
            
          </div>
        </motion.div>

        {/* Fixed Image Column - Right Half */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex lg:w-1/2 fixed right-0 top-0 h-screen"
          initial={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-full">
            <OptimizedImage
              fill
              priority
              alt="Priyalakshmi - Talent Acquisition Leader"
              className="w-full h-full object-contain object-center"
              src="/images/common/priya-hero-white-1.png"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
