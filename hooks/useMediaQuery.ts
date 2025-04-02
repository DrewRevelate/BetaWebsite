'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * @param query Media query string (e.g., '(max-width: 768px)')
 * @returns Boolean value indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Default to false (or desktop) during SSR
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // For SSR compatibility
    if (typeof window === 'undefined') return;
    
    // Create media query list
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define listener function for changes
    const updateMatches = () => {
      setMatches(media.matches);
    };
    
    // Listen for changes
    if (media.addEventListener) {
      media.addEventListener('change', updateMatches);
    } else {
      // Older browsers
      media.addListener(updateMatches);
    }
    
    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', updateMatches);
      } else {
        // Older browsers
        media.removeListener(updateMatches);
      }
    };
  }, [query]);
  
  return matches;
}
