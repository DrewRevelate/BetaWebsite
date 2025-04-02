#!/usr/bin/env node

/**
 * This script applies Core Web Vitals and Mobile optimizations to all pages in the project
 * It should be run after major changes to ensure consistent performance
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configuration
const APP_DIR = path.join(__dirname, '..', 'app');
const PAGE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];
const IGNORE_DIRS = ['api', 'components', 'lib', 'utils', 'context', 'hooks'];

// Import templates
const performanceLayoutImport = `import PerformanceLayout from '@/components/PerformanceLayout';`;
const mobileOptimizerImport = `import { withMobileOptimization } from '@/components/withMobileOptimization';`;
const imagePlaceholderTemplate = 
`{/* Image optimized for Core Web Vitals */}
<div className="aspect-ratio-box" style={{ position: 'relative', paddingBottom: '56.25%' }}>
  <Image
    src="{src}"
    alt="{alt}"
    fill
    priority={true}
    sizes="{sizes}"
    style={{ objectFit: 'cover' }}
  />
</div>`;

// Performance wrapper template
const performanceWrapperTemplate = 
`<PerformanceLayout
  enableWebVitals={true}
  enableMobileOptimization={true}
  primeCache={true}
  optimizeImages={true}
  pageName="{pageName}"
>
  {children}
</PerformanceLayout>`;

// Count metrics
let totalFilesProcessed = 0;
let filesWithMissingOptimizations = 0;
let optimizationsApplied = 0;

console.log(chalk.blue('🚀 Starting performance optimization process...'));

/**
 * Check if a file is a page file
 * @param {string} filePath Path to the file
 * @returns {boolean} True if it's a page file
 */
function isPageFile(filePath) {
  const isPage = filePath.endsWith('page.js') || filePath.endsWith('page.jsx') || 
                filePath.endsWith('page.ts') || filePath.endsWith('page.tsx');
  return isPage;
}

/**
 * Get pageName from file path
 * @param {string} filePath Path to the file
 * @returns {string} Page name for performance tracking
 */
function getPageName(filePath) {
  // Remove app directory and file extension
  let pageName = filePath.replace(APP_DIR, '').replace(/\.[^/.]+$/, '');
  
  // Remove /page from the end
  pageName = pageName.replace(/\/page$/, '');
  
  // Replace slashes with hyphens
  pageName = pageName.replace(/\//g, '-');
  
  // Remove leading hyphen
  if (pageName.startsWith('-')) {
    pageName = pageName.substring(1);
  }
  
  // Handle root page
  if (pageName === '') {
    pageName = 'home';
  }
  
  return pageName;
}

/**
 * Check if file needs optimization
 * @param {string} content File content
 * @returns {Object} Object with optimization needs
 */
function checkOptimizationNeeds(content) {
  return {
    needsPerformanceLayout: !content.includes('PerformanceLayout'),
    needsMobileOptimization: !content.includes('MobileOptimizer') && !content.includes('withMobileOptimization'),
    needsImageOptimization: content.includes('<Image') && !content.includes('priority')
  };
}

/**
 * Apply performance optimizations to a file
 * @param {string} filePath Path to the file
 */
function applyOptimizations(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const pageName = getPageName(filePath);
    
    // Check what optimizations are needed
    const { 
      needsPerformanceLayout, 
      needsMobileOptimization, 
      needsImageOptimization 
    } = checkOptimizationNeeds(content);
    
    // Skip if no optimizations needed
    if (!needsPerformanceLayout && !needsMobileOptimization && !needsImageOptimization) {
      console.log(chalk.green(`✅ ${filePath} already optimized`));
      return;
    }
    
    filesWithMissingOptimizations++;
    let optimizationsCount = 0;
    
    // Add imports if needed
    if (needsPerformanceLayout && !content.includes(performanceLayoutImport)) {
      const importIndex = content.lastIndexOf('import ');
      let endOfImportsIndex = content.indexOf('\n\n', importIndex);
      if (endOfImportsIndex === -1) {
        endOfImportsIndex = content.indexOf('export');
      }
      
      content = content.substring(0, endOfImportsIndex) + 
                '\n' + performanceLayoutImport + 
                content.substring(endOfImportsIndex);
      
      optimizationsCount++;
    }
    
    if (needsMobileOptimization && !content.includes(mobileOptimizerImport)) {
      const importIndex = content.lastIndexOf('import ');
      let endOfImportsIndex = content.indexOf('\n\n', importIndex);
      if (endOfImportsIndex === -1) {
        endOfImportsIndex = content.indexOf('export');
      }
      
      content = content.substring(0, endOfImportsIndex) + 
                '\n' + mobileOptimizerImport + 
                content.substring(endOfImportsIndex);
      
      optimizationsCount++;
    }
    
    // Add PerformanceLayout wrapper
    if (needsPerformanceLayout) {
      // This is a complex operation, should be done with an AST parser in a real scenario
      // For demo purposes, we'll use a simplified approach
      
      const contentWithoutWrapper = content.replace(/export default function ([A-Za-z0-9_]+)[\s]*\({([^}]*)\}[\s]*\)[\s]*{/, (match, componentName, props) => {
        // Check if the component already has a return statement
        const hasReturnStatement = content.includes('return (');
        
        if (hasReturnStatement) {
          // Extract the return statement
          const returnRegex = /return \(([\s\S]*?)\);/;
          const returnMatch = content.match(returnRegex);
          
          if (returnMatch) {
            const returnContent = returnMatch[1];
            const wrapper = performanceWrapperTemplate
              .replace('{pageName}', pageName)
              .replace('{children}', returnContent);
            
            // Replace the return statement with the wrapped version
            return match.replace(returnRegex, `return (\n${wrapper}\n);`);
          }
        }
        
        return match;
      });
      
      if (contentWithoutWrapper !== content) {
        content = contentWithoutWrapper;
        optimizationsCount++;
      }
    }
    
    // Optimize images
    if (needsImageOptimization) {
      const basicImageRegex = /<Image\s+src="([^"]+)"\s+alt="([^"]+)"\s+width={\d+}\s+height={\d+}\s*\/>/g;
      let match;
      
      while ((match = basicImageRegex.exec(content)) !== null) {
        const [fullMatch, src, alt] = match;
        const optimizedImage = imagePlaceholderTemplate
          .replace('{src}', src)
          .replace('{alt}', alt)
          .replace('{sizes}', '(max-width: 768px) 100vw, 50vw');
        
        content = content.replace(fullMatch, optimizedImage);
        optimizationsCount++;
      }
    }
    
    // Add withMobileOptimization wrapper for client components
    if (needsMobileOptimization && content.includes('use client')) {
      content = content.replace(/export default function ([A-Za-z0-9_]+)/, 'function $1');
      content = content.replace(/export default ([A-Za-z0-9_]+);/, '');
      
      // Add export with HOC at the end
      const componentNameMatch = /function ([A-Za-z0-9_]+)/.exec(content);
      if (componentNameMatch) {
        const componentName = componentNameMatch[1];
        content += `\n\n// Export with mobile optimization applied\nexport default withMobileOptimization(${componentName}, {\n  mobileBreakpoint: 768,\n  optimizeImages: true,\n  reduceMotion: true,\n  optimizeTouchTargets: true,\n  enableFastClick: true,\n  disableHoverOnTouch: true\n});\n`;
        optimizationsCount++;
      }
    }
    
    // Write back the file if changes were made
    if (optimizationsCount > 0) {
      fs.writeFileSync(filePath, content);
      optimizationsApplied += optimizationsCount;
      console.log(chalk.yellow(`🔧 Applied ${optimizationsCount} optimizations to ${filePath}`));
    } else {
      console.log(chalk.green(`✅ No changes needed for ${filePath}`));
    }
  } catch (error) {
    console.error(chalk.red(`Error processing ${filePath}: ${error.message}`));
  }
}

/**
 * Recursively scan a directory for page files
 * @param {string} dir Directory to scan
 */
function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Skip ignored directories
        if (!IGNORE_DIRS.includes(file)) {
          scanDirectory(filePath);
        }
      } else if (stats.isFile() && isPageFile(filePath)) {
        totalFilesProcessed++;
        applyOptimizations(filePath);
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error scanning directory ${dir}: ${error.message}`));
  }
}

// Start the process
scanDirectory(APP_DIR);

console.log(chalk.blue('\n📊 Performance Optimization Summary:'));
console.log(chalk.white(`Total files processed: ${totalFilesProcessed}`));
console.log(chalk.yellow(`Files needing optimization: ${filesWithMissingOptimizations}`));
console.log(chalk.green(`Optimizations applied: ${optimizationsApplied}`));

console.log(chalk.blue('\n🚀 Next steps for manual verification:'));
console.log(chalk.white('1. Run a Lighthouse audit on key pages'));
console.log(chalk.white('2. Test on mobile devices'));
console.log(chalk.white('3. Verify all pages still function correctly'));

console.log(chalk.green('\n✅ Performance optimization process completed!'));
