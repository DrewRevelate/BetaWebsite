import { useState, useEffect } from 'react';

/**
 * Hook to safely determine if code is running on the client side
 * 
 * Useful for operations that should only run in the browser environment
 * and avoiding hydration mismatches
 * 
 * @returns boolean indicating if the code is running on the client
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
