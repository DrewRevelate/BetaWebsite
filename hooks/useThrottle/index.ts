import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to throttle a function to improve performance
 * Useful for event handlers that fire frequently like scroll or mousemove
 * 
 * @param callback Function to throttle
 * @param delay Delay in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastArgs = useRef<Parameters<T> | null>(null);

  // Clear the timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      lastArgs.current = args;

      // If we haven't called recently, call immediately
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        // Otherwise, schedule a call after the delay
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
          lastCall.current = Date.now();
          if (lastArgs.current) {
            callback(...lastArgs.current);
          }
        }, delay - (now - lastCall.current));
      }
    },
    [callback, delay]
  );
}
