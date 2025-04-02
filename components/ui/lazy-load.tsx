'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
// Remove dependency on react-intersection-observer

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
  disabled?: boolean;
}

/**
 * LazyLoad component for deferring rendering of content until it's near the viewport
 * 
 * Features:
 * - Only renders children when they are about to enter the viewport
 * - Configurable threshold and rootMargin
 * - Optional placeholder while content is being loaded
 * - Optional delay to stagger loading for better performance
 * 
 * @example
 * <LazyLoad>
 *   <HeavyComponent />
 * </LazyLoad>
 */
export default function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '200px 0px',
  placeholder,
  className = '',
  once = true,
  delay = 0,
  disabled = false
}: LazyLoadProps) {
  const [shouldRender, setShouldRender] = useState(disabled);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Use native IntersectionObserver instead of react-intersection-observer
  useEffect(() => {
    if (disabled) {
      setShouldRender(true);
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else {
          if (!once) setInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold, once, disabled]);
  
  useEffect(() => {
    if (disabled) {
      setShouldRender(true);
      return;
    }
    
    let timeoutId: NodeJS.Timeout;
    
    if (inView) {
      // Add delay if specified to stagger loading of components
      if (delay > 0) {
        timeoutId = setTimeout(() => {
          setShouldRender(true);
        }, delay);
      } else {
        setShouldRender(true);
      }
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inView, delay, disabled]);
  
  // Apply fade-in animation when content becomes visible
  const fadeInClass = shouldRender ? 'opacity-100 transition-opacity duration-500' : 'opacity-0';
  
  return (
    <div ref={ref} className={`${className} ${fadeInClass}`}>
      {shouldRender ? children : placeholder || null}
    </div>
  );
}

/**
 * Lazy Image component specifically for optimized image lazy loading
 */
export function LazyImage({
  children,
  threshold = 0.01, // Lower threshold for images
  rootMargin = '400px 0px', // Larger margin for images for better UX
  placeholder,
  className = '',
  once = true,
}: LazyLoadProps) {
  return (
    <LazyLoad
      threshold={threshold}
      rootMargin={rootMargin}
      placeholder={placeholder}
      className={className}
      once={once}
    >
      {children}
    </LazyLoad>
  );
}
