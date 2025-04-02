'use client';

import { useState, useEffect } from 'react';

export default function ApproachClient() {
  // Animate counters for statistics
  useEffect(() => {
    const statCounters = document.querySelectorAll('.stat-counter');
    
    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count') || '0', 10);
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
          const value = Math.floor((elapsedTime / duration) * target);
          counter.textContent = value.toString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toString();
        }
      };
      
      // Only start animation when element is in viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(counter);
    });
  }, []);
  
  // FAQ accordion functionality
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  useEffect(() => {
    // Handle FAQ interactions
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach((question, index) => {
      question.addEventListener('click', () => {
        toggleFaq(index);
      });
    });
    
    // Clean up event listeners on component unmount
    return () => {
      faqQuestions.forEach((question, index) => {
        question.removeEventListener('click', () => {
          toggleFaq(index);
        });
      });
    };
  }, []);
  
  return null; // This component only provides client-side functionality
}
