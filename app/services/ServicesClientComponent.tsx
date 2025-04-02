'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ServicesHeader from './ServicesHeader';
import withMobileOptimization from '@/components/withMobileOptimization';
import './services.css';

function ServicesClientComponent() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isComponentMounted, setIsComponentMounted] = useState<boolean>(false);
  const controls = useAnimation();
  
  // Initialize component mount state
  useEffect(() => {
    setIsComponentMounted(true);
    return () => {
      setIsComponentMounted(false);
    };
  }, []);
  
  // Initialize component loaded state
  useEffect(() => {
    if (!isComponentMounted) return;
    
    setIsLoaded(true);
    controls.start("visible");
  }, [controls, isComponentMounted]);
  
  // Initialize interactive elements with better performance
  useEffect(() => {
    if (!isComponentMounted || !isLoaded) return;
    
    // Use requestIdleCallback to defer non-critical initializations
    const initializationTimeout = window.setTimeout(() => {
      // Initialize FAQ Accordion with improved animation
      const initFaq = () => {
        const faqButtons = document.querySelectorAll('.faq-question');
        if (faqButtons.length === 0) return;
        
        faqButtons.forEach(button => {
          if (!button || !button.parentElement) return;
          
          button.addEventListener('click', () => {
            if (!button || !button.parentElement) return;
            
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            
            // Find the answer element and animate it
            const answer = button.nextElementSibling as HTMLElement;
            if (answer && answer.classList.contains('faq-answer')) {
              if (isExpanded) {
                answer.style.maxHeight = '0px';
                // Find the icon and rotate it back
                const icon = button.querySelector('i');
                if (icon) {
                  icon.style.transform = 'rotate(0deg)';
                }
              } else {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                // Find the icon and rotate it
                const icon = button.querySelector('i');
                if (icon) {
                  icon.style.transform = 'rotate(180deg)';
                }
              }
            }
          });
        });
      };
      
      // Enhanced scroll animations with IntersectionObserver for better performance
      const initScrollAnimations = () => {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        if (animateElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              // Add staggered animation delay based on index with window.setTimeout
              // for better performance
              window.setTimeout(() => {
                if (entry.target.classList) {
                  entry.target.classList.add('animated');
                }
              }, index * 100); // 100ms staggered delay for each element
              
              observer.unobserve(entry.target);
            }
          });
        }, { 
          threshold: 0.15,
          rootMargin: '0px 0px -10% 0px'
        });
        
        animateElements.forEach(element => {
          observer.observe(element);
        });
      };
      
      // Initialize back to top button with throttled scroll handler
      const initBackToTop = () => {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        // Add a scroll progress indicator
        const progressIndicator = document.createElement('svg');
        progressIndicator.setAttribute('className', 'back-to-top-progress w-full h-full absolute top-0 left-0');
        progressIndicator.innerHTML = `
          <circle cx="24" cy="24" r="20" stroke="#e0e0e0" stroke-width="3" fill="none" />
          <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="3" fill="none" className="progress-circle" stroke-dasharray="126" stroke-dashoffset="126" />
        `;
        backToTopBtn.appendChild(progressIndicator);
        
        // Throttle scroll handler for better performance
        let lastScrollTime = 0;
        const scrollThreshold = 100; // 100ms between scroll updates
        
        const handleScroll = () => {
          if (!backToTopBtn) return;
          
          const now = Date.now();
          if (now - lastScrollTime < scrollThreshold) return;
          lastScrollTime = now;
          
          const scrollPercentage = Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100);
          const progressCircle = backToTopBtn.querySelector('.progress-circle');
          
          if (progressCircle) {
            const radius = 20;
            const circumference = 2 * Math.PI * radius;
            const dashOffset = circumference - (scrollPercentage / 100) * circumference;
            progressCircle.setAttribute('stroke-dashoffset', dashOffset.toString());
          }
          
          if (window.scrollY > 500) {
            backToTopBtn.classList.add('opacity-100');
            backToTopBtn.classList.remove('opacity-0');
            backToTopBtn.classList.remove('pointer-events-none');
          } else {
            backToTopBtn.classList.remove('opacity-100');
            backToTopBtn.classList.add('opacity-0');
            backToTopBtn.classList.add('pointer-events-none');
          }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      };
      
      // Implement smooth scrolling for anchor links
      const initSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        if (anchorLinks.length === 0) return;
        
        anchorLinks.forEach(anchor => {
          anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                // Add a highlighting pulse effect to the target section
                targetElement.classList.add('scroll-highlight');
                setTimeout(() => {
                  if (targetElement.classList) {
                    targetElement.classList.remove('scroll-highlight');
                  }
                }, 1500);
                
                // Adjust scroll position for mobile vs desktop
                const isMobile = window.innerWidth < 768;
                const scrollOffset = isMobile ? 80 : 120;
                
                window.scrollTo({
                  top: targetElement.getBoundingClientRect().top + window.scrollY - scrollOffset,
                  behavior: 'smooth'
                });
              }
            }
          });
        });
      };
      
      // Run all initializations in a safe way
      try {
        // Use promises to ensure sequential initialization of critical items and
        // handle errors gracefully
        Promise.resolve()
          .then(() => {
            initFaq();
            return new Promise(resolve => setTimeout(resolve, 10));
          })
          .then(() => {
            initBackToTop();
            return new Promise(resolve => setTimeout(resolve, 10));
          })
          .then(() => {
            initSmoothScroll();
            return new Promise(resolve => setTimeout(resolve, 10));
          })
          .then(() => {
            // Non-critical items can be initialized with a small delay
            setTimeout(() => {
              initScrollAnimations();
            }, 100);
          })
          .catch(error => {
            console.error("Error initializing services component:", error);
          });
      } catch (error) {
        console.error("Error initializing services component:", error);
      }
      
    }, 200); // Increased timeout to ensure DOM is fully rendered
    
    // Cleanup event listeners
    return () => {
      clearTimeout(initializationTimeout);
      
      // Safely remove event listeners if needed
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        backToTopBtn.removeEventListener('click', () => {});
      }
    };
  }, [isLoaded, isComponentMounted]);
  
  // Animation variants for page content
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <ServicesHeader />
    </motion.div>
  );
}

// Export with mobile optimization applied
export default withMobileOptimization(ServicesClientComponent, {
  mobileBreakpoint: 768,
  optimizeImages: true,
  reduceMotion: true,
  optimizeTouchTargets: true,
  enableFastClick: true,
  disableHoverOnTouch: true
});