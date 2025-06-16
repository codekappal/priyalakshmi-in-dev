import React from "react";

export const metadata = {
  title: "Contact - Priyalakshmi",
  description: "Get in touch for talent acquisition and HR consulting services",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent mb-8 text-center">
            Let&apos;s Connect
          </h1>

          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Open to conversations about anything related to Human Resources –
            whether it&apos;s recruitment strategies, team building, process
            optimization, or mentoring and development.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>

              {[
                {
                  icon: "📧",
                  title: "Email",
                  description: "Drop me a line anytime",
                  contact: "priyalakshmi@example.com",
                  href: "mailto:priyalakshmi@example.com",
                },
                {
                  icon: "📱",
                  title: "Phone",
                  description: "Let's have a conversation",
                  contact: "+91 98765 43210",
                  href: "tel:+919876543210",
                },
                {
                  icon: "💼",
                  title: "LinkedIn",
                  description: "Connect professionally",
                  contact: "linkedin.com/in/priyalakshmi",
                  href: "https://linkedin.com/in/priyalakshmi",
                },
                {
                  icon: "📍",
                  title: "Location",
                  description: "Based in India",
                  contact: "Available for remote & on-site",
                  href: null,
                },
              ].map((method, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {method.description}
                      </p>
                      {method.href ? (
                        <a
                          className="text-lime-400 hover:text-lime-300 transition-colors"
                          href={method.href}
                          rel="noreferrer"
                          target={
                            method.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                        >
                          {method.contact}
                        </a>
                      ) : (
                        <span className="text-lime-400">{method.contact}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Discussion Topics */}
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-lime-500/20">
                <h3 className="text-xl font-bold text-white mb-6">
                  Discussion Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Recruitment Strategies",
                    "Team Building",
                    "Process Optimization",
                    "Mentoring & Development",
                    "SaaS/FinTech Hiring",
                    "Talent Acquisition Frameworks",
                    "Career Guidance",
                    "Industry Insights",
                  ].map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full text-sm text-gray-300 hover:bg-lime-500/20 transition-colors"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-lime-500/20">
              <h3 className="text-2xl font-bold text-white mb-8">
                Send a Quick Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-500 focus:outline-none"
                    id="name"
                    placeholder="Your full name"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-500 focus:outline-none"
                    id="email"
                    placeholder="your.email@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-500 focus:outline-none"
                    id="subject"
                    placeholder="What would you like to discuss?"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-lime-500 focus:outline-none resize-none"
                    id="message"
                    placeholder="Tell me more about what you'd like to discuss..."
                    rows={4}
                  />
                </div>

                <button className="w-full bg-lime-500 text-black hover:bg-lime-400 font-semibold py-4 rounded-lg transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
