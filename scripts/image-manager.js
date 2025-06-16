#!/usr/bin/env node

/**
 * Comprehensive Image Management Script for Kappal Multi-Domain Website
 * 
 * This script orchestrates the complete image optimization and cleanup workflow:
 * 1. Optimizes all source images (new/modified ones)
 * 2. Cleans up unused images and orphaned optimized files
 * 3. Provides detailed analytics and savings reports
 * 4. Offers different execution modes (analysis, optimization, cleanup)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import our optimization and cleanup modules
const { processImageSet } = require('./optimize-images');
const { cleanupUnusedImages, getAllImageFiles, scanForImageReferences } = require('./cleanup-unused-images');

const PROJECT_ROOT = process.cwd();
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  
  return {
    mode: args.find(arg => ['analyze', 'optimize', 'cleanup', 'full'].includes(arg)) || 'analyze',
    force: args.includes('--force'),
    execute: args.includes('--execute'),
    backup: args.includes('--backup'),
    verbose: args.includes('--verbose'),
    help: args.includes('--help') || args.includes('-h')
  };
}

/**
 * Display help information
 */
function showHelp() {
  console.log(`
🖼️  Kappal Image Management Tool

USAGE:
  node scripts/image-manager.js [mode] [options]

MODES:
  analyze   📊 Analyze current image usage and optimization status (default)
  optimize  🚀 Run image optimization process
  cleanup   🧹 Clean up unused images
  full      🎯 Run complete optimization + cleanup workflow

OPTIONS:
  --execute    Actually perform deletions (cleanup mode)
  --backup     Create backup before cleanup
  --force      Force reprocessing of all images
  --verbose    Show detailed output
  --help, -h   Show this help message

EXAMPLES:
  node scripts/image-manager.js analyze                    # Analyze only
  node scripts/image-manager.js optimize                   # Optimize images
  node scripts/image-manager.js cleanup --execute         # Clean unused images
  node scripts/image-manager.js full --execute --backup   # Complete workflow
  node scripts/image-manager.js analyze --verbose         # Detailed analysis

WORKFLOW:
  1. 📊 Analysis: Scans all images and references
  2. 🚀 Optimization: Processes new/modified images
  3. 🧹 Cleanup: Removes unused images and orphaned files
  4. 📈 Reports: Provides comprehensive statistics
`);
}

/**
 * Get image statistics
 */
async function getImageStats() {
  const stats = {
    total: { count: 0, size: 0 },
    source: { count: 0, size: 0 },
    optimized: { count: 0, size: 0 },
    unused: { count: 0, size: 0 }
  };

  function walkDirectory(dir, isOptimized = false) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (item === 'optimized') {
          walkDirectory(fullPath, true);
        } else {
          walkDirectory(fullPath, isOptimized);
        }
      } else if (/\.(jpg|jpeg|png|gif|svg|webp|avif)$/i.test(item)) {
        stats.total.count++;
        stats.total.size += stat.size;
        
        if (isOptimized) {
          stats.optimized.count++;
          stats.optimized.size += stat.size;
        } else {
          stats.source.count++;
          stats.source.size += stat.size;
        }
      }
    }
  }

  walkDirectory(IMAGES_DIR);
  return stats;
}

/**
 * Analysis mode - comprehensive image analysis
 */
async function runAnalysis(options) {
  console.log('📊 COMPREHENSIVE IMAGE ANALYSIS');
  console.log('=' .repeat(60));
  
  // Get basic statistics
  console.log('\n📈 Getting image statistics...');
  const stats = await getImageStats();
  
  console.log('\n📁 IMAGE INVENTORY:');
  console.log(`   📸 Total images: ${stats.total.count} (${(stats.total.size / 1024 / 1024).toFixed(2)}MB)`);
  console.log(`   🔧 Source images: ${stats.source.count} (${(stats.source.size / 1024 / 1024).toFixed(2)}MB)`);
  console.log(`   ⚡ Optimized images: ${stats.optimized.count} (${(stats.optimized.size / 1024 / 1024).toFixed(2)}MB)`);
  
  // Optimization coverage
  const optimizationCoverage = stats.source.count > 0 ? 
    (stats.optimized.count / (stats.source.count * 5)) * 100 : 0; // Assume ~5 variants per source
  
  console.log(`   📊 Optimization coverage: ~${optimizationCoverage.toFixed(1)}%`);
  
  // Check for unused images
  console.log('\n🔍 Analyzing image usage...');
  try {
    // Run cleanup in dry-run mode to get unused image count
    const { spawn } = require('child_process');
    const output = await new Promise((resolve, reject) => {
      const child = spawn('node', ['scripts/cleanup-unused-images.js'], {
        cwd: PROJECT_ROOT,
        stdio: 'pipe'
      });
      
      let outputData = '';
      child.stdout.on('data', (data) => {
        outputData += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          resolve(outputData);
        } else {
          reject(new Error(`Cleanup analysis failed with code ${code}`));
        }
      });
    });
    
    // Parse cleanup output for unused image count
    const unusedMatch = output.match(/🗑️\s+Unused images:\s+(\d+)/);
    const unusedCount = unusedMatch ? parseInt(unusedMatch[1]) : 0;
    
    const spaceSavingsMatch = output.match(/💾 Potential space savings:\s+([\d.]+)MB/);
    const spaceSavings = spaceSavingsMatch ? parseFloat(spaceSavingsMatch[1]) : 0;
    
    stats.unused.count = unusedCount;
    stats.unused.size = spaceSavings * 1024 * 1024;
    
    console.log(`   🗑️ Unused images: ${unusedCount} (${spaceSavings.toFixed(2)}MB)`);
    
  } catch (error) {
    console.warn('⚠️  Could not analyze unused images:', error.message);
  }
  
  // Performance recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  
  if (optimizationCoverage < 80) {
    console.log('   🚀 Run image optimization to improve performance');
  }
  
  if (stats.unused.count > 0) {
    console.log(`   🧹 Remove ${stats.unused.count} unused images to free ${(stats.unused.size / 1024 / 1024).toFixed(2)}MB`);
  }
  
  if (stats.source.size > 100 * 1024 * 1024) { // > 100MB
    console.log('   📦 Consider using a CDN for better global performance');
  }
  
  if (optimizationCoverage >= 80 && stats.unused.count === 0) {
    console.log('   ✅ Your images are well-optimized! Consider monitoring for future changes.');
  }
  
  // Next steps
  console.log('\n🎯 NEXT STEPS:');
  console.log('   1. Run optimization: node scripts/image-manager.js optimize');
  console.log('   2. Clean unused files: node scripts/image-manager.js cleanup --execute --backup');
  console.log('   3. Monitor regularly: Add to CI/CD pipeline');
  
  return stats;
}

/**
 * Optimization mode - run image optimization
 */
async function runOptimization(options) {
  console.log('🚀 STARTING IMAGE OPTIMIZATION');
  console.log('=' .repeat(50));
  
  try {
    console.log('📸 Running comprehensive image optimization...\n');
    
    const result = execSync('npm run optimize:images', {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    console.log('\n✅ Image optimization completed successfully!');
    
  } catch (error) {
    console.error('❌ Image optimization failed:', error.message);
    throw error;
  }
}

/**
 * Cleanup mode - remove unused images
 */
async function runCleanup(options) {
  console.log('🧹 STARTING IMAGE CLEANUP');
  console.log('=' .repeat(40));
  
  try {
    const args = ['scripts/cleanup-unused-images.js'];
    
    if (options.execute) {
      args.push('--delete');
    }
    
    if (options.backup) {
      args.push('--backup');
    }
    
    if (options.verbose) {
      args.push('--verbose');
    }
    
    console.log(`🔍 Running cleanup ${options.execute ? '(LIVE MODE)' : '(DRY RUN)'}...\n`);
    
    execSync(`node ${args.join(' ')}`, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    if (options.execute) {
      console.log('\n✅ Image cleanup completed successfully!');
    } else {
      console.log('\n💡 This was a dry run. Add --execute to actually delete files.');
    }
    
  } catch (error) {
    console.error('❌ Image cleanup failed:', error.message);
    throw error;
  }
}

/**
 * Full workflow mode - complete optimization and cleanup
 */
async function runFullWorkflow(options) {
  console.log('🎯 STARTING COMPLETE IMAGE WORKFLOW');
  console.log('=' .repeat(55));
  
  const startTime = Date.now();
  let stats = {};
  
  try {
    // Step 1: Initial analysis
    console.log('\n📊 Step 1: Initial Analysis');
    console.log('-' .repeat(30));
    const initialStats = await runAnalysis(options);
    
    // Step 2: Image optimization
    console.log('\n🚀 Step 2: Image Optimization');
    console.log('-' .repeat(35));
    await runOptimization(options);
    
    // Step 3: Cleanup unused images
    console.log('\n🧹 Step 3: Cleanup Unused Images');
    console.log('-' .repeat(35));
    await runCleanup(options);
    
    // Step 4: Final analysis
    console.log('\n📈 Step 4: Final Analysis');
    console.log('-' .repeat(30));
    const finalStats = await runAnalysis(options);
    
    // Workflow summary
    const duration = (Date.now() - startTime) / 1000;
    
    console.log('\n🎉 WORKFLOW COMPLETED SUCCESSFULLY!');
    console.log('=' .repeat(55));
    console.log(`⏱️  Total time: ${duration.toFixed(2)}s`);
    
    if (options.execute) {
      const sizeBefore = initialStats.total.size;
      const sizeAfter = finalStats.total.size;
      const savings = sizeBefore - sizeAfter;
      
      console.log(`💾 Space freed: ${(savings / 1024 / 1024).toFixed(2)}MB`);
      console.log(`📉 Size reduction: ${((savings / sizeBefore) * 100).toFixed(1)}%`);
    }
    
    console.log('\n🏆 Your images are now fully optimized!');
    
  } catch (error) {
    console.error('❌ Workflow failed:', error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();
  
  if (options.help) {
    showHelp();
    return;
  }
  
  console.log('🖼️  Kappal Image Management Tool');
  console.log(`Mode: ${options.mode.toUpperCase()}`);
  
  if (options.execute && !['cleanup', 'full'].includes(options.mode)) {
    console.log('⚠️  --execute flag only applies to cleanup and full modes');
  }
  
  console.log('');
  
  try {
    switch (options.mode) {
      case 'analyze':
        await runAnalysis(options);
        break;
        
      case 'optimize':
        await runOptimization(options);
        break;
        
      case 'cleanup':
        await runCleanup(options);
        break;
        
      case 'full':
        await runFullWorkflow(options);
        break;
        
      default:
        console.error(`❌ Unknown mode: ${options.mode}`);
        showHelp();
        process.exit(1);
    }
    
  } catch (error) {
    console.error(`❌ ${options.mode} failed:`, error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  runAnalysis,
  runOptimization,
  runCleanup,
  runFullWorkflow
};
