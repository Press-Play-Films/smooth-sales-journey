
/**
 * Core browser utilities for detection and environment checks
 */

// Check if code is running in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Execute a function only if in browser environment
export const runInBrowser = (fn: () => void): void => {
  if (isBrowser) {
    fn();
  }
};
