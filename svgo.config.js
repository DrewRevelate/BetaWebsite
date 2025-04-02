/**
 * SVGO Configuration
 * 
 * This configuration is used to optimize SVG files in the project.
 * It can be used with the SVGO CLI or through build tools.
 * 
 * Documentation: https://github.com/svg/svgo
 */

module.exports = {
  // Set multipass to true to optimize SVGs multiple times
  multipass: true,
  // Configure plugins
  plugins: [
    // Basic optimizations that are safe
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Prevent removal of viewBox
          removeViewBox: false,
          // Keep important attributes
          removeHiddenElems: false,
          // Keep role="img" for accessibility
          removeUnknownsAndDefaults: {
            keepRoleAttr: true,
          },
          // Don't optimize IDs too aggressively to prevent breaking animations
          cleanupIDs: {
            preservePrefixes: ['icon-']
          }
        },
      },
    },
    // Remove XML instructions
    {
      name: 'removeXMLNS',
      active: false, // Only remove XML NS in React components, not standalone SVGs
    },
    // Remove doctype to reduce file size
    {
      name: 'removeDoctype',
      active: true,
    },
    // Remove comments to reduce file size
    {
      name: 'removeComments',
      active: true,
    },
    // Remove titles for smaller file size (make sure SVGs have aria-label when used)
    {
      name: 'removeTitle',
      active: false, // Keep titles for accessibility unless explicitly handled with aria-label
    },
    // Sort attribute values to improve compression
    {
      name: 'sortAttrs',
      active: true,
    },
    // Remove unused namespaces
    {
      name: 'removeUselessDefs',
      active: true,
    },
    // Allow arbitrary attributes for compatibility with frameworks
    {
      name: 'removeUnknownsAndDefaults',
      active: true,
      params: {
        keepAriaAttrs: true,
        keepDataAttrs: true,
      },
    },
    // Enable minification of styles
    {
      name: 'minifyStyles',
      active: true,
    },
    // Convert colors to shorter hex values when possible
    {
      name: 'convertColors',
      active: true,
      params: {
        currentColor: true,
      },
    },
    // Remove empty attributes
    {
      name: 'removeEmptyAttrs',
      active: true,
    },
    // Remove empty text nodes
    {
      name: 'removeEmptyText',
      active: true,
    },
    // Clean up bezier curves
    {
      name: 'cleanupNumericValues',
      active: true,
      params: {
        floatPrecision: 3,
      },
    },
    // Convert path data to shorter format
    {
      name: 'convertPathData',
      active: true,
      params: {
        noSpaceAfterFlags: true,
      },
    },
    // Merge paths where possible
    {
      name: 'mergePaths',
      active: true,
    },
    // Round/rewrite transforms
    {
      name: 'convertTransform',
      active: true,
    },
    // Remove redundant strokes and fills
    {
      name: 'removeUselessStrokeAndFill',
      active: true,
    },
  ],
};
