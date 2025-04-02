'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PerformanceMonitorProps {
  shouldTrackRouteChanges?: boolean;
  shouldTrackInteractions?: boolean;
}

// Core Web Vitals thresholds
const LCP_THRESHOLD = 2500; // 2.5 seconds
const FID_THRESHOLD = 100;  // 100 milliseconds
const CLS_THRESHOLD = 0.1;  // 0.1 score

/**
 * PerformanceMonitor component for tracking Core Web Vitals
 */
export default function PerformanceMonitor({
  shouldTrackRouteChanges = true,
  shouldTrackInteractions = true
}: PerformanceMonitorProps) {
  const pathname = usePathname();
  const isInitialized = useRef(false);
  
  useEffect(() => {
    // Only initialize once
    if (isInitialized.current) return;
    isInitialized.current = true;
    
    // Only in production and only for a sample of users (10%)
    if (
      process.env.NODE_ENV !== 'production' ||
      !navigator.sendBeacon ||
      Math.random() >= 0.1
    ) {
      return;
    }
    
    try {
      // Dynamically load Web Vitals to avoid bundle bloat
      const webVitalsScript = document.createElement('script');
      webVitalsScript.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.iife.js';
      webVitalsScript.async = true;
      
      // Initialize Core Web Vitals tracking once script is loaded
      webVitalsScript.onload = () => {
        // Track Largest Contentful Paint
        // @ts-ignore - Web Vitals global
        webVitals.getLCP((metric) => {
          // Include element attribution data
          const attribution = metric.attribution;
          const element = attribution?.element 
            ? `${attribution.element.tagName.toLowerCase()}${attribution.element.id ? '#' + attribution.element.id : ''}`
            : 'unknown';
          
          const vitalsData = {
            name: 'LCP',
            id: metric.id,
            value: metric.value,
            path: pathname,
            element: element,
            url: attribution?.url || 'same-origin',
            isGood: metric.value < LCP_THRESHOLD,
            delta: metric.delta,
            navigationType: metric.navigationType,
            rating: metric.rating
          };
          
          // Send data to analytics endpoint
          navigator.sendBeacon('/api/vitals', JSON.stringify(vitalsData));
        }, { reportAllChanges: false });
        
        // Track First Input Delay
        // @ts-ignore - Web Vitals global
        webVitals.getFID((metric) => {
          const attribution = metric.attribution;
          const eventType = attribution?.eventType || 'unknown';
          const eventTarget = attribution?.eventTarget 
            ? `${attribution.eventTarget.tagName?.toLowerCase() || 'unknown'}${attribution.eventTarget.id ? '#' + attribution.eventTarget.id : ''}`
            : 'unknown';
          
          const vitalsData = {
            name: 'FID',
            id: metric.id,
            value: metric.value,
            path: pathname,
            eventType: eventType,
            eventTarget: eventTarget,
            isGood: metric.value < FID_THRESHOLD,
            delta: metric.delta,
            rating: metric.rating
          };
          
          navigator.sendBeacon('/api/vitals', JSON.stringify(vitalsData));
        });
        
        // Track Cumulative Layout Shift
        // @ts-ignore - Web Vitals global
        webVitals.getCLS((metric) => {
          const attribution = metric.attribution;
          
          // Get layout shift sources for debugging
          const sources = attribution?.sources?.map(source => ({
            node: source.node?.nodeName?.toLowerCase() || 'unknown',
            previousRect: `${source.previousRect?.width}x${source.previousRect?.height}`,
            currentRect: `${source.currentRect?.width}x${source.currentRect?.height}`
          })) || [];
          
          const vitalsData = {
            name: 'CLS',
            id: metric.id,
            value: metric.value,
            path: pathname,
            largestShiftTarget: attribution?.largestShiftTarget 
              ? attribution.largestShiftTarget.nodeName?.toLowerCase()
              : 'unknown',
            isGood: metric.value < CLS_THRESHOLD,
            delta: metric.delta,
            sources: JSON.stringify(sources.slice(0, 3)), // Limit to top 3 sources
            rating: metric.rating
          };
          
          navigator.sendBeacon('/api/vitals', JSON.stringify(vitalsData));
        }, { reportAllChanges: false });
        
        // Track Time to First Byte
        // @ts-ignore - Web Vitals global
        webVitals.getTTFB((metric) => {
          const vitalsData = {
            name: 'TTFB',
            id: metric.id,
            value: metric.value,
            path: pathname,
            isServerTime: metric.serverTime !== undefined,
            serverTime: metric.serverTime,
            delta: metric.delta,
            rating: metric.rating
          };
          
          navigator.sendBeacon('/api/vitals', JSON.stringify(vitalsData));
        });
        
        // Track Interaction to Next Paint
        // @ts-ignore - Web Vitals global
        if (shouldTrackInteractions && webVitals.getINP) {
          // @ts-ignore - Web Vitals global
          webVitals.getINP((metric) => {
            const attribution = metric.attribution;
            const eventTarget = attribution?.eventTarget 
              ? `${attribution.eventTarget.tagName?.toLowerCase() || 'unknown'}${attribution.eventTarget.id ? '#' + attribution.eventTarget.id : ''}`
              : 'unknown';
              
            const vitalsData = {
              name: 'INP',
              id: metric.id,
              value: metric.value,
              path: pathname,
              eventType: attribution?.eventType || 'unknown',
              eventTarget: eventTarget,
              loadState: attribution?.loadState || 'unknown',
              delta: metric.delta,
              rating: metric.rating
            };
            
            navigator.sendBeacon('/api/vitals', JSON.stringify(vitalsData));
          }, { reportAllChanges: false });
        }
      };
      
      // Add script to head
      document.head.appendChild(webVitalsScript);
      
      // Track device info for better diagnostics
      setTimeout(() => {
        try {
          const deviceInfo = {
            name: 'DEVICE_INFO',
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
              dpr: window.devicePixelRatio || 1
            },
            connection: {
              effectiveType: (navigator?.connection as any)?.effectiveType || 'unknown',
              downlink: (navigator?.connection as any)?.downlink || 'unknown',
              rtt: (navigator?.connection as any)?.rtt || 'unknown',
              saveData: (navigator?.connection as any)?.saveData || false
            },
            path: pathname,
            userAgent: navigator.userAgent,
            memory: (performance as any)?.memory?.jsHeapSizeLimit 
              ? Math.round((performance as any).memory.jsHeapSizeLimit / (1024 * 1024)) 
              : 'unknown',
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
            timestamp: Date.now()
          };
          
          navigator.sendBeacon('/api/vitals', JSON.stringify(deviceInfo));
        } catch (e) {
          // Silently fail
        }
      }, a3000);
    } catch (e) {
      console.warn('Error initializing performance monitoring:', e);
    }
  }, [pathname, shouldTrackInteractions, shouldTrackRouteChanges]);
  
  // This component doesn't render anything
  return null;
}
