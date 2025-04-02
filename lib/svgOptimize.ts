/**
 * SVG Optimization Utilities
 * 
 * This module provides helper functions for optimizing SVG files and components.
 * It includes utilities for cleaning SVG markup, converting SVGs to optimized React components,
 * and handling responsive SVG rendering.
 */

/**
 * Optimizes an SVG string by removing unnecessary attributes and whitespace
 * This is useful for inline SVGs
 * 
 * @param svgString - The original SVG string
 * @returns Optimized SVG string
 */
export function optimizeSvgString(svgString: string): string {
  if (!svgString) return '';
  
  return svgString
    .replace(/\n/g, ' ')                         // Remove newlines
    .replace(/\s+/g, ' ')                       // Normalize whitespace
    .replace(/ \/>/g, '/>')                     // Remove space before self-closing tags
    .replace(/<!--.*?-->/g, '')                 // Remove comments
    .replace(/width="[^"]*"/g, '')             // Remove hardcoded width
    .replace(/height="[^"]*"/g, '')            // Remove hardcoded height
    .replace(/style="[^"]*"/g, '')             // Remove inline styles
    .replace(/<title>.*?<\/title>/g, '')        // Remove title tags
    .replace(/<desc>.*?<\/desc>/g, '')          // Remove desc tags
    .replace(/ id="[^"]*"/g, '')                // Remove ids
    .replace(/xmlns:xlink="[^"]*"/g, '')        // Remove extra xmlns
    .trim();
}

/**
 * Converts an SVG file to a base64 data URL
 * Useful for inline SVG backgrounds
 * 
 * @param svgString - The SVG markup as a string
 * @returns Base64 encoded data URL
 */
export function svgToDataUrl(svgString: string): string {
  if (!svgString) return '';
  
  const optimized = optimizeSvgString(svgString);
  const encoded = Buffer.from(optimized).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}

/**
 * Creates a responsive SVG element with proper viewBox and other attributes
 * 
 * @param props - SVG element props including width, height, viewBox, and children
 * @returns JSX element for the SVG
 */
export function ResponsiveSvg({ 
  width = '100%', 
  height = '100%', 
  viewBox = '0 0 24 24',
  fill = 'currentColor',
  stroke = 'none',
  children,
  className = '',
  ...rest
}: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/**
 * Generates a CSS-friendly optimized SVG for use in background images
 * 
 * @param svgString - The SVG markup as a string
 * @returns CSS background-image ready string
 */
export function svgToCssBackground(svgString: string): string {
  if (!svgString) return '';
  
  const optimized = optimizeSvgString(svgString);
  // URL encode the SVG
  const encoded = encodeURIComponent(optimized)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
    
  return `url("data:image/svg+xml,${encoded}")`;
}

/**
 * Creates SVG markup with a11y enhancements from a path string
 * 
 * @param pathD - SVG path "d" attribute value
 * @param title - Accessible title for the SVG (for screen readers)
 * @returns Optimized SVG markup with a11y enhancements
 */
export function createSvgFromPath(pathD: string, title?: string): string {
  const titleMarkup = title ? `<title>${title}</title>` : '';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      ${titleMarkup}
      <path d="${pathD}"/>
    </svg>
  `;
  
  return optimizeSvgString(svg);
}
