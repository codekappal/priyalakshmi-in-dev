"use client";

import clsx from "clsx";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";

import { fontKappal } from "@/config/fonts";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const StoryOfKappal: React.FC = () => {
  const kappalWayItems = [
    {
      title: "Deep Roots, Broad Vision",
      content:
        "We understand the local challenges deeply—and we bring global quality solutions to solve them. We are grounded, but we think big.",
      icon: (
        <svg
          className="w-8 h-8 text-brandprimary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 10V3L4 14h7v7l9-11h-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      title: "We don't just sell, we build it",
      content:
        "We're not just software vendors. We are product builders. Whether it's a farm management app or an eCommerce platform, we build, use and keep improving everything ourselves.",
      icon: (
        <svg
          className="w-8 h-8 text-brandprimary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      title: "Honest Pricing, Robust Tech",
      content:
        "Our pricing is transparent and grows with your business. No hidden costs, no over-promises. What you see is exactly what you get.",
      icon: (
        <svg
          className="w-8 h-8 text-brandprimary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
    {
      title: "A Commitment from Engineers",
      content:
        "Our core team includes architects, developers and designers. Every decision—from the tech stack to the UI—is made with experience and precision. Not by sales targets.",
      icon: (
        <svg
          className="w-8 h-8 text-brandprimary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        animate="visible"
        initial="hidden"
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
      >
        <h1
          className={clsx(
            "text-5xl font-kappal text-brandsecondary tracking-wide mb-8 text-left",
            fontKappal.variable,
          )}
        >
          The Story of Kappal – How it All Started
        </h1>

        <section className="mb-12 text-left">
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            It all started in 2023.
          </motion.p>

          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            We always believed that technology should make planning and managing
            a business easier. But the more we explored the market, the more we
            saw how most software products worked against this very idea.
          </motion.p>

          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            They were either:
          </motion.p>

          <motion.ul
            className="list-disc pl-6 mb-6 space-y-2"
            variants={staggerContainer}
          >
            {[
              "Locking important features behind expensive paid plans.",
              "Charging just to remove limitations, like allowing only 10 users in the basic plan.",
              "Too bulky - with users paying 100% but hardly using 10% of the software.",
              "More focused on collecting user data than solving real problems.",
              "Scattered across different tools that don't integrate easily",
              "Difficult to scale as the business grows.",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="text-lg pl-2 -indent-4"
                variants={fadeInUp}
              >
                <span className="pl-2">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            We felt this was stopping many from adapting to tech, especially
            small businesses. That&apos;s when we had our &apos;Why not?&apos;
            moment.
          </motion.p>

          <motion.p
            className={clsx(
              "text-3xl font-kappal text-brandsecondary tracking-wide mb-6 text-left",
              fontKappal.variable,
            )}
            variants={fadeInUp}
          >
            Why not build something different?
          </motion.p>

          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            That&apos;s how Kappal was born.
          </motion.p>

          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            We decided to walk a new path—one that didn&apos;t force businesses
            into rigid plans. Instead, we built Kappal Software with two simple
            ideas:
          </motion.p>

          <motion.ul
            className="list-disc pl-6 mb-6 space-y-2"
            variants={staggerContainer}
          >
            {[
              "You pay only for what you use.",
              "Your IT Platform should grow with you—not hold you back.",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="text-lg pl-2 -indent-4"
                variants={fadeInUp}
              >
                <span className="pl-2">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </motion.div>

      <section className="mb-12 text-left">
        <motion.h2
          animate="visible"
          className={clsx(
            "text-3xl font-kappal text-brandsecondary tracking-wide mb-8",
            fontKappal.variable,
          )}
          initial="hidden"
          variants={fadeInUp}
        >
          The Kappal Way
        </motion.h2>

        <motion.div
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          variants={staggerContainer}
        >
          {kappalWayItems.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5 }}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-slate-100 dark:bg-slate-800 text-left rounded-2xl border-2 dark:border-indigo-400">
                <CardHeader className="flex items-start space-x-4 p-4 pb-0">
                  {item.icon}
                  <h3
                    className={clsx(
                      "text-2xl font-kappal text-brandsecondary tracking-wide underline",
                      fontKappal.variable,
                    )}
                  >
                    {item.title}
                  </h3>
                </CardHeader>
                <CardBody className="p-6 pt-3">
                  <p className="text-medium">{item.content}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default StoryOfKappal;
