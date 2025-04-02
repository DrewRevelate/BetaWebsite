import { useState, useEffect, useRef } from 'react';

/**
 * Hook that throttles a value to reduce excessive re-renders
 * Perfect for mouse movement or scroll position values that change rapidly
 * 
 * @param value The value to throttle
 * @param delay The throttle delay in milliseconds
 * @returns The throttled value
 */
export function useThrottleValue<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdate = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = Date.now();
    
    // If enough time has passed since last update, update immediately
    if (now - lastUpdate.current >= delay) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      lastUpdate.current = now;
      setThrottledValue(value);
      return;
    }
    
    // Otherwise schedule an update
    if (timeoutRef.current === null) {
      timeoutRef.current = setTimeout(() => {
        lastUpdate.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, delay - (now - lastUpdate.current));
    }
  }, [value, delay]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return throttledValue;
}
