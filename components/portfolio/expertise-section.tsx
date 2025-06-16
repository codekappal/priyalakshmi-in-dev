"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  TrendingUp,
  MessageSquare,
  Target,
  Brain,
  Lightbulb,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const expertiseAreas = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "End-to-End Recruitment",
    description:
      "Complete recruitment lifecycle management from requirement analysis to onboarding",
    skills: [
      "Talent Sourcing",
      "Interview Design",
      "Candidate Assessment",
      "Offer Negotiation",
    ],
    accentColor: "blue",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Team Building",
    description:
      "Building high-performing engineering and product teams from ground up",
    skills: [
      "Engineering Teams",
      "Product Teams",
      "Leadership Hiring",
      "Culture Fit Assessment",
    ],
    accentColor: "purple",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Process Optimization",
    description:
      "Establishing and continuously improving recruitment frameworks and workflows",
    skills: [
      "ATS Implementation",
      "Workflow Design",
      "Metrics & Analytics",
      "Quality Assurance",
    ],
    accentColor: "emerald",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Mentoring & Development",
    description:
      "Guiding junior team members and helping them grow in their careers",
    skills: [
      "Career Coaching",
      "Skill Development",
      "Performance Improvement",
      "Leadership Training",
    ],
    accentColor: "amber",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Strategic Recruitment",
    description:
      "Developing talent acquisition strategies aligned with business goals",
    skills: [
      "Talent Strategy",
      "Market Analysis",
      "Competitive Intelligence",
      "Employer Branding",
    ],
    accentColor: "rose",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "SaaS & FinTech Expertise",
    description:
      "Deep understanding of technology roles and industry requirements",
    skills: [
      "Tech Recruitment",
      "Product Roles",
      "Startup Scaling",
      "Enterprise Hiring",
    ],
    accentColor: "indigo",
  },
];

const coreValues = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Passion for People",
    description:
      "Genuine love for connecting with people and transforming lives through meaningful career opportunities",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation & Strategy",
    description:
      "Combining strategic thinking with hands-on execution to deliver exceptional results",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Results-Driven",
    description:
      "Focused on delivering measurable outcomes and continuous improvement",
  },
];

export const ExpertiseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Grid pattern for depth */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >

          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              My {" "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h2>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Transforming careers through strategic talent acquisition,
            innovative processes, and meaningful connections that drive
            organizational success.
          </motion.p>
        </motion.div>

        {/* Modern Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Modern Card with Glassmorphism */}
              <div
                className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-${area.accentColor}-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-${area.accentColor}-500/20 overflow-hidden h-full`}
              >
                {/* Animated gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${area.accentColor}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Modern floating icon */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-${area.accentColor}-500/10 border-2 border-${area.accentColor}-500/20 rounded-2xl text-${area.accentColor}-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    {area.icon}
                  </div>
                </div>

                {/* Enhanced content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-opacity-90 transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Modern skills display */}
                  <div className="space-y-3">
                    <h4
                      className={`text-${area.accentColor}-400 font-semibold text-sm uppercase tracking-wider mb-3`}
                    >
                      Key Skills
                    </h4>
                    <div className="space-y-2">
                      {area.skills.map((skill, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-${area.accentColor}-500/20 transition-all duration-300`}
                        >
                          <div
                            className={`w-2 h-2 bg-${area.accentColor}-400 rounded-full flex-shrink-0`}
                          />
                          <span className="text-slate-200 text-sm font-medium">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive hover indicator */}
                  <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span
                      className={`text-${area.accentColor}-400 text-sm font-medium`}
                    >
                      Explore more
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 text-${area.accentColor}-400 transform group-hover:translate-x-1 transition-transform duration-300`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Philosophy */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-8">
            <span className="text-lime-400 text-sm font-medium">
              ✨ Core Values & Philosophy
            </span>
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-12 font-handwritten">
            What Drives My Success
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="relative bg-gradient-to-br from-lime-500/5 to-lime-500/10 backdrop-blur-sm rounded-3xl p-8 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-lime-500/10 overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-lime-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-lime-500/10 border-2 border-lime-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:border-lime-500/40 transition-all duration-300">
                      <div className="text-lime-400 transform group-hover:rotate-12 transition-transform duration-300">
                        {value.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-4 group-hover:text-lime-100 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Mission Statement */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl p-12 lg:p-16 border border-blue-500/20 overflow-hidden backdrop-blur-xl">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="text-6xl text-blue-400 mb-4">&ldquo;</div>
                <blockquote className="text-2xl lg:text-3xl font-light text-white leading-relaxed mb-6">
                  I chose HR as a career for my genuine love in connecting with
                  new people and my ability to transform lives through
                  meaningful career opportunities.
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  <div className="text-blue-400 font-semibold text-lg">
                    Priyalakshmi
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                </div>
              </div>

              {/* Enhanced stats with modern styling */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    11+
                  </div>
                  <div className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    500+
                  </div>
                  <div className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                    Career Transformations
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                    Passion & Dedication
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
