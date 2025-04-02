'use client';

import { useScrollToHash } from '@/lib/useScrollToHash';

/**
 * A client component that handles scrolling to hash fragments
 * This is used in the root layout to ensure all pages can scroll to hash fragments
 */
export default function ClientScrollHandler() {
  // Use the custom hook to handle scrolling to hash fragments
  useScrollToHash();
  
  // This component doesn't render anything visible
  return null;
}
