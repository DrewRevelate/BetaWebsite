'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * A hook that handles scrolling to a hash fragment in the URL
 * This solves the issue with Next.js not automatically scrolling to hash fragments
 */
export function useScrollToHash() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const hash = window.location.hash;
      const element = document.getElementById(hash.substring(1));
      
      if (element) {
        // Slight delay to ensure the page is fully rendered
        setTimeout(() => {
          // Scroll to the element
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [pathname, searchParams]); // Re-run when the pathname or search params change
}
