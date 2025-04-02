/**
 * Script to copy static assets from the Express.js project to the Next.js public directory
 */

const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourceBasePath = '/Users/drewlambert/Desktop/Projects/revelate-websiteV2';
const destBasePath = '/Users/drewlambert/Desktop/Projects/revelate-website-next/public';

// Asset directories to copy
const assetDirs = [
  'assets',
  'images',
  'css',
  'js'
];

// Create the public directory if it doesn't exist
if (!fs.existsSync(destBasePath)) {
  fs.mkdirSync(destBasePath, { recursive: true });
  console.log(`Created directory: ${destBasePath}`);
}

/**
 * Copy a directory recursively
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
function copyDir(src, dest) {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    console.log(`Created directory: ${dest}`);
  }
  
  // Read the contents of the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively copy subdirectory
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Copy each asset directory
assetDirs.forEach(dir => {
  const sourcePath = path.join(sourceBasePath, dir);
  const destPath = path.join(destBasePath, dir);
  
  if (fs.existsSync(sourcePath)) {
    console.log(`Copying ${dir} directory...`);
    copyDir(sourcePath, destPath);
  } else {
    console.warn(`Warning: Source directory ${sourcePath} does not exist. Skipping.`);
  }
});

console.log('Asset copy completed!');
