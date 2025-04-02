'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import './terms-of-service.css';

// TypeScript declaration for window object extension
declare global {
  interface Window {
    tocObserver?: IntersectionObserver;
    animationObserver?: IntersectionObserver;
  }
}

/**
 * TermsOfServiceClientComponent handles all client-side functionality for the Terms of Service page
 * This includes animations, scroll effects, and interactive elements
 */
export default function TermsOfServiceClientComponent() {
  // State to track UI elements
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  
  // Refs for mobile TOC
  const mobileTocRef = useRef<HTMLDivElement>(null);
  const mobileTocButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle scroll event to show/hide back to top button with simplified approach
  const handleScroll = useCallback(() => {
    // Show/hide back to top button using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });
  }, []);

  // Set up IntersectionObserver for TOC highlights in a separate effect
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Create options for the observer
    const options = {
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };
    
    // Create the observer for TOC highlighting
    const observer = new IntersectionObserver((entries) => {
      // Find the first intersecting entry
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      
      if (intersectingEntry) {
        const newActiveSectionId = intersectingEntry.target.id;
        if (newActiveSectionId !== activeSectionId) {
          setActiveSectionId(newActiveSectionId);
        }
      }
    }, options);
    
    // Store observer for cleanup
    window.tocObserver = observer;
    
    // Observe all section elements
    const sections = document.querySelectorAll('.terms-section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeSectionId]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Toggle mobile table of contents
  const toggleMobileToc = useCallback(() => {
    setShowMobileToc(prev => !prev);
  }, []);
  
  // Scroll to section smoothly with proper focus management
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Scroll to section
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Set focus to section for better accessibility
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
      
      // Add to browser history for better navigation
      window.history.pushState(null, '', `#${sectionId}`);
      
      // Hide mobile TOC after selection
      setShowMobileToc(false);
    }
  }, []);
  
  // Close mobile TOC when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMobileToc && 
        mobileTocRef.current && 
        mobileTocButtonRef.current && 
        !mobileTocRef.current.contains(event.target as Node) &&
        !mobileTocButtonRef.current.contains(event.target as Node)
      ) {
        setShowMobileToc(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileToc]);

  // Handle keyboard navigation for the TOC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close mobile TOC on escape
      if (e.key === 'Escape' && showMobileToc) {
        setShowMobileToc(false);
        mobileTocButtonRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMobileToc]);

  // Initialize animations and interactive elements on mount with improved React approach
  useEffect(() => {
    // Use requestAnimationFrame for first render
    requestAnimationFrame(() => {
      // Initialize scroll animations
      animateOnScroll();
      
      // Add scroll event listener for back to top button
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Check initial scroll position
      handleScroll();
      
      // Enable JS features class for CSS
      document.body.classList.add('js-enabled');
    });

    
    // Initialize scroll animations with improved React and IntersectionObserver approach
    const animateOnScroll = () => {
      // Only run on client-side
      if (typeof window === 'undefined') return;
      
      const animatedElements = document.querySelectorAll('.terms-section');
      
      // Create a single reusable callback function
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        // Batch DOM updates for better performance
        window.requestAnimationFrame(() => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Add animated class for CSS transitions
              entry.target.classList.add('animated');
              // Stop observing after animation is applied
              observer.unobserve(entry.target);
            }
          });
        });
      };
      
      // Create a single observer for all elements
      const observer = new IntersectionObserver(handleIntersection, { 
        threshold: 0.05,
        rootMargin: '0px 0px -5% 0px'
      });
      
      // Store the observer for cleanup
      window.animationObserver = observer;
      
      // Observe all elements - simplified approach to prevent hydration issues
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    };

    // Initialize mobile table of contents with React approach
    const initMobileToc = () => {
      // Instead of manipulating DOM directly, we'll render the TOC using React
      // The content is rendered in the JSX below, so we don't need to do anything here
      // This is just a placeholder to maintain the API
    };

    // Simplified cleanup on unmount
    return () => {
      // Remove scroll event listener
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('js-enabled');
      
      // Clean up animation observer (TOC observer cleanup is in its own effect)
      if (window.animationObserver) {
        window.animationObserver.disconnect();
        window.animationObserver = undefined;
      }
    };
  }, [handleScroll, scrollToSection]);

  // Generate PDF function
  const handleDownloadPdf = useCallback(() => {
    window.location.href = '/terms-of-service/revelate-terms-of-service.pdf';
  }, []);

  return (
    <>
      {/* Back to Top Button - Improved for accessibility */}
      <motion.button 
      id="back-to-top" 
      className="fixed bottom-8 right-8 z-50 w-14 h-14 md:w-12 md:h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={showBackToTop ? 0 : -1} // Only focusable when visible
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
      opacity: showBackToTop ? 1 : 0,
      y: showBackToTop ? 0 : 20,
      pointerEvents: showBackToTop ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3 }}
        data-testid="back-to-top-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Mobile Table of Contents - Enhanced for better mobile experience and accessibility */}
      <div className="lg:hidden sticky top-16 z-40 bg-white dark:bg-gray-800 p-4 mb-4 shadow-md rounded-lg mx-4" role="navigation" aria-label="Mobile Table of Contents">
        <button 
          ref={mobileTocButtonRef}
          className="w-full flex items-center justify-between text-lg font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-3 touch-manipulation"
          onClick={toggleMobileToc}
          aria-expanded={showMobileToc}
          aria-controls="toc-mobile"
          data-testid="mobile-toc-button"
        >
          <span className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Table of Contents
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transform transition-transform ${showMobileToc ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Animate the mobile TOC for better UX */}
        <motion.div 
          id="toc-mobile" 
          ref={mobileTocRef}
          className="mt-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showMobileToc ? 'auto' : 0,
            opacity: showMobileToc ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          aria-hidden={!showMobileToc}
          role="navigation"
          aria-label="Mobile Table of Contents"
        >
          {/* Render TOC items with React instead of DOM manipulation */}
          {showMobileToc && (
            <ul className="space-y-2">
              {[
                { id: 'introduction', label: 'Introduction' },
                { id: 'acceptance', label: 'Acceptance of Terms' },
                { id: 'services', label: 'Services Description' },
                { id: 'user-accounts', label: 'User Accounts' },
                { id: 'user-obligations', label: 'User Obligations' },
                { id: 'intellectual-property', label: 'Intellectual Property' },
                { id: 'third-party-services', label: 'Third-Party Services' },
                { id: 'payment-terms', label: 'Payment Terms' },
                { id: 'disclaimers', label: 'Disclaimers' },
                { id: 'limitation-liability', label: 'Limitation of Liability' },
                { id: 'indemnification', label: 'Indemnification' },
                { id: 'termination', label: 'Termination' },
                { id: 'governing-law', label: 'Governing Law' },
                { id: 'changes', label: 'Changes to Terms' },
                { id: 'contact-us', label: 'Contact Us' }
              ].map(item => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className="toc-link block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors p-2 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
      
      {/* Document Actions Bar - Improved for mobile */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center space-x-2 touch-manipulation">
          {/* PDF Download Button - Larger touch target */}
          <button 
            onClick={handleDownloadPdf}
            className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Download Terms of Service as PDF"
            data-testid="download-pdf-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Print Button - Larger touch target */}
          <button 
            onClick={() => window.print()}
            className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Print Terms of Service"
            data-testid="print-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* React effect handles TOC highlighting instead of script injection */}
    </>
  );
}