'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

// Define enhanced types for the OptimizedImage component
type ImagePriorityType = 'critical' | 'important' | 'normal' | 'low';
type LoadingStrategyType = 'lazy' | 'eager' | 'progressive';
type PlaceholderType = 'blur' | 'color' | 'shimmer' | 'skeleton' | 'lqip' | 'none';
type PreloadStrategyType = 'eager' | 'viewport' | 'none';

// Define art direction source type
interface ArtDirectionSource {
  src: string;
  media: string;
  width?: number;
  height?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'default';
  quality?: number;
}

// Define placeholder customization options
interface PlaceholderCustomization {
  shimmerColors?: {
    background?: string;
    foreground?: string;
  };
  skeletonType?: 'rectangle' | 'circle' | 'text' | 'avatar';
  lqipBlurAmount?: number;
  fadeInDuration?: number;
}

// Define performance tracking options
interface PerformanceTrackingOptions {
  trackLCP?: boolean;
  trackINP?: boolean;
  reportToAnalytics?: boolean;
  sampleRate?: number;
  debugMode?: boolean;
}

// Define retry strategy options
interface RetryStrategy {
  enabled?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number, error: any) => void;
}

// Define connection quality mapping
type ConnectionQualityMapping = {
  [key in 'slow2g' | '2g' | '3g' | '4g' | 'unknown']: number;
};

// Define comprehensive props for the OptimizedImage component
interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onLoadingComplete'> {
  // Core display options
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  
  // Loading strategy options
  loadingStrategy?: LoadingStrategyType;
  placeholderType?: PlaceholderType;
  placeholderColor?: string;
  placeholderCustomization?: PlaceholderCustomization;
  fadeInDuration?: number;
  rootMargin?: string;
  
  // Mobile-specific options
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  mobileBreakpoint?: number;
  
  // Art direction options
  artDirectionSources?: ArtDirectionSource[];
  
  // Connection-aware options
  connectionAwareQuality?: boolean;
  qualityByConnection?: ConnectionQualityMapping;
  
  // Preloading strategy
  preloadStrategy?: PreloadStrategyType;
  fetchPriority?: 'high' | 'low' | 'auto';
  
  // Srcset generation helper
  generateSrcSet?: boolean;
  srcSetSizes?: string;
  
  // Error handling
  fallbackSrc?: string | string[];
  retryStrategy?: RetryStrategy;
  
  // Extra features
  containerClassName?: string;
  imagePriority?: ImagePriorityType;
  trackLoadPerformance?: boolean;
  performanceOptions?: PerformanceTrackingOptions;
  onLoadSuccess?: (performanceData?: any) => void;
  onLoadError?: (error?: any) => void;
}

// Default connection quality mapping
const DEFAULT_QUALITY_MAPPING: ConnectionQualityMapping = {
  'slow2g': 30,
  '2g': 50,
  '3g': 70,
  '4g': 80,
  'unknown': 75
};

// Helper function to determine proper sizes attribute
function getDefaultSizes(width?: number, height?: number): string {
  if (!width) return '100vw';
  
  // Create responsive sizes attribute based on image dimensions
  if (width <= 640) return '100vw';
  if (width <= 768) return '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 768px';
  if (width <= 1024) return '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 1024px';
  if (width <= 1280) return '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, 1280px';
  
  return '(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, (max-width: 1536px) 40vw, 33vw';
}

// Helper to detect connection type
function getConnectionType(): 'slow2g' | '2g' | '3g' | '4g' | 'unknown' {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'unknown';
  }
  
  const conn = navigator.connection as any;
  if (!conn || !conn.effectiveType) {
    return 'unknown';
  }
  
  return conn.effectiveType as 'slow2g' | '2g' | '3g' | '4g';
}

// Helper to get quality based on connection
function getQualityForConnection(
  connectionType: 'slow2g' | '2g' | '3g' | '4g' | 'unknown',
  qualityMapping: ConnectionQualityMapping = DEFAULT_QUALITY_MAPPING
): number {
  return qualityMapping[connectionType] || DEFAULT_QUALITY_MAPPING.unknown;
}

/**
 * OptimizedImage - Enhanced unified image component with optimal performance and UX
 * 
 * Features:
 * - Progressive loading with multiple placeholder options
 * - Prevents Cumulative Layout Shift (CLS) with aspect ratio preservation
 * - Adaptive responsive handling with automatic sizes
 * - Mobile-specific image sources and art direction
 * - Connection-aware quality optimization
 * - Advanced performance tracking capabilities
 * - Robust error handling with retry mechanism
 * - Support for modern browser features (fetchpriority, etc.)
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality = 85,
  priority = false,
  placeholder,
  blurDataURL,
  style,
  className = '',
  
  // Component-specific props
  aspectRatio,
  objectFit = 'cover',
  loadingStrategy = 'progressive',
  placeholderType = 'shimmer',
  placeholderColor = '#f3f4f6',
  placeholderCustomization,
  fadeInDuration = 500,
  rootMargin = '200px',
  mobileSrc,
  mobileWidth,
  mobileHeight,
  mobileBreakpoint = 768,
  artDirectionSources = [],
  connectionAwareQuality = false,
  qualityByConnection,
  preloadStrategy = 'none',
  fetchPriority = 'auto',
  generateSrcSet = false,
  srcSetSizes,
  containerClassName = '',
  imagePriority = 'normal',
  fallbackSrc,
  retryStrategy = { enabled: false, maxRetries: 2, retryDelay: 1000 },
  trackLoadPerformance = false,
  performanceOptions = {
    trackLCP: true,
    trackINP: true,
    reportToAnalytics: true,
    sampleRate: 0.1,
    debugMode: false
  },
  onLoadSuccess,
  onLoadError,
  
  // Rest of the props
  ...rest
}: OptimizedImageProps) {
  // State for tracking loading status
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const [isMobile, setIsMobile] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [activeQuality, setActiveQuality] = useState<number | undefined>(quality);
  const [hasPreloaded, setHasPreloaded] = useState(false);
  
  // Refs for tracking
  const imageRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);
  const interactionStartTime = useRef<number | null>(null);
  const fallbackSources = useRef<string[]>(
    Array.isArray(fallbackSrc) ? fallbackSrc : fallbackSrc ? [fallbackSrc] : []
  );

  // Calculate effective priority based on combined factors
  const effectivePriority = 
    priority || 
    imagePriority === 'critical' || 
    loadingStrategy === 'eager' ||
    preloadStrategy === 'eager';

  // Determine loading mode based on strategy
  const effectiveLoading = 
    effectivePriority ? 'eager' :
    loadingStrategy === 'lazy' ? 'lazy' :
    undefined;
    
  // Calculate effective fetch priority
  const effectiveFetchPriority = fetchPriority === 'auto' 
    ? (imagePriority === 'critical' || priority) ? 'high' : 'auto'
    : fetchPriority;

  // Use react-intersection-observer for better visibility detection
  const { ref, inView: isInView } = useInView({
    rootMargin,
    triggerOnce: true,
    initialInView: effectivePriority,
    threshold: 0.1,
  });
  
  // Determine if image should be visible based on view state
  const inView = isInView || effectivePriority;
  
  // Determine proper sizes attribute if not provided
  const effectiveSizes = sizes || (srcSetSizes ? srcSetSizes : getDefaultSizes(
    typeof width === 'number' ? width : undefined,
    typeof height === 'number' ? height : undefined
  ));
  
  // Calculate aspect ratio for preventing layout shift
  const calculatedAspectRatio = aspectRatio || 
    (typeof height === 'number' && typeof width === 'number' 
      ? height / width 
      : undefined);
  
  // Connection-aware quality adjustment
  useEffect(() => {
    if (connectionAwareQuality && typeof window !== 'undefined') {
      const connectionType = getConnectionType();
      const connectionQuality = getQualityForConnection(
        connectionType, 
        qualityByConnection
      );
      
      // Use the lower of the two: explicitly set quality or connection-based quality
      if (typeof quality === 'number') {
        setActiveQuality(Math.min(quality, connectionQuality));
      } else {
        setActiveQuality(connectionQuality);
      }
      
      // Log in development mode
      if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
        console.log(`Connection: ${connectionType}, Quality: ${connectionQuality}`);
      }
    } else {
      setActiveQuality(quality);
    }
  }, [connectionAwareQuality, quality, qualityByConnection, performanceOptions?.debugMode]);
  
  // Preload critical images 
  useEffect(() => {
    if (preloadStrategy === 'eager' && !hasPreloaded && typeof window !== 'undefined') {
      // Use the global window.Image constructor, not the imported Next.js Image component
      const imgPreload = new window.Image();
      
      // Use the currently active source
      imgPreload.src = activeSrc.toString();
      
      // Mark as preloaded to avoid duplicate preloads
      setHasPreloaded(true);
      
      // Log preloading in development mode
      if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
        console.log(`Preloading image: ${activeSrc}`);
      }
    }
  }, [activeSrc, preloadStrategy, hasPreloaded, performanceOptions?.debugMode]);
  
  // Track image load performance
  useEffect(() => {
    if (trackLoadPerformance && !isLoaded && !hasError) {
      loadStartTime.current = performance.now();
    }
  }, [trackLoadPerformance, isLoaded, hasError]);
  
  // Set up interaction tracking for INP
  useEffect(() => {
    if (!trackLoadPerformance || !performanceOptions?.trackINP) return;
    
    const handleInteractionStart = () => {
      if (interactionStartTime.current === null && !isLoaded) {
        interactionStartTime.current = performance.now();
      }
    };
    
    // Track user interactions with the image container
    const container = ref.current;
    if (container) {
      container.addEventListener('pointerdown', handleInteractionStart);
      container.addEventListener('keydown', handleInteractionStart);
      container.addEventListener('click', handleInteractionStart);
      
      return () => {
        container.removeEventListener('pointerdown', handleInteractionStart);
        container.removeEventListener('keydown', handleInteractionStart);
        container.removeEventListener('click', handleInteractionStart);
      };
    }
  }, [trackLoadPerformance, performanceOptions?.trackINP, isLoaded, ref]);
  
  // Handle mobile-specific image source and art direction
  useEffect(() => {
    const updateImageSource = () => {
      const windowWidth = window.innerWidth;
      const checkIsMobile = windowWidth <= (mobileBreakpoint || 768);
      setIsMobile(checkIsMobile);
      
      // Check if we have art direction sources
      if (artDirectionSources && artDirectionSources.length > 0) {
        // Find the first matching art direction source
        for (const source of artDirectionSources) {
          const mediaQuery = window.matchMedia(source.media);
          if (mediaQuery.matches) {
            setActiveSrc(source.src);
            return;
          }
        }
      }
      
      // Fall back to mobile source if available and we're on mobile
      if (mobileSrc && checkIsMobile) {
        setActiveSrc(mobileSrc);
        return;
      }
      
      // Default to original source
      setActiveSrc(src);
    };
    
    // Initial check
    updateImageSource();
    
    // Listen for resize events with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateImageSource, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [artDirectionSources, mobileSrc, mobileBreakpoint, src]);
  
  // Handle retry logic for failed images
  const retryLoad = useCallback(() => {
    if (!retryStrategy.enabled || retryCount >= (retryStrategy.maxRetries || 2)) {
      // We've exhausted retries, try fallback sources
      if (fallbackSources.current.length > 0) {
        const nextFallback = fallbackSources.current.shift();
        if (nextFallback) {
          setActiveSrc(nextFallback);
          setRetryCount(0); // Reset retry count for the new source
          return true;
        }
      }
      return false;
    }
    
    // Increment retry count
    const nextRetryCount = retryCount + 1;
    setRetryCount(nextRetryCount);
    
    // Log retry attempt
    if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
      console.log(`Retrying image load (${nextRetryCount}/${retryStrategy.maxRetries}): ${activeSrc}`);
    }
    
    // Call onRetry callback if provided
    if (retryStrategy.onRetry) {
      retryStrategy.onRetry(nextRetryCount, new Error(`Image load failed for ${activeSrc}`));
    }
    
    // Force a reload by temporarily clearing the src and setting it again
    // We'll use a small delay to prevent immediate retry
    setTimeout(() => {
      // This forces a re-render with the same source to trigger a reload
      setActiveSrc('');
      setTimeout(() => setActiveSrc(src), 50);
    }, retryStrategy.retryDelay || 1000);
    
    return true;
  }, [
    retryStrategy, 
    retryCount, 
    src, 
    activeSrc, 
    performanceOptions?.debugMode
  ]);
  
  // Enhanced load success handler with improved web vitals tracking
  const handleLoadSuccess = () => {
    setIsLoaded(true);
    setHasError(false);
    setRetryCount(0);
    
    if (trackLoadPerformance) {
      const loadTime = performance.now() - loadStartTime.current;
      
      // Calculate INP if we had an interaction
      let interactionTime: number | null = null;
      if (interactionStartTime.current !== null) {
        interactionTime = performance.now() - interactionStartTime.current;
      }
      
      const performanceData = {
        loadTime,
        interactionTime,
        src: activeSrc,
        timestamp: new Date().toISOString(),
        isLCP: false,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        connection: navigator.connection ? {
          effectiveType: (navigator.connection as any).effectiveType,
          rtt: (navigator.connection as any).rtt,
          downlink: (navigator.connection as any).downlink,
        } : undefined,
      };
      
      // Advanced LCP detection
      if ((performanceOptions?.trackLCP !== false) && 
          (imagePriority === 'critical' || priority) && 
          imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        const viewportArea = window.innerWidth * window.innerHeight;
        const imageArea = imageRect.width * imageRect.height;
        const imageVisibleRatio = Math.min(1, 
          (Math.min(imageRect.bottom, window.innerHeight) - Math.max(imageRect.top, 0)) *
          (Math.min(imageRect.right, window.innerWidth) - Math.max(imageRect.left, 0)) / 
          (imageRect.width * imageRect.height)
        );
        
        // Consider as LCP if the image:
        // 1. Is in the first viewport
        // 2. Is large (>10% of viewport or >100,000px²)
        // 3. Has >50% of its area visible
        if (
          imageRect.top < window.innerHeight &&
          imageRect.left < window.innerWidth &&
          (imageArea > viewportArea * 0.1 || imageArea > 100000) &&
          imageVisibleRatio > 0.5
        ) {
          performanceData.isLCP = true;
          
          // Mark the LCP completion for performance measurement
          if (typeof performance !== 'undefined' && performance.mark && performance.measure) {
            performance.mark(`lcp-end:${activeSrc}`);
            try {
              performance.measure(
                `lcp-duration:${activeSrc}`,
                `lcp-start:${activeSrc}`,
                `lcp-end:${activeSrc}`
              );
            } catch (e) {
              // The mark might not exist if we didn't set it
              performance.mark(`lcp-start:${activeSrc}`);
              performance.measure(
                `lcp-duration:${activeSrc}`,
                `lcp-start:${activeSrc}`,
                `lcp-end:${activeSrc}`
              );
            }
          }
          
          // Send to analytics if configured
          if (typeof window !== 'undefined' && 
              performanceOptions?.reportToAnalytics !== false && 
              (window as any).gtag && 
              // Only sample a percentage of users
              Math.random() < (performanceOptions?.sampleRate || 0.1)) {
            try {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(loadTime),
                non_interaction: true,
                page_path: window.location.pathname,
                image_src: activeSrc.toString().substring(0, 100),
              });
            } catch (e) {
              // Silently handle analytics errors
            }
          }
        }
      }
      
      // Report INP-relevant metrics if we detected user interaction
      if (performanceOptions?.trackINP !== false && 
          interactionTime !== null && 
          performanceOptions?.reportToAnalytics !== false && 
          typeof window !== 'undefined' && 
          (window as any).gtag && 
          // Only sample a percentage of users
          Math.random() < (performanceOptions?.sampleRate || 0.1)) {
        try {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'INP',
            value: Math.round(interactionTime),
            non_interaction: false,
            page_path: window.location.pathname,
            element_type: 'image',
            image_src: activeSrc.toString().substring(0, 100),
          });
        } catch (e) {
          // Silently handle analytics errors
        }
      }
      
      // Report performance if callback provided
      if (onLoadSuccess) {
        onLoadSuccess(performanceData);
      }
      
      // Log to console in development mode
      if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
        console.log(
          `Image loaded: ${activeSrc} in ${loadTime.toFixed(0)}ms` + 
          `${performanceData.isLCP ? ' (LCP candidate)' : ''}` +
          `${interactionTime !== null ? `, INP: ${interactionTime.toFixed(0)}ms` : ''}`
        );
      }
    } else if (onLoadSuccess) {
      onLoadSuccess();
    }
  };
  
  // Handle image load error
  const handleError = (error: any) => {
    if (activeSrc === '') return; // Skip empty source during retry
    
    // Try retry mechanism first
    if (retryStrategy.enabled && retryLoad()) {
      return;
    }
    
    // If retries failed or aren't enabled, mark as error
    setHasError(true);
    
    if (onLoadError) {
      onLoadError(error);
    }
    
    // Log error in development
    if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
      console.error(`Image load failed after ${retryCount} retries:`, activeSrc, error);
    }
  };
  
  // Determine effective placeholder strategy
  const effectivePlaceholder = placeholder || 
    (placeholderType === 'blur' && blurDataURL ? 'blur' : 'empty');
  
  // Get shimmer colors from customization or defaults
  const shimmerBgColor = placeholderCustomization?.shimmerColors?.background || '#f3f4f6'; 
  const shimmerFgColor = placeholderCustomization?.shimmerColors?.foreground || '#e5e7eb';
  
  // Custom fade duration
  const customFadeDuration = placeholderCustomization?.fadeInDuration || fadeInDuration;
  
  // Generate container style including aspect ratio if needed
  const containerStyle = {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    backgroundColor: placeholderColor,
    ...(calculatedAspectRatio ? { paddingBottom: `${calculatedAspectRatio * 100}%`, width: '100%' } : {}),
    ...(style || {})
  };
  
  // Generate fade-in style
  const fadeStyle = customFadeDuration ? {
    opacity: isLoaded ? 1 : 0,
    transition: `opacity ${customFadeDuration}ms ease-in-out`
  } : {};
  
  // Combine all styles for the image
  const imageStyle = {
    ...fadeStyle,
    objectFit: objectFit as any,
    ...(calculatedAspectRatio ? { position: 'absolute' as const, top: 0, left: 0, width: '100%', height: '100%' } : {}),
  };
  
  // Decide if we should show the image based on loading strategy
  const shouldShowImage = 
    effectivePriority || 
    loadingStrategy === 'eager' || 
    inView;
  
  // Create enhanced shimmer placeholder with ARIA attributes for accessibility
  const renderPlaceholder = () => {
    if (isLoaded || !shouldShowImage) return null;
    
    switch (placeholderType) {
      case 'shimmer':
        return (
          <div 
            className="absolute inset-0 overflow-hidden"
            aria-hidden="true"
            role="presentation"
            style={{ backgroundColor: shimmerBgColor }}
          >
            <div className="h-full w-1/3 shimmer-effect" style={{
              background: `linear-gradient(90deg, ${shimmerBgColor} 0%, ${shimmerFgColor} 50%, ${shimmerBgColor} 100%)`,
              animation: 'shimmer 1.5s infinite',
              transform: 'translateX(-100%)',
            }} />
          </div>
        );
        
      case 'skeleton':
        const skeletonType = placeholderCustomization?.skeletonType || 'rectangle';
        
        // Skeleton styles based on type
        let skeletonStyles = {};
        if (skeletonType === 'circle') {
          skeletonStyles = { borderRadius: '50%' };
        } else if (skeletonType === 'avatar') {
          skeletonStyles = { borderRadius: '50%', border: '2px solid #e5e7eb' };
        }
        
        return (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse"
            aria-hidden="true"
            role="presentation"
            style={skeletonStyles}
          />
        );
        
      case 'lqip':
        const lqipBlurAmount = placeholderCustomization?.lqipBlurAmount || 10;
        
        // Only show LQIP if we have blurDataURL
        if (!blurDataURL) return null;
        
        return (
          <div 
            className="absolute inset-0 overflow-hidden"
            aria-hidden="true"
            role="presentation"
            style={{
              backgroundImage: `url(${blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `blur(${lqipBlurAmount}px)`,
              transform: 'scale(1.1)', // To hide blur edges
            }}
          />
        );
        
      default:
        return null;
    }
  };
  
  // Advanced performance tracking for Web Vitals
  useEffect(() => {
    if (trackLoadPerformance && (imagePriority === 'critical' || priority)) {
      try {
        // Report LCP candidate to web-vitals if available
        const reportWebVitals = (window as any).__NEXT_WEB_VITALS;
        if (reportWebVitals && typeof reportWebVitals === 'function') {
          reportWebVitals({
            name: 'LCP-candidate',
            value: activeSrc,
            id: `img-${activeSrc.toString().substring(0, 20)}`,
          });
        }
        
        // Mark the start time for LCP measurement
        if (typeof performance !== 'undefined' && performance.mark) {
          performance.mark(`lcp-start:${activeSrc}`);
        }
        
        // Register with PerformanceObserver for LCP if available
        if (typeof PerformanceObserver !== 'undefined' && 
            performanceOptions?.trackLCP !== false &&
            performanceOptions?.reportToAnalytics !== false) {
          try {
            const lcpObserver = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              if (entries.length > 0) {
                const lcpEntry = entries[entries.length - 1];
                const lcpElement = (lcpEntry as any).element;
                
                // Check if this image is the LCP element
                if (lcpElement && imageRef.current && lcpElement === imageRef.current) {
                  // Report LCP to analytics
                  if ((window as any).gtag && Math.random() < (performanceOptions?.sampleRate || 0.1)) {
                    try {
                      (window as any).gtag('event', 'web_vitals', {
                        event_category: 'Web Vitals',
                        event_label: 'LCP',
                        value: Math.round(lcpEntry.startTime),
                        non_interaction: true,
                        page_path: window.location.pathname,
                        lcp_element: 'image',
                        image_src: activeSrc.toString().substring(0, 100),
                      });
                    } catch (e) {
                      // Silently handle analytics errors
                    }
                  }
                  
                  if (process.env.NODE_ENV === 'development' && performanceOptions?.debugMode) {
                    console.log(`Confirmed LCP: ${activeSrc} - ${lcpEntry.startTime.toFixed(0)}ms`);
                  }
                }
              }
            });
            
            // Start observing LCP
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            
            // Clean up
            return () => {
              lcpObserver.disconnect();
            };
          } catch (e) {
            // PerformanceObserver might not be supported or may fail
          }
        }
      } catch (e) {
        // Silently handle errors in performance reporting
      }
    }
  }, [
    activeSrc, 
    trackLoadPerformance, 
    imagePriority, 
    priority, 
    performanceOptions?.trackLCP, 
    performanceOptions?.reportToAnalytics,
    performanceOptions?.sampleRate,
    performanceOptions?.debugMode
  ]);
  
  // Handle error state - show a placeholder with the alt text
  if (hasError) {
    return (
      <div 
        className={`optimized-image-container error ${containerClassName}`}
        style={containerStyle}
        aria-label={`Image failed to load: ${alt}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500 bg-gray-100 border border-gray-200 rounded">
          <div className="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{alt || 'Image failed to load'}</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate effective dimensions based on mobile status
  const effectiveWidth = isMobile && mobileWidth ? mobileWidth : width;
  const effectiveHeight = isMobile && mobileHeight ? mobileHeight : height;
  
  // Create preload link for critical images
  const preloadLinkElement = (
    preloadStrategy === 'eager' && !hasPreloaded && typeof window !== 'undefined'
  ) ? (
    <link 
      rel="preload" 
      as="image" 
      href={activeSrc.toString()} 
      /* @ts-ignore */
      fetchpriority={effectiveFetchPriority === 'high' ? 'high' : undefined}
    />
  ) : null;
  
  return (
    <>
      {preloadLinkElement}
      
      <div 
        ref={ref}
        className={`optimized-image-container ${containerClassName}`}
        style={containerStyle}
        data-loaded={isLoaded}
        data-priority={imagePriority}
      >
        {renderPlaceholder()}
        
        {/* Only render image if it should be visible based on loading strategy */}
        {shouldShowImage && activeSrc && (
          <NextImage
            ref={imageRef}
            src={activeSrc}
            alt={alt}
            width={effectiveWidth}
            height={effectiveHeight}
            sizes={effectiveSizes}
            quality={activeQuality}
            loading={effectiveLoading}
            placeholder={effectivePlaceholder}
            blurDataURL={blurDataURL}
            priority={effectivePriority}
            onLoad={handleLoadSuccess}
            onError={handleError}
            style={imageStyle}
            className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
            /* @ts-ignore - Add fetchpriority attribute for modern browsers */
            fetchpriority={effectiveFetchPriority === 'high' ? 'high' : undefined}
            {...rest}
          />
        )}
      </div>
    </>
  );
}
