'use client';

import { useState, useEffect, ReactNode } from 'react';

// TypeScript declaration for extended Navigator interface
interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    [key: string]: any;
  };
}

/**
 * MobileOptimizer Props
 */
interface MobileOptimizerProps {
  children: ReactNode;
  mobileBreakpoint?: number;
  deferThirdParty?: boolean;
  optimizeImages?: boolean;
  reduceMotion?: boolean;
  enableLazyComponents?: boolean;
  prefersReducedMotion?: boolean;
  optimizeTouchTargets?: boolean;
  enableFastClick?: boolean;
  className?: string;
  disableHoverOnTouch?: boolean;
}

/**
 * MobileOptimizer Component
 * 
 * This component enhances mobile experience by:
 * 1. Optimizing rendering based on device type
 * 2. Deferring non-critical resources on mobile
 * 3. Reducing animations on lower-end devices
 * 4. Implementing touch-specific optimizations
 */
export default function MobileOptimizer({
  children,
  mobileBreakpoint = 768,
  deferThirdParty = true,
  optimizeImages = true,
  reduceMotion = true,
  enableLazyComponents = true,
  prefersReducedMotion = false,
  optimizeTouchTargets = true,
  enableFastClick = true,
  disableHoverOnTouch = true,
  className = '',
}: MobileOptimizerProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(prefersReducedMotion);
  const [isLoaded, setIsLoaded] = useState(!enableLazyComponents);
  const [supportsViewTransition, setSupportsViewTransition] = useState(false);

  // Effect to detect device capabilities on mount
  useEffect(() => {
    // Detect mobile/desktop
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    // Detect low-end devices using rough heuristics
    const checkDeviceCapabilities = () => {
      // Check if device is low-end
      const extendedNavigator = navigator as NavigatorExtended;
      const isLowEnd = 
        // Check for limited memory (if available in browser)
        (extendedNavigator.deviceMemory && extendedNavigator.deviceMemory < 4) || 
        // Check for limited cores (if available)
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
        // Check for battery saving mode
        (extendedNavigator.connection && extendedNavigator.connection.saveData) ||
      // Check for slow connection
      (extendedNavigator.connection && 
        (extendedNavigator.connection.effectiveType === 'slow-2g' || 
         extendedNavigator.connection.effectiveType === '2g' ||
         extendedNavigator.connection.downlink < 0.5 ||
         extendedNavigator.connection.rtt > 500));
      
      setIsLowEndDevice(!!isLowEnd);
      
      // Update motion reduction preference
      const prefersReducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
      const shouldReduce = Boolean(prefersReducedMotionMedia.matches || prefersReducedMotion || (isLowEnd && reduceMotion));
      setShouldReduceMotion(shouldReduce);
      
      // Detect touch capability
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
      
      // Check for view transitions API support
      setSupportsViewTransition('startViewTransition' in document);
    };
    
    // Initialize detection
    checkMobile();
    checkDeviceCapabilities();
    
    // Handle resize events for responsive behavior
    window.addEventListener('resize', checkMobile);
    
    // Add optimization classes to document if mobile
    if (isMobile) {
      document.documentElement.classList.add('mobile-optimized');
      
      if (shouldReduceMotion) {
        document.documentElement.classList.add('reduce-motion');
      }
      
      if (isLowEndDevice) {
        document.documentElement.classList.add('low-end-device');
      }
      
      if (isTouch) {
        document.documentElement.classList.add('touch-device');
      }
    }
    
    // Optimize third-party resources on mobile
    if (isMobile && deferThirdParty) {
      // Find and defer non-critical third-party scripts
      document.querySelectorAll('script[data-defer-on-mobile]').forEach(script => {
        script.setAttribute('defer', '');
      });
    }
    
    // Optimize images on mobile
    if (isMobile && optimizeImages) {
      // Find images with data-mobile-src attribute and swap sources
      document.querySelectorAll('img[data-mobile-src]').forEach(img => {
        const mobileSrc = img.getAttribute('data-mobile-src');
        if (mobileSrc) {
          img.setAttribute('src', mobileSrc);
        }
      });
    }
    
    // Mark component as loaded after initial render
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
      
      // Remove classes on unmount
      document.documentElement.classList.remove(
        'mobile-optimized',
        'reduce-motion',
        'low-end-device',
        'touch-device'
      );
    };
  }, [
    mobileBreakpoint, 
    deferThirdParty, 
    optimizeImages, 
    reduceMotion, 
    prefersReducedMotion, 
    enableLazyComponents,
    isMobile, // Include isMobile in dependencies
  ]);

  // Enhanced touch-specific optimizations
  useEffect(() => {
    if (!isTouch) return;
    
    // Add improved touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      // Add active state class for touched elements with interactive role
      const target = e.target as HTMLElement;
      const interactive = target.closest('[role="button"], button, a, input, select, textarea');
      
      if (interactive) {
        interactive.classList.add('touch-active');
        
        // Apply larger touch targets if enabled
        if (optimizeTouchTargets) {
          interactive.classList.add('enhanced-touch-target');
        }
      }
    };
    
    const handleTouchEnd = () => {
      // Remove all active states
      document.querySelectorAll('.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });
    };
    
    // Implement FastClick to remove 300ms tap delay if enabled
    if (enableFastClick && 'ontouchstart' in document.documentElement) {
      document.addEventListener('touchend', function(event) {
        // Find interactive elements
        const target = event.target as HTMLElement;
        const interactive = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
        
        if (interactive && !interactive.classList.contains('no-fast-click')) {
          // Prevent default click behavior
          event.preventDefault();
          
          // Trigger click event immediately
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          interactive.dispatchEvent(clickEvent);
        }
      }, { passive: false });
    }
    
    // Disable hover effects on touch devices if enabled
    if (disableHoverOnTouch) {
      document.documentElement.classList.add('touch-no-hover');
      
      // Add CSS to disable hover effects
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-mobile-optimizer', 'true');
      styleElement.innerHTML = `
        .touch-no-hover * {
          transition: none !important;
        }
        .touch-no-hover *:hover {
          transition: none !important;
        }
        .enhanced-touch-target {
          min-height: 44px;
          min-width: 44px;
          padding: 8px;
          margin: -4px;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // Register touch handlers
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    
    return () => {
      // Clean up
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      
      if (disableHoverOnTouch) {
        document.documentElement.classList.remove('touch-no-hover');
        // Remove added style element
        const styleElement = document.querySelector('style[data-mobile-optimizer]');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      }
    };
  }, [isTouch, optimizeTouchTargets, enableFastClick, disableHoverOnTouch]);
  
  // This provides valuable context to child components
  const mobileContext = {
    isMobile,
    isTouch,
    isLowEndDevice,
    shouldReduceMotion,
    supportsViewTransition
  };
  
  // During SSR or first render, return children without optimization
  if (isMobile === null) {
    return <>{children}</>;
  }
  
  // Use lazy loading strategy for component rendering if enabled
  if (!isLoaded) {
    return (
      <div className={`mobile-optimization-placeholder ${className}`}>
        {/* Simple placeholder or loading indicator */}
        <div className="loading-indicator" aria-hidden="true">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
  
  // Return children with optimization context
  return (
    <div 
      className={`
        mobile-optimizer 
        ${isMobile ? 'mobile-view' : 'desktop-view'} 
        ${isTouch ? 'touch-enabled' : ''} 
        ${shouldReduceMotion ? 'reduced-motion' : ''}
        ${isLowEndDevice ? 'low-end-device' : ''}
        ${className}
      `}
      data-device-type={isMobile ? 'mobile' : 'desktop'}
      data-supports-transitions={supportsViewTransition ? 'true' : 'false'}
    >
      {/* Render the children with mobile optimizations */}
      {children}
    </div>
  );
}
