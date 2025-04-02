'use client';

import React from 'react';
import MobileOptimizer from './MobileOptimizer';

/**
 * Higher-Order Component to wrap page components with MobileOptimizer
 * This makes it easy to apply consistent mobile optimizations across pages
 */
export default function withMobileOptimization<P extends object>(
  Component: React.ComponentType<P>,
  options = {
    mobileBreakpoint: 768,
    optimizeImages: true,
    reduceMotion: true,
    enableLazyComponents: true,
    optimizeTouchTargets: true,
    enableFastClick: true,
    disableHoverOnTouch: true,
  }
) {
  // Return a new component that wraps the provided component with MobileOptimizer
  return function WithMobileOptimization(props: P) {
    return (
      <MobileOptimizer
        mobileBreakpoint={options.mobileBreakpoint}
        optimizeImages={options.optimizeImages}
        reduceMotion={options.reduceMotion}
        enableLazyComponents={options.enableLazyComponents}
        optimizeTouchTargets={options.optimizeTouchTargets}
        enableFastClick={options.enableFastClick}
        disableHoverOnTouch={options.disableHoverOnTouch}
      >
        <Component {...props} />
      </MobileOptimizer>
    );
  };
}