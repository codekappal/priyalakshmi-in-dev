const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Smart Image Cleanup Script for Kappal Multi-Domain Site
 * 
 * Features:
 * - Scans all source files for image references
 * - Identifies unused images in public/images directory
 * - Supports multiple reference patterns (Next.js Image, img tags, CSS, etc.)
 * - Dry-run mode for safe testing
 * - Backup option before deletion
 * - Preserves optimized images if source is referenced
 * - Detailed reporting of cleanup results
 */

const PROJECT_ROOT = process.cwd();
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');
const OPTIMIZED_DIR = path.join(IMAGES_DIR, 'optimized');

// File patterns to search for image references
const SOURCE_PATTERNS = [
  'app/**/*.{js,jsx,ts,tsx,md,mdx}',
  'components/**/*.{js,jsx,ts,tsx,md,mdx}',
  'config/**/*.{js,jsx,ts,tsx,json}',
  'styles/**/*.{css,scss,sass}',
  'public/**/*.{html,css,js}',
  '*.{js,jsx,ts,tsx,json,md}'
];

// Image file patterns to check
const IMAGE_PATTERNS = /\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i;

// Patterns to match image references in code
const REFERENCE_PATTERNS = [
  // Next.js Image component src prop
  /src=["']([^"']+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
  // Standard img tag src
  /src=["']([^"']+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
  // CSS background-image
  /background-image:\s*url\(["']?([^"')]+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']?\)/gi,
  // CSS url() function
  /url\(["']?([^"')]+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']?\)/gi,
  // String literals with image paths (more flexible)
  /["']([^"']*(?:images\/|\/images\/)[^"']*\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
  // String literals with any image paths
  /["']([^"']*\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
  // Import statements
  /import\s+.*?["']([^"']+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
  // Require statements
  /require\(["']([^"']+\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']\)/gi,
  // Object/JSON values
  /:\s*["']([^"']*\/images\/[^"']*\.(?:jpg|jpeg|png|gif|svg|webp|avif|ico))["']/gi,
];

// Images that should never be deleted (critical assets)
const PROTECTED_IMAGES = [
  'favicon.ico',
  'logo.png',
  'kappal.svg',
  'next.svg',
  'vercel.svg'
];

async function getAllSourceFiles() {
  const files = [];
  
  for (const pattern of SOURCE_PATTERNS) {
    try {
      const matches = glob.sync(pattern, { 
        cwd: PROJECT_ROOT,
        ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**']
      });
      files.push(...matches.map(f => path.join(PROJECT_ROOT, f)));
    } catch (error) {
      console.warn(`Warning: Could not search pattern ${pattern}:`, error.message);
    }
  }
  
  return [...new Set(files)]; // Remove duplicates
}

async function getAllImageFiles() {
  const images = [];
  
  function walkDir(dir, baseDir = '') {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(baseDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath, relativePath);
      } else if (IMAGE_PATTERNS.test(item)) {
        images.push({
          fullPath,
          relativePath,
          filename: item,
          size: stat.size,
          isOptimized: fullPath.includes('/optimized/')
        });
      }
    }
  }
  
  walkDir(IMAGES_DIR);
  return images;
}

async function findImageReferences() {
  console.log('🔍 Scanning source files for image references...');
  
  const sourceFiles = await getAllSourceFiles();
  const references = new Set();
  
  console.log(`📁 Scanning ${sourceFiles.length} source files...`);
  
  for (const filePath of sourceFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Apply each reference pattern
      for (const pattern of REFERENCE_PATTERNS) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          let imagePath = match[1];
          
          // Normalize path - remove leading slash for consistency
          if (imagePath.startsWith('/')) {
            imagePath = imagePath.substring(1);
          }
          
          // Convert to relative path from public directory
          if (imagePath.startsWith('images/')) {
            references.add(imagePath.substring('images/'.length));
          } else if (imagePath.includes('/images/')) {
            const imagesIndex = imagePath.indexOf('/images/');
            references.add(imagePath.substring(imagesIndex + '/images/'.length));
          } else {
            // For paths that might be relative to public directory already
            // Check if the path contains an image extension and add it as-is
            if (IMAGE_PATTERNS.test(imagePath)) {
              references.add(imagePath);
            }
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not read ${filePath}:`, error.message);
    }
  }
  
  console.log(`📋 Found ${references.size} unique image references`);
  return references;
}

function normalizeImagePath(imagePath) {
  // Remove /images/ prefix and normalize
  let normalized = imagePath.replace(/^images\//, '');
  
  // Handle optimized paths - map back to source
  if (normalized.startsWith('optimized/')) {
    normalized = normalized.replace('optimized/', '');
    
    // Remove size suffixes from optimized images
    normalized = normalized.replace(/-(?:thumbnail|small|medium|large|xlarge)(?=\.)/, '');
    
    // Convert webp/optimized formats back to likely source formats
    if (normalized.endsWith('.webp')) {
      // Try both jpg and png as potential sources
      return [
        normalized.replace('.webp', '.jpg'),
        normalized.replace('.webp', '.jpeg'),
        normalized.replace('.webp', '.png')
      ];
    }
  }
  
  return [normalized];
}

async function identifyUnusedImages(references, images) {
  console.log('🧹 Identifying unused images...');
  
  const unusedImages = [];
  const usedImages = [];
  
  for (const image of images) {
    const isProtected = PROTECTED_IMAGES.some(protected => 
      image.filename === protected || image.relativePath.endsWith(protected)
    );
    
    if (isProtected) {
      usedImages.push({ ...image, reason: 'Protected file' });
      continue;
    }
    
    let isReferenced = false;
    let referenceReason = '';
    
    // Check if this image (or its source) is referenced
    for (const ref of references) {
      const possiblePaths = normalizeImagePath(image.relativePath);
      
      for (const possiblePath of possiblePaths) {
        if (ref === possiblePath || 
            ref.includes(possiblePath) || 
            possiblePath.includes(ref)) {
          isReferenced = true;
          referenceReason = `Referenced as: ${ref}`;
          break;
        }
      }
      
      if (isReferenced) break;
    }
    
    // For optimized images, check if source image is referenced
    if (!isReferenced && image.isOptimized) {
      const sourceFileName = image.filename
        .replace(/-(?:thumbnail|small|medium|large|xlarge)/, '')
        .replace('.webp', '.jpg')
        .replace('.webp', '.png');
      
      for (const ref of references) {
        if (ref.includes(sourceFileName) || sourceFileName.includes(ref)) {
          isReferenced = true;
          referenceReason = `Optimized version of referenced source: ${sourceFileName}`;
          break;
        }
      }
    }
    
    if (isReferenced) {
      usedImages.push({ ...image, reason: referenceReason });
    } else {
      unusedImages.push(image);
    }
  }
  
  return { unusedImages, usedImages };
}

async function createBackup(images) {
  const backupDir = path.join(PROJECT_ROOT, '.image-cleanup-backup', new Date().toISOString().split('T')[0]);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log(`💾 Creating backup in: ${backupDir}`);
  
  for (const image of images) {
    const backupPath = path.join(backupDir, image.relativePath);
    const backupDirPath = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    
    fs.copyFileSync(image.fullPath, backupPath);
  }
  
  return backupDir;
}

async function deleteImages(images, dryRun = true) {
  if (dryRun) {
    console.log('\n🧪 DRY RUN - No files will be deleted');
    return;
  }
  
  console.log(`\n🗑️  Deleting ${images.length} unused images...`);
  
  for (const image of images) {
    try {
      fs.unlinkSync(image.fullPath);
      console.log(`✅ Deleted: ${image.relativePath} (${(image.size / 1024).toFixed(1)}KB)`);
    } catch (error) {
      console.error(`❌ Failed to delete ${image.relativePath}:`, error.message);
    }
  }
  
  // Clean up empty directories
  await cleanupEmptyDirectories(IMAGES_DIR);
}

async function cleanupEmptyDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await cleanupEmptyDirectories(fullPath);
      
      try {
        const remainingItems = fs.readdirSync(fullPath);
        if (remainingItems.length === 0 && !fullPath.endsWith('/optimized')) {
          fs.rmdirSync(fullPath);
          console.log(`📁 Removed empty directory: ${path.relative(IMAGES_DIR, fullPath)}`);
        }
      } catch (error) {
        // Directory might not be empty or have permission issues
      }
    }
  }
}

function generateReport(unusedImages, usedImages) {
  const totalUnusedSize = unusedImages.reduce((sum, img) => sum + img.size, 0);
  const totalUsedSize = usedImages.reduce((sum, img) => sum + img.size, 0);
  
  console.log('\n📊 CLEANUP REPORT');
  console.log('=' .repeat(50));
  console.log(`📸 Total images scanned: ${unusedImages.length + usedImages.length}`);
  console.log(`✅ Referenced images: ${usedImages.length} (${(totalUsedSize / 1024 / 1024).toFixed(2)}MB)`);
  console.log(`🗑️  Unused images: ${unusedImages.length} (${(totalUnusedSize / 1024 / 1024).toFixed(2)}MB)`);
  
  if (unusedImages.length > 0) {
    console.log('\n🗂️  UNUSED IMAGES:');
    unusedImages.forEach(img => {
      console.log(`   • ${img.relativePath} (${(img.size / 1024).toFixed(1)}KB)`);
    });
    
    console.log(`\n💾 Potential space savings: ${(totalUnusedSize / 1024 / 1024).toFixed(2)}MB`);
  }
  
  return {
    totalImages: unusedImages.length + usedImages.length,
    usedImages: usedImages.length,
    unusedImages: unusedImages.length,
    spaceSavings: totalUnusedSize
  };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--delete');
  const createBackupFlag = args.includes('--backup');
  const verbose = args.includes('--verbose');
  
  console.log('🧹 Starting Kappal Image Cleanup Process...\n');
  
  if (dryRun) {
    console.log('🧪 Running in DRY-RUN mode. Use --delete flag to actually remove files.');
  }
  
  try {
    // Get all images and references
    const [references, images] = await Promise.all([
      findImageReferences(),
      getAllImageFiles()
    ]);
    
    console.log(`📁 Found ${images.length} total images in public/images/`);
    
    // Identify unused images
    const { unusedImages, usedImages } = await identifyUnusedImages(references, images);
    
    // Create backup if requested and not dry run
    if (createBackupFlag && !dryRun && unusedImages.length > 0) {
      await createBackup(unusedImages);
    }
    
    // Generate and display report
    const report = generateReport(unusedImages, usedImages);
    
    // Show detailed usage if verbose
    if (verbose && usedImages.length > 0) {
      console.log('\n📋 REFERENCED IMAGES:');
      usedImages.forEach(img => {
        console.log(`   ✅ ${img.relativePath} - ${img.reason}`);
      });
    }
    
    // Delete unused images
    await deleteImages(unusedImages, dryRun);
    
    if (!dryRun && unusedImages.length > 0) {
      console.log('\n✅ Cleanup completed successfully!');
      console.log(`💾 Freed up ${(report.spaceSavings / 1024 / 1024).toFixed(2)}MB of disk space`);
    } else if (unusedImages.length === 0) {
      console.log('\n🎉 No unused images found! Your project is clean.');
    } else {
      console.log('\n💡 To actually delete these files, run: npm run cleanup-images -- --delete');
      console.log('💡 To create a backup before deletion, add: --backup');
      console.log('💡 To see detailed usage info, add: --verbose');
    }
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  findImageReferences,
  identifyUnusedImages,
  getAllImageFiles
};
