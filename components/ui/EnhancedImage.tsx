'use client';

import { useEffect, useState, useRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface EnhancedImageProps extends Omit<ImageProps, 'onLoad' | 'onLoadingComplete'> {
  // Loading options
  preloadPriority?: 'high' | 'low' | 'auto';
  loadingStrategy?: 'lazy' | 'eager' | 'progressive';
  
  // Placeholder options
  placeholderType?: 'blur' | 'color' | 'none' | 'shimmer';
  placeholderColor?: string;
  lowQualitySrc?: string;
  
  // Visual options
  fadeInDuration?: number;
  aspectRatio?: number;
  backgroundEffect?: 'none' | 'pulse' | 'shimmer';
  backgroundColor?: string;
  
  // Layout options
  containerClassName?: string;
  
  // Performance options
  disableAnimation?: boolean;
  skipOptimizationForSmallImages?: boolean;
  rootMargin?: string;
  
  // Mobile options
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  breakpoint?: number;
  mobileSrcSet?: Array<{
    src: string;
    breakpoint: number;
  }>;
  
  // Error handling
  fallbackSrc?: string;
  errorComponent?: React.ReactNode;
  
  // Performance monitoring
  trackLoadPerformance?: boolean;
  imageId?: string;
  
  // Callbacks
  onLoadSuccess?: (performanceData?: any) => void;
  onLoadError?: (error?: any) => void;
}

/**
 * EnhancedImage - Advanced image component for optimized Core Web Vitals
 * 
 * Features:
 * - LCP optimization with priority loading and preloading
 * - CLS prevention using aspect ratio preservation
 * - Progressive loading strategies based on viewport visibility
 * - Mobile-specific image sources and optimizations
 * - Multiple placeholder techniques (blur, color, shimmer)
 * - Performance tracking and error handling
 * - Accessible fallback content
 */
export default function EnhancedImage({
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
  
  // Loading options
  preloadPriority = 'auto',
  loadingStrategy = 'progressive',
  
  // Placeholder options
  placeholderType = 'blur',
  placeholderColor = '#f3f4f6',
  lowQualitySrc,
  
  // Visual options
  fadeInDuration = 500,
  aspectRatio,
  backgroundEffect = 'none',
  backgroundColor = '#f1f5f9',
  
  // Layout options
  containerClassName = '',
  
  // Performance options
  disableAnimation = false,
  skipOptimizationForSmallImages = true,
  rootMargin = '200px',
  
  // Mobile options
  mobileSrc,
  mobileWidth,
  mobileHeight,
  breakpoint = 768,
  mobileSrcSet = [],
  
  // Error handling
  fallbackSrc,
  errorComponent,
  
  // Performance monitoring
  trackLoadPerformance = false,
  imageId,
  
  // Callbacks
  onLoadSuccess,
  onLoadError,
  
  // Remaining props
  ...rest
}: EnhancedImageProps) {
  // State for tracking loading status
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  
  // Refs for tracking elements and performance
  const imageRef = useRef<HTMLImageElement>(null);
  const loadStartTime = useRef<number>(0);
  
  // Check if on mobile device
  const isMobile = useMediaQuery(`(max-width: ${breakpoint}px)`);
  
  // Calculate effective priority based on combined factors
  const effectivePriority = priority || preloadPriority === 'high';

  // Determine loading mode
  const effectiveLoading = 
    effectivePriority ? 'eager' :
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
    rootMargin,
    skip: effectivePriority || isSmallImage
  });

  // Choose appropriate source based on mobile devices or srcSet
  useEffect(() => {
    if (mobileSrcSet.length > 0) {
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
    } else if (isMobile && mobileSrc) {
      setActiveSrc(mobileSrc);
    } else {
      setActiveSrc(src);
    }
  }, [mobileSrcSet, mobileSrc, src, isMobile]);

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
        imageId: imageId || (typeof src === 'string' ? src : 'unknown-image'),
        timestamp: new Date().toISOString(),
        isLCP: false,
      };
      
      // For performance monitoring, check if this is potentially the LCP
      if (priority && imageRef.current) {
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
  
  // Determine proper sizes for mobile
  const effectiveWidth = isMobile && mobileWidth ? mobileWidth : width;
  const effectiveHeight = isMobile && mobileHeight ? mobileHeight : height;
  const effectiveSizes = isMobile ? '100vw' : sizes;
  const effectiveQuality = isMobile ? (quality ? Math.min(quality, 80) : 80) : quality;
  
  // Calculate container style including aspect ratio if needed
  const containerStyle = {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    backgroundColor: backgroundColor || placeholderColor,
    ...(calculatedAspectRatio ? { paddingBottom: `${calculatedAspectRatio * 100}%` } : {}),
    ...(style || {})
  };
  
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
  
  // If we have an error and custom error component, show that
  if (hasError && errorComponent) {
    return (
      <div 
        className={`enhanced-image-container error ${containerClassName} ${className}`}
        style={containerStyle}
        aria-label={`Image failed to load: ${alt}`}
        role="img"
      >
        {errorComponent}
      </div>
    );
  }
  
  // If we have an error but no custom error component
  if (hasError) {
    return (
      <div 
        className={`enhanced-image-container error ${containerClassName} ${className}`}
        style={containerStyle}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500">
          <span>{alt || 'Image failed to load'}</span>
        </div>
      </div>
    );
  }
  
  // Create shimmer placeholder JSX if needed
  const shimmerPlaceholder = placeholderType === 'shimmer' && !isLoaded && shouldShowImage ? (
    <div className="absolute inset-0 bg-gray-200 animate-shimmer overflow-hidden">
      <div className="h-full w-1/3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shimmer-effect" />
    </div>
  ) : null;
  
  return (
    <div 
      ref={ref}
      className={`enhanced-image-container ${containerClassName} ${animationClass}`}
      style={containerStyle}
      data-loaded={isLoaded}
      data-error={hasError}
      role="img"
      aria-label={hasError ? `Failed to load image: ${alt}` : undefined}
    >
      {shimmerPlaceholder}
      
      {/* Low quality placeholder */}
      {lowQualitySrc && !isLoaded && shouldShowImage && (
        <Image
          src={lowQualitySrc}
          alt=""
          fill
          sizes={effectiveSizes}
          className={`object-cover ${className}`}
          quality={10}
          aria-hidden="true"
          style={{ filter: 'blur(10px)' }}
        />
      )}
      
      {/* Only render image if it should be visible */}
      {shouldShowImage && (
        <Image
          ref={imageRef}
          src={activeSrc}
          alt={alt}
          fill={calculatedAspectRatio !== undefined}
          width={calculatedAspectRatio === undefined ? effectiveWidth : undefined}
          height={calculatedAspectRatio === undefined ? effectiveHeight : undefined}
          sizes={effectiveSizes}
          quality={effectiveQuality}
          loading={effectiveLoading}
          placeholder={effectivePlaceholder}
          blurDataURL={blurDataURL}
          priority={effectivePriority}
          onLoad={handleLoadSuccess}
          onError={handleError}
          style={{...imageStyle}}
          className={`enhanced-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
          {...rest}
        />
      )}
    </div>
  );
}