'use client';

import { useEffect, useRef } from 'react';
import ApproachHeader from './ApproachHeader';
import './approach.css';

export default function ApproachClientComponent() {
  // Create refs for cleanup and storing function references
  const observerRef = useRef<IntersectionObserver | null>(null);
  const counterObserverRef = useRef<IntersectionObserver | null>(null);
  
  // Store function references to use in both adding and removing event listeners
  const scrollHandlerRef = useRef<EventListener | null>(null);
  const backToTopClickHandler = useRef<EventListener | null>(null);
  const backToTopKeyHandler = useRef<EventListener | null>(null);

  // Initialize interactive elements after hydration
  useEffect(() => {
    // Wait for full hydration to complete before interacting with DOM
    const timer = setTimeout(() => {
      // Initialize scroll animations
      const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
          observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Optionally unobserve after animation
                if (entry.target.classList.contains('animate-once')) {
                  observerRef.current?.unobserve(entry.target);
                }
              }
            });
          }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
          });
          
          animatedElements.forEach(element => {
            observerRef.current?.observe(element);
          });
        }
      };

      // Initialize back to top button
      const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
          // Add aria-label if not present
          if (!backToTopBtn.getAttribute('aria-label')) {
            backToTopBtn.setAttribute('aria-label', 'Back to top');
          }
          
          // Hide button initially
          backToTopBtn.classList.add('opacity-0', 'invisible');
          
          // Create and store scroll handler
          const handleScroll = () => {
            if (window.scrollY > 500) {
              backToTopBtn.classList.remove('opacity-0', 'invisible');
              backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
              backToTopBtn.classList.add('opacity-0', 'invisible');
              backToTopBtn.classList.remove('opacity-100', 'visible');
            }
          };
          
          // Store handler for cleanup
          scrollHandlerRef.current = handleScroll as EventListener;
          
          // Add scroll event listener
          window.addEventListener('scroll', handleScroll, { passive: true });
          
          // Create and store click handler
          const clickHandler = () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          };
          
          // Create and store keydown handler
          const keyHandler = (e: Event) => {
            const keyEvent = e as KeyboardEvent;
            if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
              e.preventDefault();
              backToTopBtn.click();
            }
          };
          
          // Store handlers for cleanup
          backToTopClickHandler.current = clickHandler as EventListener;
          backToTopKeyHandler.current = keyHandler as EventListener;
          
          // Add event listeners
          backToTopBtn.addEventListener('click', clickHandler);
          backToTopBtn.addEventListener('keydown', keyHandler);
        }
      };
      
      // Initialize smooth scrolling for anchor links
      const initSmoothScroll = () => {
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
          // Create and store click handler
          const clickHandler = function(e: Event) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            
            if (targetId && targetId !== '#') {
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                // Scroll to element
                window.scrollTo({
                  top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
                  behavior: 'smooth'
                });
                
                // Focus the target for accessibility
                if (targetElement instanceof HTMLElement) {
                  targetElement.setAttribute('tabindex', '-1');
                  targetElement.focus({ preventScroll: true });
                }
              }
            }
          };
          
          // Add event listeners
          anchor.addEventListener('click', clickHandler);
        });
      };
      
      // Initialize stat counters
      const initStatCounters = () => {
        const counters = document.querySelectorAll<HTMLElement>('.stat-counter');
        
        if (counters.length && 'IntersectionObserver' in window) {
          counterObserverRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const element = entry.target as HTMLElement;
                const targetValue = parseInt(element.dataset.count || '0', 10);
                let currentValue = 0;
                const duration = 1500; // ms
                const step = Math.max(1, Math.floor(targetValue / (duration / 16)));
                const timer = setInterval(() => {
                  currentValue += step;
                  if (currentValue >= targetValue) {
                    element.textContent = targetValue.toString();
                    clearInterval(timer);
                  } else {
                    element.textContent = currentValue.toString();
                  }
                }, 16);
                
                // Only animate once
                counterObserverRef.current?.unobserve(entry.target);
              }
            });
          }, {
            threshold: 0.5
          });
          
          counters.forEach(counter => {
            counterObserverRef.current?.observe(counter);
          });
        }
      };
      
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        try {
          initBackToTop();
          initScrollAnimations();
          initSmoothScroll();
          initStatCounters();
        } catch (error) {
          console.error('Error initializing approach page interactive elements:', error);
        }
      });
    }, 500); // Slight delay to ensure hydration is complete
    
    // Cleanup function to prevent memory leaks
    return () => {
      clearTimeout(timer);
      
      // Clean up observers
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      if (counterObserverRef.current) {
        counterObserverRef.current.disconnect();
      }
      
      // Clean up back to top button
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        if (backToTopClickHandler.current) backToTopBtn.removeEventListener('click', backToTopClickHandler.current);
        if (backToTopKeyHandler.current) backToTopBtn.removeEventListener('keydown', backToTopKeyHandler.current);
      }
      
      // Clean up scroll listener
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, []);
  
  return <ApproachHeader />;
}