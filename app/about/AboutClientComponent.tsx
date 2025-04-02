'use client';

import { useEffect } from 'react';
import './about.css';
import dynamic from 'next/dynamic';

// Import client components dynamically
const TestimonialsSlider = dynamic(() => import('@/components/TestimonialsSlider'), { ssr: false });
const DynamicFAQSection = dynamic(() => import('./FaqSection'), { ssr: false });
const StatCounter = dynamic(() => import('./StatCounter'), { ssr: false });

/**
 * AboutClientComponent handles all client-side functionality for the About page
 * This includes animations, scroll effects, and coordinating interactive elements
 */
export default function AboutClientComponent() {
  // Initialize animations and interactive elements on mount
  useEffect(() => {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
      initializeAllAnimations();
    }, 100);

    // Function to initialize all animations and interactive elements
    const initializeAllAnimations = () => {
      // Initialize scroll animations
      animateOnScroll();
      // Initialize back to top button
      initBackToTop();
      // Initialize smooth scroll for anchor links
      initSmoothScroll();
      // Add classes to enable CSS animations
      document.body.classList.add('js-enabled');
    };
    
    // Initialize scroll animations
    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    };

    // Initialize back to top button
    const initBackToTop = () => {
      const backToTopButton = document.getElementById('back-to-top');
      
      if (backToTopButton) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
          } else {
            backToTopButton.classList.remove('visible');
          }
        });
        
        backToTopButton.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    };

    // Smooth scroll for anchor links
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href')?.substring(1);
          if (!targetId) return;
          
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    };

    // Console logging for debugging purposes
    console.log('AboutClientComponent initialized');

    // Cleanup on unmount
    return () => {
      // Remove any event listeners or observers to prevent memory leaks
      document.body.classList.remove('js-enabled');
    };
  }, []);

  return (
    <>
      {/* These components are rendered in the server component, but we're including them here
          to ensure they're properly loaded as client components */}
      {/* We don't need to render these components here since they're already included in the server component */}
      {/* This is just a reference to ensure they're properly loaded */}
      <div id="client-components-container" className="hidden" aria-hidden="true">
        {/* These components are included here to ensure correct client-side hydration */}
        <TestimonialsSlider />
        <DynamicFAQSection />
        <StatCounter />
      </div>
      
      {/* Back to Top Button */}
      <button id="back-to-top" className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-primary-dark" aria-label="Back to top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
