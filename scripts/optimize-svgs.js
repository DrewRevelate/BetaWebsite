#!/usr/bin/env node

/**
 * SVG Optimization Script
 * 
 * This script optimizes all SVG files in the public directory using SVGO.
 * It significantly reduces file size and improves performance.
 * 
 * Usage:
 *   node scripts/optimize-svgs.js
 */

const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');
const chalk = require('chalk');
const svgoConfig = require('../svgo.config.js');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const SVG_EXTENSIONS = ['.svg'];
const EXCLUDED_DIRS = ['node_modules', '.next', '.git'];

// Statistics tracking
let stats = {
  total: 0,
  optimized: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0
};

/**
 * Process a single SVG file
 */
async function processSvgFile(filePath) {
  try {
    console.log(chalk.blue(`Processing: ${path.relative(PUBLIC_DIR, filePath)}`));
    
    // Read the original file
    const originalSvg = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(originalSvg, 'utf8');
    stats.originalSize += originalSize;
    
    // Optimize the SVG content
    const result = optimize(originalSvg, {
      path: filePath,
      ...svgoConfig
    });
    
    // Get the optimized SVG
    const optimizedSvg = result.data;
    const optimizedSize = Buffer.byteLength(optimizedSvg, 'utf8');
    stats.optimizedSize += optimizedSize;
    
    // Only write back if there was actual optimization
    if (optimizedSize < originalSize) {
      fs.writeFileSync(filePath, optimizedSvg, 'utf8');
      const savings = originalSize - optimizedSize;
      const savingsPercentage = ((savings / originalSize) * 100).toFixed(2);
      console.log(chalk.green(`✅ Optimized: ${path.basename(filePath)} - Saved ${formatBytes(savings)} (${savingsPercentage}%)`));
      stats.optimized++;
    } else {
      console.log(chalk.yellow(`⏩ Skipped: ${path.basename(filePath)} - Already optimized`));
      stats.skipped++;
    }
  } catch (error) {
    console.error(chalk.red(`❌ Error processing ${filePath}:`), error.message);
    stats.errors++;
  }
}

/**
 * Recursively scan directory for SVG files
 */
function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    
    // Skip excluded directories
    if (isDirectory && EXCLUDED_DIRS.includes(item)) {
      continue;
    }
    
    if (isDirectory) {
      scanDirectory(itemPath);
    } else {
      const ext = path.extname(itemPath).toLowerCase();
      if (SVG_EXTENSIONS.includes(ext)) {
        stats.total++;
        processSvgFile(itemPath);
      }
    }
  }
}

/**
 * Format bytes to a human-readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Print summary of optimization results
 */
function printSummary() {
  const totalSavings = stats.originalSize - stats.optimizedSize;
  const savingsPercentage = ((totalSavings / stats.originalSize) * 100).toFixed(2);
  
  console.log('\n' + chalk.bold('📊 SVG Optimization Summary:'));
  console.log(chalk.blue(`📁 Total SVG files processed: ${stats.total}`));
  console.log(chalk.green(`✅ Optimized: ${stats.optimized}`));
  console.log(chalk.yellow(`⏩ Skipped (already optimized): ${stats.skipped}`));
  console.log(chalk.red(`❌ Errors: ${stats.errors}`));
  
  if (stats.total > 0) {
    console.log(chalk.bold('\n💾 Size Statistics:'));
    console.log(`Original size: ${formatBytes(stats.originalSize)}`);
    console.log(`Optimized size: ${formatBytes(stats.optimizedSize)}`);
    console.log(chalk.green(`Total savings: ${formatBytes(totalSavings)} (${savingsPercentage}%)`));
  }
  
  if (stats.errors > 0) {
    console.log(chalk.yellow('\n⚠️ Some files had errors during optimization. Check the logs above for details.'));
  }
}

/**
 * Main function
 */
async function main() {
  console.log(chalk.bold('🚀 Starting SVG optimization...'));
  console.log(chalk.gray(`Scanning directory: ${PUBLIC_DIR}\n`));
  
  try {
    // Scan for SVG files and optimize them
    scanDirectory(PUBLIC_DIR);
    
    // Print summary statistics
    printSummary();
    
    if (stats.errors === 0) {
      console.log(chalk.bold('\n✨ SVG optimization completed successfully!'));
    } else {
      console.log(chalk.bold('\n⚠️ SVG optimization completed with some errors.'));
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('\n❌ Fatal error:'), error);
    process.exit(1);
  }
}

// Run the main function
main();
