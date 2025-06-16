"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, TrendingUp, Award } from "lucide-react";

const experiences = [
  {
    title: "Senior Talent Acquisition Specialist",
    company: "FinTech Leader",
    duration: "2020 - Present",
    description:
      "Led end-to-end recruitment for Engineering and Product teams, establishing robust processes and frameworks.",
    achievements: [
      "Built engineering teams from 0 to 50+ members",
      "Reduced time-to-hire by 40%",
      "Achieved 95% candidate satisfaction rate",
    ],
  },
  {
    title: "Talent Acquisition Manager",
    company: "SaaS Unicorn",
    duration: "2018 - 2020",
    description:
      "Spearheaded talent acquisition strategy for rapid scaling phase, focusing on tech talent acquisition.",
    achievements: [
      "Scaled team from 100 to 300+ employees",
      "Implemented ATS and optimized workflows",
      "Mentored 3 junior recruiters",
    ],
  },
  {
    title: "Senior Recruiter",
    company: "Technology Consulting",
    duration: "2015 - 2018",
    description:
      "Specialized in technical recruitment across multiple domains and technologies.",
    achievements: [
      "Maintained 90%+ offer acceptance rate",
      "Built strong tech community network",
      "Developed innovative sourcing strategies",
    ],
  },
];

const stats = [
  {
    icon: <Users className="h-8 w-8" />,
    number: "500+",
    label: "Professionals Hired",
    description: "Across Engineering, Product, and Leadership roles",
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    number: "15+",
    label: "Teams Built",
    description: "From startups to enterprise organizations",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    number: "40%",
    label: "Faster Hiring",
    description: "Average improvement in time-to-hire",
  },
  {
    icon: <Award className="h-8 w-8" />,
    number: "95%",
    label: "Satisfaction Rate",
    description: "Candidate and hiring manager feedback",
  },
];

export const ExperienceSection = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden z-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent mb-6">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Over a decade of transforming recruitment landscapes and building
            exceptional teams
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="text-lime-400 flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lime-400 font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {/* Timeline Line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-px h-32 bg-gradient-to-b from-lime-500/50 to-transparent" />
              )}

              <div className="flex gap-8 items-start">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 bg-black rounded-full" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-lime-500/20 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="text-lime-400 font-semibold">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium mt-2 lg:mt-0">
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-lime-400 font-semibold mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
