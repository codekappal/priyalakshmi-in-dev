import React from "react";

export const metadata = {
  title: "Services - Priyalakshmi",
  description: "Talent acquisition and HR consulting services offered",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent mb-8 text-center">
            Services & Expertise
          </h1>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Comprehensive talent acquisition and HR consulting services to help
            organizations build exceptional teams
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            {[
              {
                title: "End-to-End Recruitment",
                description:
                  "Complete recruitment lifecycle management from requirement analysis to successful onboarding.",
                features: [
                  "Talent Sourcing",
                  "Interview Design",
                  "Candidate Assessment",
                  "Offer Negotiation",
                ],
              },
              {
                title: "Team Building",
                description:
                  "Building high-performing engineering and product teams from the ground up.",
                features: [
                  "Engineering Teams",
                  "Product Teams",
                  "Leadership Hiring",
                  "Culture Fit Assessment",
                ],
              },
              {
                title: "Process Optimization",
                description:
                  "Establishing and continuously improving recruitment frameworks and workflows.",
                features: [
                  "ATS Implementation",
                  "Workflow Design",
                  "Metrics & Analytics",
                  "Quality Assurance",
                ],
              },
              {
                title: "Strategic Consulting",
                description:
                  "Developing talent acquisition strategies aligned with business objectives.",
                features: [
                  "Talent Strategy",
                  "Market Analysis",
                  "Competitive Intelligence",
                  "Employer Branding",
                ],
              },
              {
                title: "Mentoring & Development",
                description:
                  "Guiding junior team members and helping them advance in their careers.",
                features: [
                  "Career Coaching",
                  "Skill Development",
                  "Performance Improvement",
                  "Leadership Training",
                ],
              },
              {
                title: "SaaS & FinTech Expertise",
                description:
                  "Deep understanding of technology roles and industry-specific requirements.",
                features: [
                  "Tech Recruitment",
                  "Product Roles",
                  "Startup Scaling",
                  "Enterprise Hiring",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-lime-400 font-semibold text-sm mb-3">
                    Key Areas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded-full text-sm text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 rounded-3xl p-12 border border-lime-500/20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Whether you&apos;re looking to scale your team, optimize your
              recruitment process, or seeking strategic HR guidance, I&apos;m
              here to help make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="inline-flex items-center justify-center bg-lime-500 text-black hover:bg-lime-400 font-semibold px-8 py-4 rounded-lg transition-colors"
                href="mailto:priyalakshmi@example.com"
              >
                Get Started
              </a>
              <a
                className="inline-flex items-center justify-center border-2 border-lime-500/30 text-lime-400 hover:bg-lime-500/10 px-8 py-4 rounded-lg transition-colors"
                href="#contact"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
