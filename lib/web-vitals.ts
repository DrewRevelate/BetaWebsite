// Core Web Vitals collection and reporting
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// Types for Web Vitals metrics
type MetricName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';

interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

interface WebVitalsOptions {
  debug?: boolean;
  reportTo?: 'console' | 'analytics' | 'both';
  sampleRate?: number;
  includePath?: boolean;
  includeDeviceInfo?: boolean;
}

// Default threshold values based on Google's Core Web Vitals recommendations
const thresholds = {
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FID: { good: 100, poor: 300 },  // First Input Delay (ms)
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, poor: 500 }    // Interaction to Next Paint (ms)
};

// Helper to determine rating based on thresholds
const getRating = (name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= thresholds[name].good) return 'good';
  if (value <= thresholds[name].poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Collect and report Web Vitals metrics with enhanced features
 * @param options Configuration options for Web Vitals collection
 */
export const collectWebVitals = (options: WebVitalsOptions = {}) => {
  const {
    debug = false,
    reportTo = 'console',
    sampleRate = 1.0, // Default to collecting all data
    includePath = true,
    includeDeviceInfo = true,
  } = options;

  // Only collect based on sample rate (e.g., 0.1 = 10% of users)
  if (Math.random() > sampleRate) return;

  // Handler for all metrics
  const handleMetric = (metric: WebVitalMetric) => {
    // Add rating based on thresholds
    metric.rating = getRating(metric.name, metric.value);

    // Collect additional data if required
    const reportData = {
      ...metric,
      path: includePath ? window.location.pathname : undefined,
      deviceType: includeDeviceInfo ? getDeviceType() : undefined,
      deviceMemory: includeDeviceInfo ? (navigator as any)?.deviceMemory : undefined,
      connectionType: includeDeviceInfo ? (navigator as any)?.connection?.effectiveType : undefined,
      timestamp: Date.now(),
    };

    // Report metrics based on configuration
    if (reportTo === 'console' || reportTo === 'both' || debug) {
      const color = metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red';
      console.log(`%c${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`, `color: ${color}; font-weight: bold;`);
      
      if (debug) {
        console.log('Web Vitals Details:', reportData);
      }
    }

    if (reportTo === 'analytics' || reportTo === 'both') {
      try {
        // Send to analytics (using Fetch API for better reliability)
        if (typeof window !== 'undefined' && window.fetch) {
          // This is a placeholder - replace with your actual analytics endpoint
          // In production, you'd likely use a proper analytics service
          const analyticsEndpoint = '/api/collect-web-vitals';
          
          // Use sendBeacon if available (better for analytics as it sends data even if page unloads)
          if (navigator.sendBeacon) {
            navigator.sendBeacon(analyticsEndpoint, JSON.stringify(reportData));
          } else {
            // Fallback to fetch
            fetch(analyticsEndpoint, {
              method: 'POST',
              body: JSON.stringify(reportData),
              keepalive: true, // Important for analytics
              headers: {
                'Content-Type': 'application/json'
              }
            }).catch(err => {
              if (debug) console.error('Error sending Web Vitals to analytics:', err);
            });
          }
        }
      } catch (error) {
        if (debug) console.error('Failed to send Web Vitals to analytics:', error);
      }
    }
  };

  // Register all metrics
  onCLS(handleMetric);
  onFID(handleMetric);
  onFCP(handleMetric);
  onLCP(handleMetric);
  onTTFB(handleMetric);
  onINP(handleMetric);
};

// Helper to detect device type
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Custom hook for running Web Vitals performance report
 * Can be used in specific pages or components
 */
export const useWebVitals = (options: WebVitalsOptions = {}) => {
  if (typeof window !== 'undefined') {
    collectWebVitals(options);
  }
};
