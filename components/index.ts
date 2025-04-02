/**
 * Components Barrel File
 * This file exports all components from a single location for easier imports
 */

// Core Components
export { default as ErrorBoundary } from './ErrorBoundary';
export { default as Footer } from './Footer';
export { default as Navigation } from './Navigation';
export { default as LazyLoad } from './LazyLoad';
export { default as OptimizedImage } from './OptimizedImage';
export { default as JsonLdSchema } from './JsonLdSchema';
export { default as TestimonialsSlider } from './TestimonialsSlider';
export { default as SanityRichContent } from './SanityRichContent';

// Layout Components
export { default as PerformanceLayout } from './PerformanceLayout';

// UI Components
export { default as BackToTopButton } from './BackToTopButton';
export { default as ClientScrollHandler } from './ClientScrollHandler';
export { default as ImageOptimizer } from './ImageOptimizer';
export { default as MobileOptimizer } from './MobileOptimizer';
export { default as Accordion } from './Accordion';
export { default as FAQ } from './FAQ';

// Higher Order Components
export { default as withMobileOptimization } from './withMobileOptimization';
