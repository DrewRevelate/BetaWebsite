'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingCTAProps {
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  showAfterScroll?: number; // Pixels to scroll before showing
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  variant?: 'standard' | 'compact' | 'expanded' | 'social-proof';
  className?: string;
  dismissMode?: 'session' | 'temporary' | 'permanent';
  showDelay?: number; // Milliseconds to delay showing the CTA
  hideAfterSeconds?: number; // Hide after X seconds if no interaction
  exitIntent?: boolean; // Show on exit intent
  activePages?: string[]; // Only show on specific pages
  testimonial?: {
    text: string;
    author: string;
    position?: string;
    company?: string;
  };
  customIcon?: React.ReactNode;
  ctaImage?: string;
  triggerEvents?: ('scroll' | 'time' | 'exit' | 'inactivity')[];
  showLiveVisitors?: boolean;
}

export default function FloatingCTA({
  primaryText = 'Get Started',
  primaryLink = '/contact',
  secondaryText,
  secondaryLink,
  showAfterScroll = 400,
  position = 'bottom-right',
  variant = 'standard',
  className,
  dismissMode = 'session',
  showDelay = 1000,
  hideAfterSeconds,
  exitIntent = false,
  activePages,
  testimonial,
  customIcon,
  ctaImage,
  triggerEvents = ['scroll'],
  showLiveVisitors = false,
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const showDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if we should show on current page
  useEffect(() => {
    if (activePages && activePages.length > 0) {
      const currentPath = window.location.pathname;
      const shouldShowOnPage = activePages.some(page => {
        if (page.endsWith('*')) {
          // Wildcard matching
          const basePath = page.slice(0, -1);
          return currentPath.startsWith(basePath);
        }
        return currentPath === page;
      });
      
      if (!shouldShowOnPage) {
        setHasDismissed(true);
      }
    }
  }, [activePages]);
  
  // Handle simulated live visitor count
  useEffect(() => {
    if (showLiveVisitors) {
      // Randomly generate visitor count between 15-35
      const baseCount = Math.floor(Math.random() * 20) + 15;
      setVisitorCount(baseCount);
      
      // Occasionally update the count
      const interval = setInterval(() => {
        setVisitorCount(prev => {
          if (prev === null) return baseCount;
          const change = Math.random() > 0.5 ? 1 : -1;
          return Math.max(10, prev + change);
        });
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [showLiveVisitors]);
  
  // Check dismissal state
  useEffect(() => {
    if (dismissMode === 'session') {
      const sessionDismissed = sessionStorage.getItem('floating-cta-dismissed');
      if (sessionDismissed === 'true') {
        setHasDismissed(true);
      }
    } else if (dismissMode === 'permanent') {
      const permanentDismissed = localStorage.getItem('floating-cta-dismissed');
      if (permanentDismissed === 'true') {
        setHasDismissed(true);
      }
    }
  }, [dismissMode]);
  
  // Track triggers for showing the CTA
  useEffect(() => {
    if (hasDismissed) return;
    
    // Handle scroll trigger
    const handleScroll = () => {
      if (triggerEvents.includes('scroll')) {
        const scrolled = window.scrollY;
        if (scrolled > showAfterScroll && !isVisible && !hasDismissed) {
          if (showDelayTimerRef.current) clearTimeout(showDelayTimerRef.current);
          showDelayTimerRef.current = setTimeout(() => {
            setIsVisible(true);
          }, showDelay);
        }
      }
    };
    
    // Handle exit intent trigger
    const handleExitIntent = (e: MouseEvent) => {
      if (exitIntent && triggerEvents.includes('exit') && !isVisible && !hasDismissed) {
        if (e.clientY <= 0) {
          // User is about to leave
          if (showDelayTimerRef.current) clearTimeout(showDelayTimerRef.current);
          showDelayTimerRef.current = setTimeout(() => {
            setIsVisible(true);
          }, showDelay);
        }
      }
    };
    
    // Handle inactivity trigger
    let inactivityTimer: NodeJS.Timeout | null = null;
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (triggerEvents.includes('inactivity') && !isVisible && !hasDismissed) {
        inactivityTimer = setTimeout(() => {
          setIsVisible(true);
        }, 30000); // Show after 30 seconds of inactivity
      }
    };
    
    // Handle time-based trigger
    if (triggerEvents.includes('time') && !isVisible && !hasDismissed) {
      if (showDelayTimerRef.current) clearTimeout(showDelayTimerRef.current);
      showDelayTimerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
    }
    
    // Set up all applicable event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (exitIntent) {
      document.addEventListener('mouseleave', handleExitIntent);
    }
    if (triggerEvents.includes('inactivity')) {
      document.addEventListener('mousemove', resetInactivityTimer);
      document.addEventListener('keydown', resetInactivityTimer);
      document.addEventListener('click', resetInactivityTimer);
      resetInactivityTimer();
    }
    
    // Initial check for scroll position
    handleScroll();
    
    // Auto-hide after specified time if no interaction
    if (hideAfterSeconds && isVisible && !hasInteracted) {
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideAfterSeconds * 1000);
    }
    
    // Clean up all listeners and timers
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (exitIntent) {
        document.removeEventListener('mouseleave', handleExitIntent);
      }
      if (triggerEvents.includes('inactivity')) {
        document.removeEventListener('mousemove', resetInactivityTimer);
        document.removeEventListener('keydown', resetInactivityTimer);
        document.removeEventListener('click', resetInactivityTimer);
        if (inactivityTimer) clearTimeout(inactivityTimer);
      }
      if (showDelayTimerRef.current) clearTimeout(showDelayTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [
    showAfterScroll, 
    hasDismissed, 
    isVisible, 
    showDelay, 
    exitIntent, 
    hideAfterSeconds, 
    hasInteracted,
    triggerEvents
  ]);
  
  // Handle interaction with the CTA
  const handleInteraction = () => {
    setHasInteracted(true);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };
  
  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ctaRef.current && !ctaRef.current.contains(event.target as Node) && isVisible) {
        if (dismissMode === 'temporary') {
          setIsVisible(false);
        } else {
          handleDismiss();
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, dismissMode]);
  
  // Handle dismiss action
  const handleDismiss = () => {
    setHasDismissed(true);
    setIsVisible(false);
    
    // Store dismissal based on mode
    if (dismissMode === 'session') {
      sessionStorage.setItem('floating-cta-dismissed', 'true');
    } else if (dismissMode === 'permanent') {
      localStorage.setItem('floating-cta-dismissed', 'true');
    }
  };
  
  // Track clicks for analytics
  const trackClick = (label: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        'event_category': 'engagement',
        'event_label': label,
        'value': 1
      });
    }
  };
  
  // Don't render if user has dismissed
  if (hasDismissed) return null;
  
  // Determine position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-6 left-6'
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed z-40',
            positionClasses[position],
            className
          )}
          onMouseEnter={handleInteraction}
          onFocus={handleInteraction}
          onTouchStart={handleInteraction}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 max-w-md">
            {/* Live visitor counter */}
            {showLiveVisitors && visitorCount !== null && (
              <div className="absolute -top-3 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>{visitorCount} people viewing now</span>
              </div>
            )}
            
            {/* Variants */}
            {variant === 'standard' && (
              <div className="flex items-start">
                {/* Close button */}
                <button 
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                  aria-label="Dismiss notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Icon */}
                <div className="flex-shrink-0 mr-4">
                  {customIcon || (
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pr-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Ready to transform your data?</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    Our experts are ready to help unlock insights from your data.
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Link 
                      href={primaryLink}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm transition-all hover:shadow-md"
                      onClick={() => trackClick(primaryText)}
                    >
                      {primaryText}
                    </Link>
                    
                    {secondaryText && secondaryLink && (
                      <Link 
                        href={secondaryLink}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-transparent hover:bg-primary/10 rounded-md border border-primary transition-colors"
                        onClick={() => trackClick(secondaryText)}
                      >
                        {secondaryText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {variant === 'compact' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mr-2">
                    {customIcon || (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white mr-3">Ready to get started?</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={primaryLink}
                    className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm transition-all hover:shadow-md"
                    onClick={() => trackClick(primaryText)}
                  >
                    {primaryText}
                  </Link>
                  
                  <button 
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                    aria-label="Dismiss notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {variant === 'expanded' && (
              <div className="relative">
                {/* Close button */}
                <button 
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 z-20 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                  aria-label="Dismiss notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Image banner */}
                {ctaImage && (
                  <div className="relative h-32 rounded-t-lg overflow-hidden -mx-4 -mt-4 mb-4">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${ctaImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <h4 className="text-white text-lg font-bold">Transform Your Data Today</h4>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col">
                  {!ctaImage && (
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      Unlock your data's full potential
                    </h4>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Our data experts can help you build integrated systems that drive growth and increase operational excellence.
                  </p>
                  
                  {/* Key benefits */}
                  <div className="mb-4 space-y-2">
                    {[
                      'Integrate your data sources',
                      'Build actionable dashboards',
                      'Automate reporting workflows',
                      'Drive data-based decisions'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA buttons */}
                  <div className="flex flex-col gap-2">
                    <Link 
                      href={primaryLink}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm transition-all hover:shadow-md"
                      onClick={() => trackClick(primaryText)}
                    >
                      {primaryText}
                    </Link>
                    
                    {secondaryText && secondaryLink && (
                      <Link 
                        href={secondaryLink}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-primary bg-transparent hover:bg-primary/10 rounded-md border border-primary transition-colors"
                        onClick={() => trackClick(secondaryText)}
                      >
                        {secondaryText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {variant === 'social-proof' && testimonial && (
              <div className="flex flex-col">
                {/* Close button */}
                <button 
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                  aria-label="Dismiss notification"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* Testimonial */}
                <div className="mb-4">
                  <svg className="h-6 w-6 text-primary opacity-50 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-1.62-.819-2.753-2.192-3.391L6 8v13h8.017ZM18 21V8l-5.388 2.055C10.766 10.697 10 11.829 10 13.454V21h8Z"/>
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-2 flex items-center justify-center text-gray-500 dark:text-gray-300">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                      {(testimonial.position || testimonial.company) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.position}
                          {testimonial.position && testimonial.company && ', '}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* CTA button */}
                <Link 
                  href={primaryLink}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm transition-all hover:shadow-md"
                  onClick={() => trackClick(primaryText)}
                >
                  {primaryText}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
