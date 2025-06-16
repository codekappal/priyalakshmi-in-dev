const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Comprehensive Smart Image Optimization Script for Ayspire Corporate Website
 * 
 * Features:
 * - Smart synchronization: only processes new/modified images
 * - Automatically removes optimized versions of deleted source images
 * - Converts JPG/PNG to WebP format
 * - Generates multiple responsive sizes
 * - Optimizes compression while maintaining quality
 * - Creates fallback formats for older browsers
 * - Preserves original files and only modifies optimized directory
 * - Cleans up empty directories after removing orphaned files
 */

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');
const OPTIMIZED_DIR = path.join(IMAGE_DIR, 'optimized');

// Quality settings for different image types
const QUALITY_SETTINGS = {
  webp: 85,      // High quality WebP
  jpeg: 82,      // Optimized JPEG fallback
  png: 90        // PNG for images requiring transparency
};

// Responsive image sizes for different use cases
const RESPONSIVE_SIZES = {
  thumbnail: 300,
  small: 480,
  medium: 768,
  large: 1024,
  xlarge: 1440
};

// Small image optimization thresholds
const SMALL_IMAGE_CONFIG = {
  // If image is smaller than this, only convert format + compress
  SKIP_RESIZE_THRESHOLD: 500, // pixels width
  // If file size is smaller than this, only do light optimization
  SKIP_HEAVY_OPTIMIZATION_THRESHOLD: 50 * 1024, // 50KB
  // Always convert to WebP for better compression
  FORCE_WEBP: true
};

// Critical large images that need priority optimization
const PRIORITY_IMAGES = [
  'financial.jpg',
  'workday.jpg', 
  'podcast.jpg',
  'hero-bg.jpg',
  'ai-solutions.jpg'
];

async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function getImageFiles(dir) {
  const files = [];
  
  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'optimized') {
        walkDir(fullPath);
      } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
        files.push({
          fullPath,
          relativePath: path.relative(IMAGE_DIR, fullPath),
          filename: item,
          size: stat.size
        });
      }
    }
  }
  
  walkDir(dir);
  return files;
}

async function optimizeImage(inputPath, outputDir, filename, options = {}) {
  const { width, suffix = '', format = 'webp', quality } = options;
  
  const nameWithoutExt = path.parse(filename).name;
  const outputFilename = `${nameWithoutExt}${suffix}.${format}`;
  const outputPath = path.join(outputDir, outputFilename);
  
  try {
    let pipeline = sharp(inputPath);
    
    if (width) {
      pipeline = pipeline.resize(width, null, {
        withoutEnlargement: true,
        fastShrinkOnLoad: true
      });
    }
    
    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        pipeline = pipeline.webp({ 
          quality: quality || QUALITY_SETTINGS.webp,
          effort: 6 // Higher effort for better compression
        });
        break;
      case 'jpeg':
      case 'jpg':
        pipeline = pipeline.jpeg({ 
          quality: quality || QUALITY_SETTINGS.jpeg,
          progressive: true,
          mozjpeg: true
        });
        break;
      case 'png':
        pipeline = pipeline.png({ 
          quality: quality || QUALITY_SETTINGS.png,
          progressive: true,
          compressionLevel: 9
        });
        break;
    }
    
    await pipeline.toFile(outputPath);
    
    const outputStat = fs.statSync(outputPath);
    return {
      outputPath,
      outputSize: outputStat.size,
      filename: outputFilename
    };
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
    return null;
  }
}

async function getImageDimensions(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size
    };
  } catch (error) {
    console.warn(`Could not get dimensions for ${imagePath}:`, error.message);
    return null;
  }
}

async function processImageSet(imageFile) {
  const { fullPath, relativePath, filename, size } = imageFile;
  const relativeDir = path.dirname(relativePath);
  const outputDir = path.join(OPTIMIZED_DIR, relativeDir);
  
  await ensureDirectoryExists(outputDir);
  
  console.log(`\n📸 Processing: ${relativePath} (${(size / 1024 / 1024).toFixed(2)}MB)`);
  
  // Get image dimensions to make smart optimization decisions
  const dimensions = await getImageDimensions(fullPath);
  if (!dimensions) {
    console.warn(`⚠️  Skipping ${filename} - could not read dimensions`);
    return [];
  }
  
  console.log(`📐 Dimensions: ${dimensions.width}x${dimensions.height} (${dimensions.format})`);
  
  const results = [];
  const isPriority = PRIORITY_IMAGES.some(name => filename.toLowerCase().includes(name.toLowerCase()));
  const isSmallImage = dimensions.width <= SMALL_IMAGE_CONFIG.SKIP_RESIZE_THRESHOLD;
  const isSmallFile = size <= SMALL_IMAGE_CONFIG.SKIP_HEAVY_OPTIMIZATION_THRESHOLD;
  
  if (isSmallImage || isSmallFile) {
    console.log(`🔍 Small image detected - using optimized strategy`);
    
    // For small images, just convert to WebP and compress lightly
    const webpResult = await optimizeImage(fullPath, outputDir, filename, {
      format: 'webp',
      quality: 90 // Higher quality for small images to prevent artifacts
    });
    
    if (webpResult) {
      results.push(webpResult);
      console.log(`✅ Generated WebP version only (${(webpResult.outputSize / 1024).toFixed(1)}KB)`);
    }
    
    // Keep original format as fallback but compressed
    const originalFormat = dimensions.format === 'jpeg' ? 'jpeg' : 'png';
    const fallbackResult = await optimizeImage(fullPath, outputDir, filename, {
      format: originalFormat,
      quality: originalFormat === 'jpeg' ? 85 : 95
    });
    
    if (fallbackResult) {
      results.push(fallbackResult);
      console.log(`✅ Generated compressed ${originalFormat} fallback (${(fallbackResult.outputSize / 1024).toFixed(1)}KB)`);
    }
    
  } else {
    // For larger images, generate responsive sizes
    console.log(`📱 Large image - generating responsive sizes`);
    
    // Generate WebP versions at different sizes
    for (const [sizeName, width] of Object.entries(RESPONSIVE_SIZES)) {
      // Skip sizes larger than the original image
      if (width > dimensions.width && sizeName !== 'large') {
        console.log(`⏭️  Skipping ${sizeName} (${width}px) - larger than original`);
        continue;
      }
      
      const suffix = sizeName === 'large' ? '' : `-${sizeName}`;
      
      // WebP version
      const webpResult = await optimizeImage(fullPath, outputDir, filename, {
        width: width <= dimensions.width ? width : undefined,
        suffix,
        format: 'webp'
      });
      
      if (webpResult) results.push(webpResult);
      
      // JPEG fallback for critical images or original size
      if (isPriority || sizeName === 'large') {
        const jpegResult = await optimizeImage(fullPath, outputDir, filename, {
          width: width <= dimensions.width ? width : undefined,
          suffix,
          format: 'jpeg'
        });
        
        if (jpegResult) results.push(jpegResult);
      }
    }
  }
  
  // Calculate total savings
  const totalOptimizedSize = results.reduce((sum, result) => sum + result.outputSize, 0);
  const savingsPercent = ((size - totalOptimizedSize) / size * 100).toFixed(1);
  
  console.log(`✅ Generated ${results.length} optimized versions`);
  console.log(`💾 Size reduction: ${savingsPercent}% (${(size / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB)`);
  
  return results;
}

async function generateOptimizationReport(allResults) {
  const report = {
    totalImagesProcessed: allResults.length,
    totalVariantsGenerated: allResults.reduce((sum, results) => sum + results.length, 0),
    sizingBreakdown: {},
    formatBreakdown: { webp: 0, jpeg: 0, png: 0 },
    totalSizeReduction: 0
  };
  
  allResults.flat().forEach(result => {
    const format = path.extname(result.filename).slice(1);
    report.formatBreakdown[format] = (report.formatBreakdown[format] || 0) + 1;
    
    if (result.filename.includes('-thumbnail')) report.sizingBreakdown.thumbnail = (report.sizingBreakdown.thumbnail || 0) + 1;
    else if (result.filename.includes('-small')) report.sizingBreakdown.small = (report.sizingBreakdown.small || 0) + 1;
    else if (result.filename.includes('-medium')) report.sizingBreakdown.medium = (report.sizingBreakdown.medium || 0) + 1;
    else if (result.filename.includes('-large')) report.sizingBreakdown.large = (report.sizingBreakdown.large || 0) + 1;
    else if (result.filename.includes('-xlarge')) report.sizingBreakdown.xlarge = (report.sizingBreakdown.xlarge || 0) + 1;
    else report.sizingBreakdown.original = (report.sizingBreakdown.original || 0) + 1;
  });
  
  return report;
}

/**
 * Get all optimized files with their source mappings
 */
async function getOptimizedFiles(dir) {
  const optimizedFiles = new Map();
  
  if (!fs.existsSync(dir)) {
    return optimizedFiles;
  }
  
  function walkOptimizedDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkOptimizedDir(fullPath);
      } else if (stat.isFile() && /\.(webp|jpg|jpeg|png)$/i.test(item)) {
        const relativePath = path.relative(OPTIMIZED_DIR, fullPath);
        const relativeDir = path.dirname(relativePath);
        
        // Extract original filename from optimized filename
        const nameWithoutExt = path.parse(item).name;
        const originalName = nameWithoutExt.replace(/-(?:thumbnail|small|medium|large|xlarge)$/, '');
        
        const sourceKey = path.join(relativeDir === '.' ? '' : relativeDir, originalName);
        
        if (!optimizedFiles.has(sourceKey)) {
          optimizedFiles.set(sourceKey, []);
        }
        optimizedFiles.get(sourceKey).push({
          fullPath,
          relativePath,
          filename: item,
          size: stat.size,
          modifiedTime: stat.mtime
        });
      }
    }
  }
  
  walkOptimizedDir(dir);
  return optimizedFiles;
}

/**
 * Smart synchronization between source images and optimized images
 */
async function syncOptimizedImages(sourceImages) {
  console.log('🔄 Synchronizing optimized images...');
  
  const optimizedFiles = await getOptimizedFiles(OPTIMIZED_DIR);
  const sourceImageMap = new Map();
  
  // Create map of source images by their key (relative path without extension)
  sourceImages.forEach(img => {
    const nameWithoutExt = path.parse(img.filename).name;
    const relativeDir = path.dirname(img.relativePath);
    const sourceKey = path.join(relativeDir === '.' ? '' : relativeDir, nameWithoutExt);
    sourceImageMap.set(sourceKey, img);
  });
  
  const toProcess = [];
  const toRemove = [];
  
  // Check for new or modified source images
  for (const [sourceKey, sourceImage] of sourceImageMap) {
    const optimizedVariants = optimizedFiles.get(sourceKey);
    
    if (!optimizedVariants || optimizedVariants.length === 0) {
      // New image - needs processing
      toProcess.push(sourceImage);
      console.log(`➕ New image found: ${sourceImage.relativePath}`);
    } else {
      // Check if source is newer than optimized versions
      const sourceModTime = fs.statSync(sourceImage.fullPath).mtime;
      const newestOptimized = Math.max(...optimizedVariants.map(opt => opt.modifiedTime.getTime()));
      
      if (sourceModTime.getTime() > newestOptimized) {
        // Source is newer - needs reprocessing
        toProcess.push(sourceImage);
        console.log(`🔄 Modified image found: ${sourceImage.relativePath}`);
        
        // Remove old optimized versions
        optimizedVariants.forEach(opt => {
          try {
            fs.unlinkSync(opt.fullPath);
            console.log(`🗑️  Removed outdated: ${opt.relativePath}`);
          } catch (error) {
            console.warn(`⚠️  Could not remove ${opt.relativePath}:`, error.message);
          }
        });
      }
    }
  }
  
  // Check for orphaned optimized images (source deleted)
  for (const [sourceKey, optimizedVariants] of optimizedFiles) {
    if (!sourceImageMap.has(sourceKey)) {
      toRemove.push(...optimizedVariants);
    }
  }
  
  // Remove orphaned optimized images
  if (toRemove.length > 0) {
    console.log(`🗑️  Removing ${toRemove.length} orphaned optimized images...`);
    toRemove.forEach(opt => {
      try {
        fs.unlinkSync(opt.fullPath);
        console.log(`🗑️  Removed orphaned: ${opt.relativePath}`);
      } catch (error) {
        console.warn(`⚠️  Could not remove ${opt.relativePath}:`, error.message);
      }
    });
    
    // Clean up empty directories
    await cleanupEmptyDirectories(OPTIMIZED_DIR);
  }
  
  console.log(`📊 Sync summary:`);
  console.log(`   • Images to process: ${toProcess.length}`);
  console.log(`   • Orphaned files removed: ${toRemove.length}`);
  console.log(`   • Up-to-date images: ${sourceImages.length - toProcess.length}`);
  
  return toProcess;
}

/**
 * Remove empty directories recursively
 */
async function cleanupEmptyDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await cleanupEmptyDirectories(fullPath);
      
      // Check if directory is now empty
      try {
        const remainingItems = fs.readdirSync(fullPath);
        if (remainingItems.length === 0) {
          fs.rmdirSync(fullPath);
          console.log(`📁 Removed empty directory: ${path.relative(OPTIMIZED_DIR, fullPath)}`);
        }
      } catch (error) {
        // Directory might not be empty or have permission issues
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting Ayspire Smart Image Optimization Process...\n');
  
  try {
    // Ensure optimized directory exists
    await ensureDirectoryExists(OPTIMIZED_DIR);
    
    const allImageFiles = await getImageFiles(IMAGE_DIR);
    console.log(`📁 Found ${allImageFiles.length} source images`);
    
    // Smart sync - only process new/modified images
    const imagesToProcess = await syncOptimizedImages(allImageFiles);
    
    if (imagesToProcess.length === 0) {
      console.log('\n✅ All images are up-to-date! No processing needed.');
      console.log('💡 To force reprocessing, delete the optimized folder or modify source images.');
      return;
    }
    
    console.log(`\n🔄 Processing ${imagesToProcess.length} images...`);
    
    // Sort by size (largest first) to prioritize heavy images
    imagesToProcess.sort((a, b) => b.size - a.size);
    
    const allResults = [];
    
    for (const imageFile of imagesToProcess) {
      const results = await processImageSet(imageFile);
      allResults.push(results);
    }
    
    const report = await generateOptimizationReport(allResults);
    
    console.log('\n📊 OPTIMIZATION COMPLETE - SUMMARY REPORT');
    console.log('=' .repeat(50));
    console.log(`✅ Images Processed: ${report.totalImagesProcessed}`);
    console.log(`🔄 Variants Generated: ${report.totalVariantsGenerated}`);
    console.log(`📱 Format Distribution:`);
    console.log(`   • WebP: ${report.formatBreakdown.webp || 0} files`);
    console.log(`   • JPEG: ${report.formatBreakdown.jpeg || 0} files`);
    console.log(`   • PNG: ${report.formatBreakdown.png || 0} files`);
    console.log(`📐 Size Distribution:`);
    Object.entries(report.sizingBreakdown).forEach(([size, count]) => {
      console.log(`   • ${size}: ${count} files`);
    });
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Update Next.js Image components to use optimized images');
    console.log('2. Implement responsive srcSet with multiple sizes');
    console.log('3. Add WebP format detection and fallbacks');
    console.log('4. Update image paths to use /images/optimized/ directory');
    console.log('\nOptimized images saved to: public/images/optimized/');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeImage, processImageSet };
