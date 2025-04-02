'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user has scrolled past 400px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    // Check initial scroll position
    toggleVisibility();
    
    // Add scroll event with passive option for better performance
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Don't render button at all if not visible to improve performance
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 
        w-10 h-10 lg:w-12 lg:h-12 
        bg-white dark:bg-gray-800 
        text-primary dark:text-primary-light 
        border border-gray-200 dark:border-gray-700
        rounded-full shadow-md 
        flex items-center justify-center 
        transition-transform duration-200 ease-out
        hover:transform hover:-translate-y-1 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
