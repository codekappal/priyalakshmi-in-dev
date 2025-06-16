"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, Tag } from "lucide-react";
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

interface RelatedPostsProps {
  currentPostId: string;
  currentCategory: string;
  allPosts: BlogPost[];
  maxPosts?: number;
}

export default function RelatedPosts({ 
  currentPostId, 
  currentCategory, 
  allPosts, 
  maxPosts = 3 
}: RelatedPostsProps) {
  // Function to get related posts
  const getRelatedPosts = () => {
    // Filter out current post
    const otherPosts = allPosts.filter(post => post.metadata.id !== currentPostId);
    
    // Separate posts by category match
    const sameCategoryPosts = otherPosts.filter(
      post => post.metadata.category === currentCategory
    );
    
    const differentCategoryPosts = otherPosts.filter(
      post => post.metadata.category !== currentCategory
    );
    
    // Prioritize same category posts, then add different category posts
    const relatedPosts = [
      ...sameCategoryPosts,
      ...differentCategoryPosts
    ].slice(0, maxPosts);
    
    return relatedPosts;
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
          <Tag className="w-6 h-6 text-blue-500" />
          Related Posts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => {
            const categoryColors = getCategoryColors(post.metadata.category);
            
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/portfolio/blogs/${post.slug}`}>
                  <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 p-6 h-full flex flex-col hover:shadow-lg">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors.gradient} ${categoryColors.iconColor} border ${categoryColors.borderColor}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${categoryColors.iconColor.replace('text-', 'bg-')}`} />
                        {post.metadata.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.metadata.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {post.metadata.summary}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.metadata.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.metadata.readTime}
                        </span>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All Posts Link */}
        {allPosts.length > maxPosts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link 
              href="/portfolio/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              View All Posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// Utility component for other posts (all except current)
export function OtherPosts({ 
  currentPostId, 
  allPosts, 
  maxPosts = 6 
}: { 
  currentPostId: string; 
  allPosts: BlogPost[]; 
  maxPosts?: number;
}) {
  const otherPosts = allPosts
    .filter(post => post.metadata.id !== currentPostId)
    .slice(0, maxPosts);

  if (otherPosts.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
          <Tag className="w-6 h-6 text-green-500" />
          More Posts
        </h2>
        
        <div className="space-y-4">
          {otherPosts.map((post, index) => {
            const categoryColors = getCategoryColors(post.metadata.category);
            
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/portfolio/blogs/${post.slug}`}>
                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors.gradient} ${categoryColors.iconColor} border ${categoryColors.borderColor}`}>
                          {post.metadata.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.metadata.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.metadata.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {post.metadata.summary}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.metadata.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All Posts Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link 
            href="/portfolio/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
