"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  loading?: "lazy" | "eager";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * OptimizedImage Component - Enhanced Next.js Image with WebP support
 *
 * Features:
 * - Automatic WebP format detection and fallback
 * - Responsive image sizing based on viewport
 * - Performance optimizations for Core Web Vitals
 * - SEO-friendly alt text requirements
 * - Automatic lazy loading for non-critical images
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  loading = "lazy",
  placeholder = "blur",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Check WebP support on client side
  useEffect(() => {
    const checkWebPSupport = () => {
      const webP = new window.Image();

      webP.onload = webP.onerror = function () {
        setSupportsWebP(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    };

    checkWebPSupport();
  }, []);

  // Generate optimized image path with fallback
  useEffect(() => {
    // Check if it's an SVG file first - SVGs should be used as-is regardless of WebP support
    if (src.toLowerCase().endsWith(".svg")) {
      setImageSrc(src);

      return;
    }

    if (src.startsWith("/images/") && !src.includes("/optimized/")) {
      // Convert original path to optimized path
      const pathParts = src.split("/");
      const filename = pathParts[pathParts.length - 1];

      // Remove file extension and add WebP if supported
      const nameWithoutExt = filename.split(".")[0];
      const extension = supportsWebP ? "webp" : "jpeg";

      // Handle optimized directory structure automatically
      const pathAfterImages = src.replace("/images/", "");
      const lastSlashIndex = pathAfterImages.lastIndexOf("/");

      let optimizedPath: string;

      if (lastSlashIndex === -1) {
        // File is directly in /images/ folder
        optimizedPath = `/images/optimized/${nameWithoutExt}.${extension}`;
      } else {
        // File is in subfolder(s) - preserve the entire folder structure
        const folderPath = pathAfterImages.substring(0, lastSlashIndex);

        optimizedPath = `/images/optimized/${folderPath}/${nameWithoutExt}.${extension}`;
      }

      // Test if optimized image exists
      const testImage = new window.Image();

      testImage.onload = () => {
        setImageSrc(optimizedPath);
      };
      testImage.onerror = () => {
        // For small images, try fallback formats
        if (supportsWebP) {
          // Try JPEG fallback for small images
          const jpegPath = optimizedPath.replace(".webp", ".jpeg");
          const jpegTest = new window.Image();

          jpegTest.onload = () => {
            setImageSrc(jpegPath);
          };
          jpegTest.onerror = () => {
            // Finally fallback to original image
            setImageSrc(src);
          };
          jpegTest.src = jpegPath;
        } else {
          // Fallback to original image if optimized version doesn't exist
          setImageSrc(src);
        }
      };
      testImage.src = optimizedPath;
    } else {
      // If already optimized path or external image, use as-is
      setImageSrc(src);
    }
  }, [src, supportsWebP]);

  // Generate responsive sizes if not provided
  const responsiveSizes =
    sizes ||
    (fill
      ? "100vw"
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw");

  // Generate low-quality placeholder for blur effect
  const generateBlurDataURL = (_originalSrc: string) => {
    if (blurDataURL) return blurDataURL;

    // Simple base64 placeholder - in production, you might generate this server-side
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7XTvtjrhayKhVquWwqKyBYzDPHzg=";
  };

  // Error fallback - use original image if optimized version fails
  const handleError = () => {
    if (imageSrc !== src) {
      setImageSrc(src);
    }
  };

  // SEO enhancement: Ensure alt text is provided
  if (!alt || alt.trim() === "") {
    // Only warn in development to avoid console spam in production
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn(
        `OptimizedImage: Missing alt text for image ${src}. This affects SEO and accessibility.`,
      );
    }
  }

  return (
    <Image
      alt={alt}
      blurDataURL={generateBlurDataURL(src)}
      className={`transition-opacity duration-300 ${className}`}
      fill={fill}
      height={height}
      loading={priority ? "eager" : loading}
      placeholder={placeholder}
      priority={priority}
      quality={quality}
      sizes={responsiveSizes}
      src={imageSrc}
      width={width}
      onError={handleError}
      {...props}
    />
  );
}

/**
 * Pre-configured OptimizedImage variants for common use cases
 */

// Hero images - high priority, large size
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      loading="eager"
      priority={true}
      quality={90}
      sizes="100vw"
    />
  );
}

// Blog/content images - standard optimization
export function ContentImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
    />
  );
}

// Thumbnail images - smaller, heavily optimized
export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      quality={80}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
    />
  );
}

// Avatar/profile images - small, circular
export function AvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      className={`rounded-full ${props.className || ""}`}
      quality={85}
      sizes="150px"
    />
  );
}
