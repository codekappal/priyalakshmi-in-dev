"use client";
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Eye,
  Sparkles,
  TrendingUp,
  Filter,
  Grid,
  List,
} from "lucide-react";

import { getCategoryColors } from "./category-colors";

interface BlogPost {
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
}

interface ModernPortfolioBlogPostsProps {
  initialPosts: BlogPost[];
}

export function ModernPortfolioBlogPosts({
  initialPosts,
}: ModernPortfolioBlogPostsProps) {
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const allBlogs = initialPosts;

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allBlogs.map((post) => post.metadata.category),
    );
    const cats = ["All", ...Array.from(uniqueCategories)];

    return cats;
  }, [allBlogs]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = allBlogs;

    if (selectedCategory !== "All") {
      filtered = allBlogs.filter(
        (post) => post.metadata.category === selectedCategory,
      );
    }

    return filtered.sort((a, b) => {
      // Prioritize highlighted posts
      if (a.metadata.highlighted && !b.metadata.highlighted) return -1;
      if (!a.metadata.highlighted && b.metadata.highlighted) return 1;

      // Then sort by date
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    });
  }, [allBlogs, selectedCategory]);

  // Infinite scroll with Intersection Observer
  const loadMore = useCallback(() => {
    if (visiblePosts >= filteredPosts.length || isLoading) return;

    setIsLoading(true);

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisiblePosts((prev) => Math.min(prev + 8, filteredPosts.length));
      setIsLoading(false);
    }, 500);
  }, [visiblePosts, filteredPosts.length, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visiblePosts < filteredPosts.length) {
          loadMore();
        }
      },
      { rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, visiblePosts, filteredPosts.length]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       

        {/* Controls Bar */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-gray-400 mt-2 mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisiblePosts(8);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Posts Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}`}
            animate={{ opacity: 1 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPosts.slice(0, visiblePosts).map((post, index) => {
              const categoryColors = getCategoryColors(post.metadata.category);

              if (viewMode === "list") {
                // List View Card
                return (
                  <motion.article
                    key={post.slug}
                    animate={{ opacity: 1, x: 0 }}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link href={`/portfolio/blogs/${post.slug}`}>
                      <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl p-6">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                            {post.metadata.images && post.metadata.images[0] ? (
                              <Image
                                alt={post.metadata.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                height={128}
                                src={post.metadata.images[0]}
                                width={128}
                              />
                            ) : (
                              <div
                                className={`w-full h-full bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center`}
                              >
                                <Tag
                                  className={`w-8 h-8 ${categoryColors.iconColor}`}
                                />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors.gradient} ${categoryColors.iconColor} border ${categoryColors.borderColor}`}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${categoryColors.iconColor.replace("text-", "bg-")}`}
                                />
                                {post.metadata.category}
                              </span>
                              {post.metadata.highlighted && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                  <Sparkles className="w-3 h-3" />
                                  Featured
                                </span>
                              )}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.metadata.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                              {post.metadata.summary}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {getTimeAgo(post.metadata.publishedAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {post.metadata.readTime}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              }

              // Grid View Card
              return (
                <motion.article
                  key={post.slug}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/portfolio/blogs/${post.slug}`}>
                    <div className="h-full bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl">
                      {/* Image */}
                      <div className="h-48 relative overflow-hidden">
                        {post.metadata.images && post.metadata.images[0] ? (
                          <Image
                            fill
                            alt={post.metadata.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={post.metadata.images[0]}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className={`w-full h-full bg-gradient-to-br ${categoryColors.gradient} flex items-center justify-center`}
                          >
                            <div className="text-center">
                              <Tag
                                className={`w-12 h-12 ${categoryColors.iconColor} mb-2`}
                              />
                              <p
                                className={`text-sm font-medium ${categoryColors.iconColor}`}
                              >
                                {post.metadata.category}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ${categoryColors.iconColor} border border-white/20`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${categoryColors.iconColor.replace("text-", "bg-")}`}
                            />
                            {post.metadata.category}
                          </span>
                        </div>

                        {post.metadata.highlighted && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                          </div>
                        )}

                        {/* Trending indicator */}
                        {index < 3 && (
                          <div className="absolute bottom-4 right-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {post.metadata.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.metadata.summary}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {getTimeAgo(post.metadata.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.metadata.readTime}
                            </span>
                          </div>

                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600 dark:text-gray-300">
                Loading more posts...
              </span>
            </div>
          </motion.div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={observerRef} className="h-10" />

        {/* End Message */}
        {visiblePosts >= filteredPosts.length && filteredPosts.length > 0 && (
          <motion.div
            animate={{ opacity: 1 }}
            className="text-center py-12"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
              <Eye className="w-4 h-4" />
              You&apos;ve reached the end! {filteredPosts.length} posts total
            </div>
          </motion.div>
        )}

        {/* No Posts Message */}
        {filteredPosts.length === 0 && selectedCategory !== "All" && (
          <motion.div
            animate={{ opacity: 1 }}
            className="text-center py-20"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              No posts available in the &quot;{selectedCategory}&quot; category.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              onClick={() => setSelectedCategory("All")}
            >
              View all posts
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
