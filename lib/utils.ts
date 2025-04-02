/**
 * Utility functions for the Revelate Operations website
 * Enhanced with SEO and performance optimization utilities
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine class names with Tailwind CSS optimization
 * This merges conflicting Tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable format
 * @param dateString Date string in ISO format or any format accepted by Date constructor
 * @param options Intl.DateTimeFormatOptions for customizing the output
 * @param locale Locale string for localization
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  },
  locale: string = 'en-US'
): string {
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format a number with commas for thousands
 * @param num Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format currency with proper symbol and decimal places
 * @param amount Number to format as currency
 * @param currency Currency code (ISO 4217)
 * @param locale Locale string for localization
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate reading time for text content
 * @param content Text content to calculate reading time for
 * @param wordsPerMinute Average reading speed in words per minute
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Truncate text to a specific length with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length of the truncated text
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  
  // Truncate at the last space before maxLength to avoid cutting words
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Generate a slug from a string
 * @param text String to generate slug from
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    .trim();                  // Trim whitespace
}

/**
 * Strip HTML tags from a string
 * @param html HTML string to strip tags from
 * @returns Plain text string
 */
export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Check if the current environment is a browser
 * @returns True if running in a browser, false if running on the server
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get the current viewport dimensions
 * @returns Object containing viewport width and height
 */
export function getViewportDimensions(): { width: number; height: number } {
  if (!isBrowser()) {
    return { width: 0, height: 0 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Check if the current device is mobile
 * @param breakpoint Breakpoint for mobile devices
 * @returns True if the device is mobile
 */
export function isMobileDevice(breakpoint: number = 768): boolean {
  if (!isBrowser()) {
    return false;
  }
  
  return window.innerWidth < breakpoint;
}

/**
 * Debounce a function call
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Throttle a function call
 * @param fn Function to throttle
 * @param limit Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Get a random item from an array
 * @param array Array to get random item from
 * @returns Random item from the array
 */
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get a random number between a minimum and maximum value
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number between min and max
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

/**
 * Check if an element is in the viewport
 * @param element Element to check
 * @param offset Offset from viewport edges
 * @returns True if the element is in the viewport
 */
export function isInViewport(element: HTMLElement, offset: number = 0): boolean {
  if (!isBrowser()) {
    return false;
  }
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 - offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Convert HTML to plain text
 * @param html HTML string
 * @returns Plain text
 */
export function htmlToPlainText(html: string): string {
  if (!html) return '';
  
  if (isBrowser()) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  } else {
    return html.replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}

/**
 * SEO-related utilities
 */

/**
 * Generates JSON-LD structured data for SEO
 * @param type Schema.org type (e.g., 'Article', 'Product', 'FAQPage')
 * @param data Data object with schema properties
 * @returns JSON string for use in script tags
 */
export function generateStructuredData(type: string, data: Record<string, any>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  });
}

/**
 * Generates JSON-LD FAQ structured data for SEO
 * @param faqs Array of question and answer pairs
 * @returns JSON string for use in script tags
 */
export function generateFAQStructuredData(faqs: {question: string, answer: string}[]): string {
  return generateStructuredData('FAQPage', {
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  });
}

/**
 * Generates JSON-LD BreadcrumbList structured data for SEO
 * @param items Array of breadcrumb items with name and URL
 * @returns JSON string for use in script tags
 */
export function generateBreadcrumbStructuredData(items: {name: string, url: string}[]): string {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  });
}

/**
 * Generates a canonical URL for the current page
 * @param path Path of the current page
 * @returns Full canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://revelateops.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generates a title that balances SEO and readability
 * @param pageTitle Page-specific title
 * @param siteName Site name for appending
 * @returns Optimized title string
 */
export function generateSeoTitle(pageTitle: string, siteName: string = 'Revelate Operations'): string {
  if (!pageTitle) return siteName;
  
  // Keep the full title under 60 characters for SEO
  const maxLength = 60;
  
  if (`${pageTitle} | ${siteName}`.length <= maxLength) {
    return `${pageTitle} | ${siteName}`;
  }
  
  // If too long, prioritize the page title
  const siteNameShort = 'Revelate';
  if (`${pageTitle} | ${siteNameShort}`.length <= maxLength) {
    return `${pageTitle} | ${siteNameShort}`;
  }
  
  // In extreme cases, just use the page title
  if (pageTitle.length > maxLength) {
    return truncateText(pageTitle, maxLength - 3) + '...';
  }
  
  return pageTitle;
}

/**
 * Generates an SEO-optimized description
 * @param text Input text to convert to description
 * @param maxLength Maximum length for the description
 * @returns Optimized description string
 */
export function generateSeoDescription(text: string, maxLength: number = 160): string {
  if (!text) return '';
  
  // Strip HTML if present
  const plainText = htmlToPlainText(text);
  
  // Ensure it's within the optimal length for SEO (150-160 chars)
  return truncateText(plainText, maxLength);
}

/**
 * Performance measurement utility
 * @param label Label for the measurement
 * @returns Functions to start and end measurement
 */
export function measurePerformance(label: string = 'Performance') {
  const start = () => {
    if (isBrowser() && window.performance) {
      performance.mark(`${label}:start`);
    }
  };
  
  const end = () => {
    if (isBrowser() && window.performance) {
      performance.mark(`${label}:end`);
      performance.measure(label, `${label}:start`, `${label}:end`);
      const measurement = performance.getEntriesByName(label)[0];
      console.log(`${label}: ${measurement.duration.toFixed(2)}ms`);
      return measurement.duration;
    }
    return 0;
  };
  
  return { start, end };
}