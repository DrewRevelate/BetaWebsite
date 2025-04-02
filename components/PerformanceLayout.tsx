'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { collectWebVitals } from '@/lib/web-vitals';

// Lazily load non-critical components
const MobileOptimizer = dynamic(() => import('@/components/MobileOptimizer'), { ssr: true });

interface PerformanceLayoutProps {
  children: ReactNode;
  enableWebVitals?: boolean;
  enableMobileOptimization?: boolean;
  primeCache?: boolean;
  preloadFonts?: boolean;
  optimizeImages?: boolean;
  enablePreconnect?: boolean;
  criticalPages?: string[];
  pageName?: string;
}

/**
 * PerformanceLayout component
 * 
 * A high-performance layout component that implements:
 * - Web Vitals monitoring
 * - Mobile optimization
 * - Resource hinting and preloading
 * - Strategic code splitting
 * - Cache priming
 */
export default function PerformanceLayout({
  children,
  enableWebVitals = true,
  enableMobileOptimization = true,
  primeCache = true,
  preloadFonts = true, 
  optimizeImages = true,
  enablePreconnect = true,
  criticalPages = ['/'],
  pageName = '',
}: PerformanceLayoutProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [interactionStarted, setInteractionStarted] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Handle component mount state to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Web Vitals collection
  useEffect(() => {
    if (!isMounted || !enableWebVitals) return;

    // Collect web vitals with custom options
    collectWebVitals({
      debug: process.env.NODE_ENV === 'development',
      reportTo: process.env.NODE_ENV === 'production' ? 'analytics' : 'console',
      sampleRate: 0.1, // Collect from 10% of users
      includePath: true,
    });
  }, [enableWebVitals, isMounted]);

  // Prime browser cache with critical resources
  useEffect(() => {
    if (!isMounted || !primeCache) return;

    // Implement via requestIdleCallback for better performance
    const primeResourceCache = () => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          // Preload critical pages
          criticalPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
        }, { timeout: 2000 });
      }
    };

    // Only prime cache after user has started interacting
    if (interactionStarted) {
      primeResourceCache();
    }
  }, [primeCache, criticalPages, interactionStarted, isMounted]);

  // Handle user interaction state
  useEffect(() => {
    if (!isMounted) return;

    const handleInteraction = () => {
      setInteractionStarted(true);
    };

    // Listen for first interaction
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isMounted]);

  // Detect scroll for lazy loading
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, isMounted]);

  // Preload critical fonts
  useEffect(() => {
    if (!isMounted || !preloadFonts) return;

    // Use requestIdleCallback if available
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Preload critical fonts
        const fontUrls = [
          '/fonts/inter-400.woff2',
          '/fonts/inter-700.woff2',
        ];

        fontUrls.forEach(fontUrl => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = fontUrl;
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      }, { timeout: 1000 });
    }
  }, [preloadFonts, isMounted]);

  // Add preconnect for critical domains
  useEffect(() => {
    if (!isMounted || !enablePreconnect) return;

    // Add preconnect links for third-party domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com',
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, [enablePreconnect, isMounted]);

  // Check if current page is in critical pages list
  const isCurrentPageCritical = () => {
    if (!isMounted) return false;
    const currentPath = pageName || pathname || '';
    return criticalPages.includes(currentPath);
  };

  return (
    <>
      {/* HTML structure optimized for Core Web Vitals */}
      <div id="performance-root" data-page={pageName} className="performance-layout">
        {enableMobileOptimization ? (
          <MobileOptimizer 
            optimizeImages={optimizeImages}
            enableLazyComponents={!isCurrentPageCritical()}
          >
            {children}
          </MobileOptimizer>
        ) : (
          children
        )}
      </div>
    </>
  );
}
