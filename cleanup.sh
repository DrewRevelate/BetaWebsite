#!/bin/bash
# Cleanup script for Next.js project

echo "Starting cleanup process..."

# Remove .next directory
echo "Removing .next directory..."
rm -rf .next

# Remove node_modules/.cache
echo "Clearing node_modules cache..."
rm -rf node_modules/.cache

# Remove any temporary files
echo "Removing any temporary files..."
find . -name "*.log" -delete
find . -name ".DS_Store" -delete

echo "Cleanup complete. You can now rebuild the project with:"
echo "npm run build"
echo ""
echo "To run the development server after cleanup, use:"
echo "npm run dev"
