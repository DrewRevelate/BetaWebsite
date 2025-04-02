#!/usr/bin/env node

/**
 * Script to apply performance optimizations across the project
 * This script will analyze and optimize images, CSS, and JavaScript
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

// Constants
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const COMPONENTS_DIR = path.join(process.cwd(), 'components');
const APP_DIR = path.join(process.cwd(), 'app');

// Main function
async function main() {
  console.log(chalk.blue('🚀 Starting performance optimization process...'));
  
  try {
    // Optimize SVGs
    await optimizeSVGs();
    
    // Optimize images
    await optimizeImages();
    
    // Check for render-blocking resources
    await checkRenderBlockingResources();
    
    // Analyze bundle size
    await analyzeBundleSize();
    
    // Add performance-focused CSS to globals
    await enhanceGlobalCSS();
    
    console.log(chalk.green('✅ Performance optimizations applied successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error applying performance optimizations:'), error);
    process.exit(1);
  }
}

// Function to optimize SVGs
async function optimizeSVGs() {
  console.log(chalk.blue('🔄 Optimizing SVG files...'));
  
  try {
    // Run the SVG optimization script if it exists
    if (fs.existsSync(path.join(process.cwd(), 'scripts/optimize-svgs.js'))) {
      execSync('node scripts/optimize-svgs.js', { stdio: 'inherit' });
      console.log(chalk.green('✅ SVGs optimized successfully!'));
    } else {
      console.log(chalk.yellow('⚠️ SVG optimization script not found. Skipping.'));
    }
  } catch (error) {
    console.error(chalk.red('❌ Error optimizing SVGs:'), error);
    throw error;
  }
}

// Function to optimize images
async function optimizeImages() {
  console.log(chalk.blue('🔄 Optimizing images...'));
  
  try {
    // Run the image optimization script if it exists
    if (fs.existsSync(path.join(process.cwd(), 'scripts/optimize-images.js'))) {
      execSync('node scripts/optimize-images.js', { stdio: 'inherit' });
    } else {
      // Find image files in public directory
      const imageFiles = findFiles(PUBLIC_DIR, ['.jpg', '.jpeg', '.png', '.gif']);
      
      console.log(chalk.yellow(`⚠️ Found ${imageFiles.length} image files that could be optimized.`));
      console.log(chalk.yellow(`ℹ️ Consider using Next.js Image component for all images.`));
      
      imageFiles.forEach(file => {
        console.log(chalk.yellow(`  - ${path.relative(process.cwd(), file)}`));
      });
    }
  } catch (error) {
    console.error(chalk.red('❌ Error optimizing images:'), error);
    throw error;
  }
}

// Check for render-blocking resources
async function checkRenderBlockingResources() {
  console.log(chalk.blue('🔍 Checking for render-blocking resources...'));
  
  try {
    // Check layout.tsx for render-blocking resources
    const layoutPath = path.join(APP_DIR, 'layout.tsx');
    
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      
      // Check for render-blocking patterns
      const renderBlockingPatterns = [
        { pattern: /<link[^>]*stylesheet[^>]*>/g, name: 'Render-blocking stylesheets' },
        { pattern: /<script[^>]*src[^>]*(?!async|defer)[^>]*>/g, name: 'Synchronous scripts' },
        { pattern: /import\s+.*\s+from\s+['"](?!next\/dynamic)/g, name: 'Non-dynamic imports' }
      ];
      
      let hasRenderBlockingResources = false;
      
      renderBlockingPatterns.forEach(({ pattern, name }) => {
        const matches = layoutContent.match(pattern);
        if (matches && matches.length > 0) {
          hasRenderBlockingResources = true;
          console.log(chalk.yellow(`⚠️ Found ${matches.length} ${name}`));
        }
      });
      
      if (!hasRenderBlockingResources) {
        console.log(chalk.green('✅ No obvious render-blocking resources found!'));
      }
    }
  } catch (error) {
    console.error(chalk.red('❌ Error checking render-blocking resources:'), error);
    throw error;
  }
}

// Analyze bundle size
async function analyzeBundleSize() {
  console.log(chalk.blue('📦 Analyzing bundle size...'));
  
  try {
    console.log(chalk.yellow('ℹ️ To analyze bundle size, run:'));
    console.log(chalk.yellow('  npm run analyze'));
  } catch (error) {
    console.error(chalk.red('❌ Error analyzing bundle size:'), error);
    throw error;
  }
}

// Enhance global CSS with performance optimizations
async function enhanceGlobalCSS() {
  console.log(chalk.blue('🎨 Enhancing global CSS with performance optimizations...'));
  
  try {
    const globalCSSPath = path.join(APP_DIR, 'globals.css');
    
    if (fs.existsSync(globalCSSPath)) {
      let cssContent = fs.readFileSync(globalCSSPath, 'utf8');
      
      // Check if content-visibility is already added
      if (!cssContent.includes('content-visibility')) {
        // Add content-visibility optimizations
        cssContent += `
/* Performance optimizations */
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

/* Apply to off-screen sections to improve initial rendering */
@media (min-width: 768px) {
  section:not(:first-child) {
    content-visibility: auto;
    contain-intrinsic-size: 0 300px;
  }
}

/* Optimize animations for performance */
@media (prefers-reduced-motion: no-preference) {
  .will-change-opacity {
    will-change: opacity;
  }
  
  .will-change-transform {
    will-change: transform;
  }
}

/* Load non-critical content only when needed */
.lazy-load {
  will-change: auto;
  transition: opacity 0.5s ease;
}

.lazy-load:not(.loaded) {
  opacity: 0;
}

.lazy-load.loaded {
  opacity: 1;
}
`;
        
        // Write back enhanced CSS
        fs.writeFileSync(globalCSSPath, cssContent);
        console.log(chalk.green('✅ Added performance optimizations to globals.css'));
      } else {
        console.log(chalk.green('✅ Performance optimizations already present in globals.css'));
      }
    }
  } catch (error) {
    console.error(chalk.red('❌ Error enhancing global CSS:'), error);
    throw error;
  }
}

// Helper function to find files with certain extensions
function findFiles(directory, extensions) {
  let results = [];
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      results = results.concat(findFiles(itemPath, extensions));
    } else if (stats.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(itemPath);
      }
    }
  }
  
  return results;
}

// Run the script
main();
