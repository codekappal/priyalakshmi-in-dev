"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

type BlogPost = {
  slug: string;
  metadata: {
    id: string;
    title: string;
    summary: string;
    publishedAt: string;
    category: string;
    readTime: string;
    highlighted?: boolean;
    images?: string[];
  };
};

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

// Helper function to get category colors (client-side version)
function getCategoryColors(category: string) {
  const categoryColors: Record<
    string,
    {
      gradient: string;
      iconColor: string;
      borderColor: string;
    }
  > = {
    "Talent Strategy": {
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    "Employee Experience": {
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    "Business Strategy": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
    },
    "HR Analytics": {
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    Technology: {
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    Leadership: {
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/20",
    },
    Default: {
      gradient: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/20",
    },
  };

  return categoryColors[category] || categoryColors["Default"];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogPosts }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
              Latest {" "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Posts
            </span>
          </motion.h2>

        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => {
            const colors = getCategoryColors(post.metadata.category);

            return (
              <motion.article
                key={post.slug}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link href={`/portfolio/blogs/${post.slug}`}>
                  <div
                    className={`relative bg-gradient-to-br ${colors.gradient} backdrop-blur-xl rounded-2xl p-8 border ${colors.borderColor} hover:border-opacity-50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/20 overflow-hidden h-full cursor-pointer`}
                  >
                    {/* Animated background glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    {/* Category Badge */}
                    <div className="relative z-10 mb-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.iconColor} bg-white/10 border border-white/20`}
                      >
                        {post.metadata.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-opacity-90 transition-colors line-clamp-2">
                        {post.metadata.title}
                      </h3>

                      <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">
                        {post.metadata.summary}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(
                              post.metadata.publishedAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.metadata.readTime}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span
                          className={`${colors.iconColor} text-sm font-medium`}
                        >
                          Read full article
                        </span>
                        <ArrowRight
                          className={`h-4 w-4 ${colors.iconColor} transform group-hover:translate-x-1 transition-transform duration-300`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All Blogs Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link href="/portfolio/blogs">
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl font-semibold text-white hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <BookOpen className="h-5 w-5 text-purple-400 group-hover:rotate-3 transition-transform duration-300" />
              <span className="relative z-10">View All Blog Posts</span>
              <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
