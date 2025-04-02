/**
 * Web Vitals tracking utility
 * 
 * This module provides functions to measure and report Core Web Vitals metrics
 * to analytics platforms for monitoring performance.
 * 
 * Based on the Next.js web-vitals integration example
 */

import type { Metric, ReportHandler } from 'web-vitals';

// Define a window-level variable to prevent duplicate LCP reporting
declare global {
  interface Window {
    __NEXT_WEB_VITALS?: any;
    __WEB_VITALS_POLYFILL__?: boolean;
    __REPORTED_WEB_VITALS?: {
      [key: string]: boolean;
    };
  }
}

/**
 * Initializes web vitals reporting to analytics
 * @param analyticsHandler - The callback to handle the metrics (e.g., GA, custom analytics)
 * @param reportAllMetrics - Whether to report all metrics or just the first instance
 */
export function initWebVitals(
  analyticsHandler?: ReportHandler,
  reportAllMetrics: boolean = false
): void {
  if (typeof window === 'undefined') return;

  // Initialize tracking storage if not present
  if (!window.__REPORTED_WEB_VITALS) {
    window.__REPORTED_WEB_VITALS = {};
  }

  const reportMetric = (metric: Metric): void => {
    // Skip reporting if this type was already reported (unless reportAllMetrics is true)
    if (!reportAllMetrics && window.__REPORTED_WEB_VITALS?.[metric.name]) {
      return;
    }

    // Mark this metric as reported
    if (window.__REPORTED_WEB_VITALS) {
      window.__REPORTED_WEB_VITALS[metric.name] = true;
    }

    // Enhanced metric with additional data
    const enhancedMetric = {
      ...metric,
      // Add page path
      page: window.location.pathname,
      // Detect if user is on slow connection
      connectionType: getConnectionType(),
      // Detect device type
      deviceType: getDeviceType(),
      // Session ID for correlation
      sessionId: getSessionId(),
    };

    // Report to analytics
    if (analyticsHandler) {
      analyticsHandler(enhancedMetric);
    }

    // Also report to Google Analytics if available
    reportToGoogleAnalytics(enhancedMetric);

    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    }
  };

  // Use dynamic imports for web-vitals to avoid issues with SSR
  import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
    // Register all web vitals
    getCLS(reportMetric);
    getFID(reportMetric);
    getLCP(reportMetric);
    getFCP(reportMetric);
    getTTFB(reportMetric);
  }).catch(err => {
    console.error('[Web Vitals] Error loading web-vitals:', err);
  });

  // Custom metrics for image loading performance
  observeImageLoadingPerformance();

  // First Input Timing
  observeFirstInputTiming();

  // JavaScript execution time
  measureJSExecutionTime();
}

/**
 * Report metrics to Google Analytics if available
 */
function reportToGoogleAnalytics(metric: Metric & { page: string }): void {
  // Check if gtag is available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gtag = (window as any).gtag;
    
    try {
      // Send the metric to Google Analytics
      gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
        page_path: metric.page,
        metric_id: metric.id,
        metric_delta: metric.delta,
      });
    } catch (e) {
      // Silence errors from analytics
      console.error('[Web Vitals] Failed to report to Google Analytics:', e);
    }
  }
}

/**
 * Get connection information
 */
function getConnectionType(): string {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'unknown';
  }

  const connection = navigator.connection as any;
  if (!connection) return 'unknown';
  
  return connection.effectiveType || 
         connection.type || 
         'unknown';
}

/**
 * Get device type based on screen size and user agent
 */
function getDeviceType(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'unknown';
  }

  // Check for mobile device via user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
  
  // Also check screen size
  const width = window.innerWidth;
  
  if (isMobile || width < 768) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Get or create a session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return 'unknown';
  }
  
  let sessionId = sessionStorage.getItem('revelate_session_id');
  
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('revelate_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Observe image loading performance across the site
 */
function observeImageLoadingPerformance(): void {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return;
  }

  try {
    const imgObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      // Filter for image resources
      const imageEntries = entries.filter(entry => {
        return (
          entry.initiatorType === 'img' || 
          (entry.initiatorType === 'css' && entry.name.match(/\.(jpg|jpeg|png|gif|svg|webp)/i))
        );
      });
      
      if (imageEntries.length > 0) {
        // Calculate stats
        const totalLoadTime = imageEntries.reduce((sum, entry) => sum + entry.duration, 0);
        const avgLoadTime = totalLoadTime / imageEntries.length;
        const slowestImage = imageEntries.reduce((prev, current) => 
          (prev.duration > current.duration) ? prev : current
        );
        
        // Report to GA
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'image_performance', {
            event_category: 'Performance',
            event_label: 'Image Loading',
            avg_load_time: Math.round(avgLoadTime),
            slowest_image: slowestImage.name.split('/').pop()?.substring(0, 50) || 'unknown',
            slowest_load_time: Math.round(slowestImage.duration),
            image_count: imageEntries.length,
            non_interaction: true
          });
        }
      }
    });
    
    imgObserver.observe({ type: 'resource', buffered: true });
  } catch (e) {
    // Silence errors from PerformanceObserver
    console.error('[Web Vitals] Failed to observe image performance:', e);
  }
}

/**
 * Measure first input timing
 */
function observeFirstInputTiming(): void {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
    return;
  }

  try {
    const observer = new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      if (firstInput) {
        // Report to GA
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'first_input', {
            event_category: 'Performance',
            event_label: 'First Input',
            value: Math.round(firstInput.processingStart - firstInput.startTime),
            input_type: (firstInput as any).name || 'unknown',
            non_interaction: true
          });
        }
        
        // Disconnect observer after first input
        observer.disconnect();
      }
    });
    
    observer.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Silence errors from PerformanceObserver
    console.error('[Web Vitals] Failed to observe first input timing:', e);
  }
}

/**
 * Measure JavaScript execution time
 */
function measureJSExecutionTime(): void {
  if (typeof window === 'undefined' || typeof performance === 'undefined' || !performance.mark) {
    return;
  }

  try {
    // Mark the start of JS execution
    performance.mark('js-execution-start');
    
    // Wait for page to be fully loaded
    window.addEventListener('load', () => {
      // Mark the end of JS execution
      performance.mark('js-execution-end');
      
      // Measure the time between marks
      performance.measure('js-execution', 'js-execution-start', 'js-execution-end');
      
      // Get the measurement
      const [measure] = performance.getEntriesByName('js-execution');
      
      if (measure && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'js_execution', {
          event_category: 'Performance',
          event_label: 'JS Execution Time',
          value: Math.round(measure.duration),
          non_interaction: true
        });
      }
    });
  } catch (e) {
    // Silence errors
    console.error('[Web Vitals] Failed to measure JS execution time:', e);
  }
}

/**
 * Report a custom performance metric to analytics
 */
export function reportCustomMetric(name: string, value: number, additionalData: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  
  // Report to GA
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', name, {
      event_category: 'Performance',
      event_label: additionalData.label || name,
      value: Math.round(value),
      ...additionalData,
      non_interaction: true
    });
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Custom Metric] ${name}:`, value, additionalData);
  }
}

export default {
  initWebVitals,
  reportCustomMetric
};
