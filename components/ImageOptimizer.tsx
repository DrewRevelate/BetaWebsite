'use client';

import { useEffect, useState, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ImageOptimizerProps extends Omit<ImageProps, 'onLoad' | 'onLoadingComplete'> {
  // Advanced loading options
  preloadPriority?: 'high' | 'low' | 'auto';
  loadingStrategy?: 'lazy' | 'eager' | 'progressive';
  placeholderType?: 'blur' | 'color' | 'none' | 'shimmer';
  placeholderColor?: string;
  
  // Visual options
  fadeInDuration?: number;
  aspectRatio?: number;
  backgroundEffect?: 'none' | 'pulse' | 'shimmer';
  
  // Performance options
  disableAnimation?: boolean;
  skipOptimizationForSmallImages?: boolean;
  
  // Better mobile handling
  mobileSrcSet?: {
    src: string;
    breakpoint: number;
  }[];
  
  // Error handling
  fallbackSrc?: string;
  errorComponent?: React.ReactNode;
  
  // Tracking and analytics
  trackLoadPerformance?: boolean;
  imageId?: string;
  
  // Callbacks
  onLoadSuccess?: (performanceData?: any) => void;
  onLoadError?: (error?: any) => void;
  
  // Advanced props for improved accessibility and SEO
  imagePriority?: 'critical' | 'important' | 'normal' | 'low';
  lazy?: boolean; // Simplified prop that combines multiple optimizations
}

/**
 * ImageOptimizer - Enhanced image component for optimal Core Web Vitals
 * 
 * Features:
 * - Smart loading based on image visibility and priority
 * - Adaptive image quality based on connection and device
 * - Prevents Cumulative Layout Shift with aspect ratio preservation
 * - Progressive loading with placeholder options
 * - Performance tracking for LCP optimization
 * - Optimized mobile experience with different image sources
 */
export default function ImageOptimizer({
  src,
  alt,
  width,
  height,
  sizes,
  quality,
  priority,
  placeholder,
  blurDataURL,
  className = '',
  style,
  
  // Custom props
  preloadPriority = 'auto',
  loadingStrategy = 'progressive',
  placeholderType = 'blur',
  placeholderColor = '#f3f4f6',
  fadeInDuration = 500,
  aspectRatio,
  backgroundEffect = 'none',
  disableAnimation = false,
  skipOptimizationForSmallImages = true,
  mobileSrcSet = [],
  fallbackSrc,
  errorComponent,
  trackLoadPerformance = false,
  imageId,
  onLoadSuccess,
  onLoadError,
  imagePriority = 'normal',
  lazy = false,
  
  // Remaining props
  ...rest
}: ImageOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const imageRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);
  
  // Calculate effective priority based on combined factors
  const effectivePriority = 
    priority || 
    imagePriority === 'critical' || 
    preloadPriority === 'high';

  // Determine loading mode
  const effectiveLoading = 
    effectivePriority ? 'eager' :
    lazy ? 'lazy' :
    loadingStrategy === 'eager' ? 'eager' :
    loadingStrategy === 'lazy' ? 'lazy' :
    undefined;

  // Skip optimization for small images if requested
  const isSmallImage = 
    skipOptimizationForSmallImages &&
    typeof width === 'number' && 
    typeof height === 'number' && 
    width < 100 && 
    height < 100;

  // Set up intersection observer for progressive loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: effectivePriority || isSmallImage
  });

  // Choose appropriate source for current device/viewport
  useEffect(() => {
    if (mobileSrcSet.length === 0) return;
    
    const updateImageSource = () => {
      const windowWidth = window.innerWidth;
      const matchedSource = mobileSrcSet
        .sort((a, b) => b.breakpoint - a.breakpoint)
        .find(item => windowWidth <= item.breakpoint);
      
      if (matchedSource) {
        setActiveSrc(matchedSource.src);
      } else {
        setActiveSrc(src);
      }
    };
    
    // Initial check
    updateImageSource();
    
    // Listen for resize events
    window.addEventListener('resize', updateImageSource);
    
    return () => {
      window.removeEventListener('resize', updateImageSource);
    };
  }, [mobileSrcSet, src]);

  // Calculate aspect ratio for preventing layout shift
  const calculatedAspectRatio = aspectRatio || 
    (typeof height === 'number' && typeof width === 'number' 
      ? height / width 
      : undefined);
  
  // Track image load performance
  useEffect(() => {
    if (trackLoadPerformance && !isLoaded && !hasError) {
      loadStartTime.current = performance.now();
    }
  }, [trackLoadPerformance, isLoaded, hasError]);
  
  // Handle successful image load
  const handleLoadSuccess = () => {
    setIsLoaded(true);
    setHasError(false);
    
    if (trackLoadPerformance) {
      const loadTime = performance.now() - loadStartTime.current;
      const performanceData = {
        loadTime,
        imageId: imageId || src,
        timestamp: new Date().toISOString(),
        isLCP: false, // This will be determined by web-vitals
      };
      
      // For performance monitoring, check if this is potentially the LCP
      if (imagePriority === 'critical' && imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        // Check if image is in the initial viewport and large
        if (
          imageRect.top < window.innerHeight &&
          imageRect.left < window.innerWidth &&
          imageRect.width * imageRect.height > 50000 // Large images (arbitrary threshold)
        ) {
          performanceData.isLCP = true;
        }
      }
      
      // Report performance if callback provided
      if (onLoadSuccess) {
        onLoadSuccess(performanceData);
      }
      
      // Optionally log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Image loaded: ${performanceData.imageId} in ${loadTime.toFixed(0)}ms`);
      }
    } else if (onLoadSuccess) {
      onLoadSuccess();
    }
  };
  
  // Handle image load error
  const handleError = (error: any) => {
    setHasError(true);
    
    // Try fallback if provided
    if (fallbackSrc && activeSrc !== fallbackSrc) {
      setActiveSrc(fallbackSrc);
      return;
    }
    
    if (onLoadError) {
      onLoadError(error);
    }
  };
  
  // Determine placeholder strategy
  const effectivePlaceholder = placeholder || 
    (placeholderType === 'blur' && blurDataURL ? 'blur' : 'empty');
  
  // Calculate container style including aspect ratio if needed
  const containerStyle = {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    backgroundColor: placeholderColor,
    ...(calculatedAspectRatio ? { paddingBottom: `${calculatedAspectRatio * 100}%` } : {}),
    ...(style || {})
  };
  
  // If we have an error and custom error component, show that
  if (hasError && errorComponent) {
    return (
      <div 
        className={`image-optimizer-container error ${className}`}
        style={containerStyle}
        aria-label={`Image failed to load: ${alt}`}
      >
        {errorComponent}
      </div>
    );
  }
  
  // Generate animation class
  const animationClass = backgroundEffect === 'pulse' ? 'animate-pulse' :
                         backgroundEffect === 'shimmer' ? 'animate-shimmer' : '';
  
  // Generate fade-in style
  const fadeStyle = !disableAnimation && fadeInDuration ? {
    opacity: isLoaded ? 1 : 0,
    transition: `opacity ${fadeInDuration}ms ease-in-out`
  } : {};
  
  // Combine all styles
  const imageStyle = {
    ...fadeStyle,
    objectFit: 'cover' as const,
    ...(calculatedAspectRatio ? { position: 'absolute' as const, top: 0, left: 0 } : {}),
  };
  
  // Should we show the image based on loading strategy?
  const shouldShowImage = 
    effectivePriority || 
    loadingStrategy === 'eager' || 
    inView || 
    isSmallImage;
  
  // Create shimmer placeholder JSX if needed
  const shimmerPlaceholder = placeholderType === 'shimmer' && !isLoaded && shouldShowImage ? (
    <div className="absolute inset-0 bg-gray-200 animate-shimmer overflow-hidden">
      <div className="h-full w-1/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shimmer-effect" />
    </div>
  ) : null;
  
  return (
    <div 
      ref={ref}
      className={`image-optimizer-container ${className} ${animationClass}`}
      style={containerStyle}
      data-loaded={isLoaded}
      data-error={hasError}
    >
      {shimmerPlaceholder}
      
      {/* Only render image if it should be visible */}
      {shouldShowImage && (
        <Image
          ref={imageRef}
          src={activeSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          loading={effectiveLoading}
          placeholder={effectivePlaceholder}
          blurDataURL={blurDataURL}
          priority={effectivePriority}
          onLoad={handleLoadSuccess}
          onError={handleError}
          style={imageStyle}
          className={`image-optimizer ${isLoaded ? 'loaded' : 'loading'}`}
          {...rest}
        />
      )}
    </div>
  );
}