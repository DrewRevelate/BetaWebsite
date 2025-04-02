'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  className?: string;
  once?: boolean;
  skip?: boolean;
  delay?: number;
}

/**
 * LazyLoad component for optimizing below-fold content loading
 * Uses Intersection Observer API to only load content when it's about to enter the viewport
 */
export default function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '200px 0px',
  placeholder,
  className = '',
  once = true,
  skip = false,
  delay = 0
}: LazyLoadProps) {
  const [isClient, setIsClient] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(skip);
  const [isLoaded, setIsLoaded] = useState(skip);
  
  // Use intersection observer to detect when element is in viewport
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once
  });
  
  // Check if we're in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load content when it comes into view
  useEffect(() => {
    if (skip || !isClient) return;
    
    if (inView && !shouldLoad) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, delay);
        
        return () => clearTimeout(timer);
      } else {
        setShouldLoad(true);
      }
    }
  }, [inView, shouldLoad, isClient, delay, skip]);
  
  // Mark as loaded after component renders
  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      const timer = requestAnimationFrame(() => {
        setIsLoaded(true);
      });
      
      return () => cancelAnimationFrame(timer);
    }
  }, [shouldLoad, isLoaded]);
  
  // If not client-side or explicitly skipping lazy load, render children directly
  if (!isClient || skip) {
    return <>{children}</>;
  }
  
  return (
    <div 
      ref={ref} 
      className={`lazy-load ${isLoaded ? 'loaded' : ''} ${className}`}
      data-lazy-load-status={shouldLoad ? 'loaded' : 'pending'}
    >
      {shouldLoad ? children : placeholder || <div className="min-h-[100px]" />}
    </div>
  );
}
