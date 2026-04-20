// src/hooks/useDebounce.js
// Delays updating a value until the user stops typing
// Demonstrates: useRef + useEffect pattern

import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of `value` that only updates
 * after `delay` milliseconds of no changes.
 * @param {any} value
 * @param {number} delay - ms to wait (default 400)
 */
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel the timer if value changes before delay completes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
