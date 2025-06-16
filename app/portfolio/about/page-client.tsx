"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  TrendingUp,
  MessageSquare,
  Award,
  Coffee,
  Calendar,
  Mail,
  Linkedin,
} from "lucide-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

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

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6">
            <span className="text-lime-400 text-sm font-medium">
              👋 Get to Know Me
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-lime-100 to-lime-400 bg-clip-text text-transparent mb-6 font-handwritten">
            About Priyalakshmi
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A passionate Talent Acquisition professional transforming careers
            and building exceptional teams
          </p>
        </motion.div>

        {/* Personal Stats */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {personalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/20 text-center group hover:border-lime-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lime-400 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Personal Story */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 font-handwritten">
              My Journey & Passion
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                I am a passionate Talent Acquisition professional with{" "}
                <span className="text-lime-400 font-semibold">
                  11+ years of comprehensive experience
                </span>{" "}
                in SaaS & FinTech recruitment. My expertise encompasses
                end-to-end recruitment, building Engineering and Product teams
                from scratch, and establishing robust recruitment processes.
              </p>

              <p>
                What drives me is the{" "}
                <span className="text-lime-400 font-semibold">
                  genuine love for connecting with new people
                </span>{" "}
                and my ability to transform lives through meaningful career
                opportunities. Throughout my career, I&apos;ve had the privilege
                of positively impacting hundreds of professionals&apos;
                journeys.
              </p>

              <p>
                I find immense fulfillment in{" "}
                <span className="text-lime-400 font-semibold">
                  mentoring junior team members
                </span>{" "}
                and helping them grow in their careers – it&apos;s something
                I&apos;m genuinely excited about and passionate about
                continuing.
              </p>

              <div className="bg-gradient-to-r from-lime-500/10 to-lime-500/5 rounded-2xl p-6 border border-lime-500/20 mt-8">
                <div className="flex items-start gap-4">
                  <Coffee className="h-6 w-6 text-lime-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lime-400 font-semibold mb-2">
                      Let&apos;s Connect!
                    </h3>
                    <p className="text-gray-300 text-sm">
                      I&apos;m always open to conversations about Human
                      Resources – whether it&apos;s recruitment strategies, team
                      building, process optimization, or mentoring and
                      development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 font-handwritten">
              Career Milestones
            </h2>
            <div className="space-y-6">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative pl-8 border-l-2 border-lime-500/30 last:border-l-0"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 * index + 0.8 }}
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-lime-500 rounded-full border-4 border-gray-900" />
                  <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl p-4 border border-lime-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lime-400 font-bold text-lg">
                        {milestone.year}
                      </span>
                      <span className="text-xs bg-lime-500/20 text-lime-300 px-2 py-1 rounded-full">
                        {milestone.highlight}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-handwritten">
              What Drives Me
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The core values and principles that guide my approach to talent
              acquisition and mentoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalValues.map((value, index) => (
              <motion.div
                key={value.title}
                animate={{ opacity: 1, y: 0 }}
                className="group text-center"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.2 * index + 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-lime-500/10 to-lime-500/5 rounded-3xl p-8 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-lime-500/10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-500/20 border border-lime-500/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-lime-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-lime-500/10 via-lime-500/5 to-emerald-500/10 rounded-3xl p-12 border border-lime-500/20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-handwritten">
            Ready to Connect?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking for talent acquisition insights, career
            guidance, or just want to have a conversation about HR strategies,
            I&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              className="bg-lime-500 text-black hover:bg-lime-400 font-semibold px-8 py-6 text-lg"
              href="/portfolio/contact"
              size="lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>

            <Button
              as={Link}
              className="border-2 border-lime-500/30 text-lime-400 hover:bg-lime-500/10 px-8 py-6 text-lg"
              href="https://linkedin.com/in/priyalakshmi"
              size="lg"
              target="_blank"
              variant="ghost"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              Connect on LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
