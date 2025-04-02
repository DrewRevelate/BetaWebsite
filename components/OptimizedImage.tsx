'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
}

/**
 * OptimizedImage component that extends Next.js Image with:
 * - Blur-up placeholder effect
 * - Fade-in animation
 * - Intelligent loading priority based on viewport
 * - Error handling with fallback
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className,
  loading,
  quality = 85,
  placeholder,
  blurDataURL,
  fetchPriority,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Set default loading priority based on position in viewport
  useEffect(() => {
    if (typeof IntersectionObserver !== 'undefined' && !priority && !loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsLoaded(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' } // Start loading when image is 200px from viewport
      );

      const element = document.querySelector(`[data-image-id="${src}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
        observer.disconnect();
      };
    } else {
      setIsLoaded(true);
    }
  }, [src, priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Determine if we should show a placeholder
  const showPlaceholder = !isLoaded || hasError;

  if (hasError) {
    // Fallback for image errors
    return (
      <div 
        className={cn(
          "relative flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500",
          className
        )}
        style={{ width: width || '100%', height: height || '100%' }}
        data-image-id={src}
      >
        <span className="text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative", fill ? "w-full h-full" : "")}
      style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      data-image-id={src}
    >
      {/* Placeholder shown during loading */}
      {showPlaceholder && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded overflow-hidden",
            className
          )}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes || (fill ? '100vw' : undefined)}
        priority={priority}
        quality={quality}
        loading={loading || (priority ? 'eager' : 'lazy')}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        fetchPriority={fetchPriority || (priority ? 'high' : 'auto')}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Define types for the OptimizedImage component
interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  lowQualitySrc?: string;
  aspectRatio?: number;
  backgroundColor?: string;
  fadeInDuration?: number;
  loadingMode?: 'lazy' | 'eager' | 'progressive';
  rootMargin?: string;
  className?: string;
  containerClassName?: string;
  mobileSrc?: string; // Additional prop for mobile-specific image
  mobileWidth?: number; // Width for mobile devices
  mobileHeight?: number; // Height for mobile devices
  breakpoint?: number; // Breakpoint for mobile switching
}

/**
 * OptimizedImage component with advanced loading strategies:
 * - Progressive loading with low-quality placeholder
 * - Maintained aspect ratio to prevent layout shifts
 * - Background color or blur to prevent visual glitches
 * - Intelligent loading based on proximity and viewport
 * - Accessible error handling
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  quality,
  lowQualitySrc,
  aspectRatio,
  backgroundColor = '#f1f5f9', // Default light gray background
  fadeInDuration = 500,
  loadingMode = 'progressive',
  rootMargin = '200px',
  className = '',
  containerClassName = '',
  mobileSrc,
  mobileWidth,
  mobileHeight,
  breakpoint = 768,
  ...rest
}: OptimizedImageProps) {
  // State for tracking loading status
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Check if on mobile device
  const isMobile = useMediaQuery(`(max-width: ${breakpoint}px)`);
  
  // Ref for the image container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate aspect ratio
  const calculatedAspectRatio = aspectRatio || (typeof height === 'number' && typeof width === 'number' ? height / width : undefined);
  
  // Effective loading strategy:
  // - priority images are always eagerly loaded
  // - progressive images load on viewport proximity
  // - lazy images use browser's native lazy loading
  const effectiveLoading = priority ? 'eager' : loadingMode === 'progressive' ? undefined : 'lazy';
  
  // Set up intersection observer for progressive loading
  useEffect(() => {
    if (loadingMode !== 'progressive' || !containerRef.current) {
      setIsIntersecting(true); // Skip intersection logic for non-progressive loading
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01, // Start loading when just 1% of the image is visible
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [rootMargin, loadingMode]);
  
  // Handle image loading completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  // Handle image loading error
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);
  
  // Determine if we should show the image
  const shouldShowImage = isIntersecting || priority || loadingMode !== 'progressive';
  
  // Determine appropriate image source and dimensions based on device
  const effectiveSrc = isMobile && mobileSrc ? mobileSrc : src;
  const effectiveWidth = isMobile && mobileWidth ? mobileWidth : width;
  const effectiveHeight = isMobile && mobileHeight ? mobileHeight : height;
  
  // Fade-in animation styles
  const imageStyles = {
    opacity: isLoaded ? 1 : 0,
    transition: `opacity ${fadeInDuration}ms ease-in-out`,
  };
  
  // Calculate proper padding to maintain aspect ratio and prevent CLS
  const paddingStyle = calculatedAspectRatio 
    ? { paddingBottom: `${calculatedAspectRatio * 100}%` } 
    : {};
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={{
        backgroundColor,
        ...paddingStyle
      }}
      role="img"
      aria-label={hasError ? `Failed to load image: ${alt}` : undefined}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-gray-500">
          <span>{alt || 'Image failed to load'}</span>
        </div>
      ) : (
        <>
          {/* Low quality placeholder */}
          {lowQualitySrc && !isLoaded && shouldShowImage && (
            <Image
              src={lowQualitySrc}
              alt=""
              fill
              sizes={sizes}
              className={`object-cover ${className}`}
              quality={10}
              aria-hidden="true"
              style={{ filter: 'blur(10px)' }}
            />
          )}
          
          {/* Main image - only loaded when needed */}
          {shouldShowImage && (
            <Image
              src={effectiveSrc}
              alt={alt}
              fill={calculatedAspectRatio !== undefined}
              width={calculatedAspectRatio === undefined ? effectiveWidth : undefined}
              height={calculatedAspectRatio === undefined ? effectiveHeight : undefined}
              sizes={isMobile ? '100vw' : sizes} // Adjust sizes for mobile
              quality={isMobile ? (quality ? Math.min(quality, 80) : 80) : quality} // Lower quality for mobile
              priority={priority}
              loading={effectiveLoading}
              onLoad={handleLoadingComplete}
              onError={handleError}
              className={`object-cover ${className}`}
              style={imageStyles}
              {...rest}
            />
          )}
        </>
      )}
    </div>
  );
}
