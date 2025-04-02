'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing mobile navigation state and behavior
 * @returns Object containing mobile navigation state and handlers
 */
export function useMobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      // Prevent body scroll when menu is open
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  };
}
