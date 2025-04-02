/**
 * Performance Utilities for Optimizing Core Web Vitals
 * 
 * This file contains utilities to improve LCP, CLS, FID, and other Core Web Vitals metrics
 * by optimizing resource loading, preventing layout shifts, and improving interactivity.
 */

// Resource Hints Types
type ResourceType = 'script' | 'style' | 'font' | 'image';
type FetchPriority = 'high' | 'low' | 'auto';

interface ResourceHint {
  url: string;
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  as?: ResourceType;
  crossOrigin?: boolean;
  priority?: FetchPriority;
}

/**
 * Add resource hints to improve loading performance
 * @param hints Array of resource hints to add
 */
export function addResourceHints(hints: ResourceHint[]): void {
  if (typeof document === 'undefined') return;

  // Remove any existing hints with the same URLs to prevent duplicates
  const existingLinks = document.head.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="preconnect"], link[rel="dns-prefetch"]');
  const existingUrls = new Set<string>();
  
  existingLinks.forEach((link) => {
    const url = link.getAttribute('href');
    if (url) existingUrls.add(url);
  });

  // Add new hints
  hints.forEach((hint) => {
    if (existingUrls.has(hint.url)) return;

    const linkElement = document.createElement('link');
    linkElement.rel = hint.type;
    linkElement.href = hint.url;
    
    if (hint.as && (hint.type === 'preload' || hint.type === 'prefetch')) {
      linkElement.setAttribute('as', hint.as);
    }
    
    if (hint.crossOrigin) {
      linkElement.crossOrigin = 'anonymous';
    }
    
    if (hint.priority && 'fetchpriority' in HTMLLinkElement.prototype) {
      // @ts-ignore - TypeScript doesn't know about fetchpriority yet
      linkElement.fetchpriority = hint.priority;
    }
    
    document.head.appendChild(linkElement);
  });
}

/**
 * Preload critical resources based on the current page
 * @param pageName Name of the current page for specific optimizations
 */
export function preloadCriticalResources(pageName?: string): void {
  // Base critical resources for all pages
  const criticalResources: ResourceHint[] = [
    // Font preloads
    { 
      url: '/fonts/inter-var.woff2', 
      type: 'preload', 
      as: 'font', 
      crossOrigin: true,
      priority: 'high' 
    },
    
    // Preconnect to external domains
    { 
      url: 'https://cdnjs.cloudflare.com', 
      type: 'preconnect', 
      crossOrigin: true 
    },
    { 
      url: 'https://fonts.gstatic.com', 
      type: 'preconnect', 
      crossOrigin: true 
    }
  ];
  
  // Page-specific critical resources
  if (pageName) {
    if (pageName === 'home') {
      // Critical home page resources
      criticalResources.push(
        { 
          url: '/images/hero-image.webp', 
          type: 'preload', 
          as: 'image',
          priority: 'high'
        }
      );
    } else if (pageName.startsWith('blog')) {
      // Critical blog resources
      criticalResources.push(
        { 
          url: '/images/blog/default-cover.jpg', 
          type: 'preload', 
          as: 'image',
          priority: 'high'
        }
      );
    } else if (pageName === 'services') {
      // Critical services page resources
      criticalResources.push(
        { 
          url: '/images/patterns/grid-pattern.svg', 
          type: 'preload', 
          as: 'image' 
        }
      );
    }
  }
  
  addResourceHints(criticalResources);
}

/**
 * Defer non-critical JavaScript
 * @param scriptUrls Array of script URLs to defer
 */
export function deferNonCriticalScripts(scriptUrls: string[]): void {
  if (typeof document === 'undefined') return;
  
  scriptUrls.forEach(url => {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    
    // Add to document when idle or after a slight delay
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        document.body.appendChild(script);
      });
    } else {
      setTimeout(() => {
        document.body.appendChild(script);
      }, 2000);
    }
  });
}

/**
 * Optimize image loading by setting appropriate loading attribute
 * based on viewport position
 */
export function optimizeImageLoading(): void {
  if (typeof document === 'undefined') return;
  
  // Use IntersectionObserver to detect when images are near viewport
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading when image is 200px from viewport
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        img.setAttribute('src', dataSrc);
        img.removeAttribute('data-src');
      }
    });
  }
}

/**
 * Prevent Cumulative Layout Shift (CLS) by preserving space for elements
 * that load dynamically
 */
export function preventLayoutShifts(): void {
  if (typeof document === 'undefined') return;
  
  // Add aspect ratio boxes for images without dimensions
  document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
    const parent = img.parentElement;
    
    if (parent && !parent.classList.contains('aspect-ratio-box')) {
      // Default aspect ratio if unknown (16:9)
      const aspectRatio = 9 / 16 * 100;
      
      // Create wrapper with padding-bottom technique
      parent.classList.add('aspect-ratio-box');
      parent.style.position = 'relative';
      parent.style.paddingBottom = `${aspectRatio}%`;
      
      // Style the image
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
    }
  });
  
  // Reserve space for embeds and iframes
  document.querySelectorAll('iframe:not([width]):not([height])').forEach(iframe => {
    // Standard sizes for common embeds
    iframe.style.width = '100%';
    iframe.style.height = '400px'; // Default height
  });
}

/**
 * Measure and report real user metrics to analytics
 */
export function reportPerformanceMetrics(): void {
  if (typeof window === 'undefined' || !('performance' in window)) return;
  
  // Wait for page to fully load
  window.addEventListener('load', () => {
    // Use requestIdleCallback to avoid impacting page performance
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        collectMetrics();
      });
    } else {
      setTimeout(collectMetrics, 3000);
    }
  });
  
  function collectMetrics() {
    // Get navigation timing data
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    const timeToFirstByte = perfData.responseStart - perfData.navigationStart;
    
    // Get paint timing data if available
    let fcp = 0;
    let lcp = 0;
    
    if ('getEntriesByType' in performance) {
      const paintMetrics = performance.getEntriesByType('paint');
      const fcpEntry = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
      
      if (fcpEntry) {
        fcp = fcpEntry.startTime;
      }
      
      // LCP requires web-vitals library to measure properly
      // This is just a simplified version
      const entries = performance.getEntriesByType('resource');
      if (entries.length > 0) {
        // Assume the largest image or text block might be the LCP
        const largeEntries = entries
          .filter(entry => entry.initiatorType === 'img' || entry.initiatorType === 'css')
          .sort((a, b) => b.transferSize - a.transferSize);
          
        if (largeEntries.length > 0) {
          lcp = largeEntries[0].responseEnd;
        }
      }
    }
    
    // Collect the data
    const metrics = {
      pageLoadTime,
      domReadyTime,
      timeToFirstByte,
      firstContentfulPaint: fcp,
      largestContentfulPaint: lcp,
      url: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    
    // Send to analytics endpoint (implementation varies)
    // This is a placeholder - in a real app, you'd send to your analytics service
    console.log('Performance metrics:', metrics);
    
    // Optional: send to analytics endpoint
    /*
    fetch('/api/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metrics),
      // Use keepalive to ensure the request completes even if the page is unloaded
      keepalive: true
    }).catch(err => console.error('Failed to report metrics:', err));
    */
  }
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations(pageName?: string): void {
  // Run on client-side only
  if (typeof window === 'undefined') return;
  
  // Defer initialization to not block the main thread
  setTimeout(() => {
    preloadCriticalResources(pageName);
    preventLayoutShifts();
    optimizeImageLoading();
    reportPerformanceMetrics();
  }, 50);

  // Defer non-critical scripts
  deferNonCriticalScripts([
    // Add non-critical third-party scripts here
    'https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.3/tiny-slider.min.js',
  ]);
}