'use client';

import { useState, useEffect, useCallback } from 'react';
import { throttle } from '@/lib/utils';

interface ScrollHeaderOptions {
  /** Threshold in pixels to trigger the scroll state change */
  threshold?: number;
  /** Throttle delay in milliseconds */
  throttleDelay?: number;
}

/**
 * Custom hook for handling scroll behavior in header components
 * @param options Configuration options
 * @returns Boolean indicating if the page has been scrolled past the threshold
 */
export function useScrollHeader({
  threshold = 50,
  throttleDelay = 100
}: ScrollHeaderOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > threshold);
  }, [threshold]);

  // Set up scroll listener with throttling
  useEffect(() => {
    const throttledScroll = throttle(handleScroll, throttleDelay);
    
    window.addEventListener('scroll', throttledScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll, throttleDelay]);

  return isScrolled;
}
