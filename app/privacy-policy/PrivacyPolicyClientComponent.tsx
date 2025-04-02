'use client';

import { useEffect } from 'react';
import './privacy-policy.css';

/**
 * PrivacyPolicyClientComponent handles all client-side functionality for the Privacy Policy page
 * This includes animations, scroll effects, and interactive elements
 */
export default function PrivacyPolicyClientComponent() {
  // Initialize animations and interactive elements on mount
  useEffect(() => {
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
      initializeAllElements();
    }, 100);

    // Function to initialize all animations and interactive elements
    const initializeAllElements = () => {
      // Initialize scroll animations
      animateOnScroll();
      // Initialize table of contents highlighting
      initTableOfContents();
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

    // Initialize table of contents highlighting based on scroll position
    const initTableOfContents = () => {
      const tableOfContentsLinks = document.querySelectorAll('.toc-link');
      const sections = document.querySelectorAll('.policy-section');
      
      if (tableOfContentsLinks.length && sections.length) {
        const observerOptions = {
          rootMargin: '0px 0px -80% 0px',
          threshold: 0
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Get the id of the section in view
              const id = entry.target.getAttribute('id');
              // Remove active class from all links
              tableOfContentsLinks.forEach(link => {
                link.classList.remove('active');
              });
              // Add active class to the corresponding link
              const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
              if (activeLink) {
                activeLink.classList.add('active');
              }
            }
          });
        }, observerOptions);
        
        sections.forEach(section => {
          sectionObserver.observe(section);
        });
      }
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
            
            // Update URL hash without jumping
            window.history.pushState(null, '', `#${targetId}`);
          }
        });
      });
    };

    // Cleanup on unmount
    return () => {
      // Remove any event listeners or observers to prevent memory leaks
      document.body.classList.remove('js-enabled');
    };
  }, []);

  return (
    <>
      {/* Back to Top Button */}
      <button id="back-to-top" className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center opacity-0 invisible transition-all duration-300 hover:bg-primary-dark" aria-label="Back to top">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}
