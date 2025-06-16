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
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden z-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-6">
            <span className="text-lime-400 text-sm font-medium">
              💼 Professional Excellence
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-lime-100 to-lime-400 bg-clip-text text-transparent mb-6 font-handwritten">
            My Expertise Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of skills, experience, and achievements
            that define my professional journey
          </p>
        </motion.div>

        {/* Expertise Showcase */}
        <div className="mb-24">
          {/* Featured Expertise Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {expertiseAreas.slice(0, 2).map((area, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-lime-500/20 hover:border-lime-500/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-lime-500/10 overflow-hidden">
                  {/* Floating background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-2xl text-lime-400 group-hover:scale-110 group-hover:bg-lime-500/20 transition-all duration-300">
                        {area.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-lime-100 transition-colors">
                          {area.title}
                        </h3>
                        <div className="w-16 h-1 bg-lime-500 rounded-full mt-2" />
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {area.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-lime-400 font-semibold flex items-center gap-2">
                        <div className="w-2 h-2 bg-lime-400 rounded-full" />
                        Key Specializations
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {area.skills.map((skill, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 bg-lime-500/5 border border-lime-500/10 rounded-xl hover:bg-lime-500/10 hover:border-lime-500/20 transition-all duration-300"
                          >
                            <div className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
                            <span className="text-gray-300 text-sm font-medium">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.slice(2).map((area, index) => (
              <motion.div
                key={index + 2}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: (index + 2) * 0.1, duration: 0.6 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/10 hover:border-lime-500/30 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 h-full">
                  <div className="text-lime-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {area.skills.slice(0, 2).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-lime-500/10 border border-lime-500/20 rounded-lg text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {area.skills.length > 2 && (
                      <span className="px-2 py-1 text-xs text-lime-400 font-medium">
                        +{area.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
          <div className="relative bg-gradient-to-r from-lime-500/10 via-lime-500/5 to-emerald-500/10 rounded-3xl p-12 lg:p-16 border border-lime-500/20 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-lime-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="text-6xl text-lime-400 mb-4 font-handwritten">
                  &ldquo;
                </div>
                <blockquote className="text-2xl lg:text-3xl font-light text-white leading-relaxed mb-6 font-handwritten">
                  I chose HR as a career for my genuine love in connecting with
                  new people and my ability to transform lives through
                  meaningful career opportunities.
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-0.5 bg-lime-400 rounded-full" />
                  <div className="text-lime-400 font-semibold text-lg">
                    Priyalakshmi
                  </div>
                  <div className="w-16 h-0.5 bg-lime-400 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">
                    11+
                  </div>
                  <div className="text-gray-400 font-medium">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">
                    500+
                  </div>
                  <div className="text-gray-400 font-medium">
                    Career Transformations
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">
                    100%
                  </div>
                  <div className="text-gray-400 font-medium">
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
