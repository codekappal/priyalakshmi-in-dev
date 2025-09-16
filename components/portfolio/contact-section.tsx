"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/react";
import {
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  Send,
  MapPin,
} from "lucide-react";

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    description: "Drop me a line anytime",
    contact: "priyalakshmi@example.com",
    href: "mailto:priyalakshmi@example.com",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    description: "Let's have a conversation",
    contact: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    title: "LinkedIn",
    description: "Connect professionally",
    contact: "linkedin.com/in/priyalakshmi-r",
    href: "https://linkedin.com/in/priyalakshmi-r",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    description: "Based in India",
    contact: "Available for remote & on-site",
    href: null,
  },
];

const hrTopics = [
  "Recruitment Strategies",
  "Team Building",
  "Process Optimization",
  "Mentoring & Development",
  "SaaS/FinTech Hiring",
  "Talent Acquisition Frameworks",
  "Career Guidance",
  "Industry Insights",
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // console.log("Form submitted:", formData);
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
      id="contact"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
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
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Open to conversations about anything related to Human Resources –
            whether it&apos;s recruitment strategies, team building, process
            optimization, or mentoring and development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/20 hover:border-lime-500/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="text-lime-400 group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
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
                          <span className="text-lime-400">
                            {method.contact}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* HR Topics */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-lime-500/20"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-lime-400" />
                Discussion Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {hrTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full text-sm text-gray-300 hover:bg-lime-500/20 transition-colors"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-lime-500/20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Send className="h-6 w-6 text-lime-400" />
                Send a Message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    required
                    classNames={{
                      input: "bg-gray-800/50 border-gray-700",
                      label: "text-gray-300",
                    }}
                    label="Name"
                    placeholder="Your full name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <Input
                    required
                    classNames={{
                      input: "bg-gray-800/50 border-gray-700",
                      label: "text-gray-300",
                    }}
                    label="Email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <Input
                  required
                  classNames={{
                    input: "bg-gray-800/50 border-gray-700",
                    label: "text-gray-300",
                  }}
                  label="Subject"
                  placeholder="What would you like to discuss?"
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />

                <Textarea
                  required
                  classNames={{
                    input: "bg-gray-800/50 border-gray-700",
                    label: "text-gray-300",
                  }}
                  label="Message"
                  minRows={4}
                  placeholder="Tell me more about what you'd like to discuss..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button
                  className="w-full bg-lime-500 text-black hover:bg-lime-400 font-semibold py-6 text-lg"
                  size="lg"
                  type="submit"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 rounded-3xl p-12 border border-lime-500/20"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Whether you&apos;re looking to scale your team, optimize your
            recruitment process, or seeking career guidance, I&apos;m here to
            help make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as="a"
              className="bg-lime-500 text-black hover:bg-lime-400 font-semibold px-8 py-6 text-lg"
              href="mailto:priyalakshmi@example.com"
              size="lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              Get Started
            </Button>
            <Button
              as="a"
              className="border-2 border-lime-500/30 text-lime-400 hover:bg-lime-500/10 px-8 py-6 text-lg"
              href="https://linkedin.com/in/priyalakshmi-r"
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
    </section>
  );
};
