"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogImagesProps {
  images: string[];
}

// Hero Image Component - Shows first image as a large hero
export function HeroImage({ images }: BlogImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <motion.div 
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={images[0]}
          alt="Blog hero image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

// Image Gallery Component - Shows all images in a grid
export function ImageGallery({ images }: BlogImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full my-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Related Images
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={image}
              alt={`Blog image ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Individual Blog Images Component - Access specific images
export function BlogImages({ images }: BlogImagesProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full my-6">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative w-full h-48 md:h-64 mb-6 rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Image
            src={image}
            alt={`Blog content image ${index + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

// Single Image Component - For accessing specific images by index
interface SingleImageProps {
  images: string[];
  index: number;
  alt?: string;
  className?: string;
}

export function SingleImage({ images, index, alt, className = "" }: SingleImageProps) {
  if (!images || images.length === 0 || index >= images.length) return null;

  return (
    <motion.div
      className={`relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-md ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={images[index]}
        alt={alt || `Blog image ${index + 1}`}
        fill
        className="object-cover"
      />
    </motion.div>
  );
}

// Inline Image Component - For images within text content
export function InlineImage({ images, index, alt }: SingleImageProps) {
  if (!images || images.length === 0 || index >= images.length) return null;

  return (
    <span className="inline-block mx-2 my-1">
      <Image
        src={images[index]}
        alt={alt || `Inline image ${index + 1}`}
        width={200}
        height={150}
        className="rounded-md shadow-sm"
      />
    </span>
  );
}

// Side-by-Side Images Component
export function SideBySideImages({ images }: BlogImagesProps) {
  if (!images || images.length < 2) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {images.slice(0, 2).map((image, index) => (
        <motion.div
          key={index}
          className="relative aspect-video rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <Image
            src={image}
            alt={`Comparison image ${index + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
