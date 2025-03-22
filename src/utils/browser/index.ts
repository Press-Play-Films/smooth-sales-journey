
/**
 * Browser utilities index file
 * Re-exports all browser utility functions from the separate modules
 */

export * from './core';
export * from './detection';
export * from './capabilities';
export * from './storage';
export * from './privacyMode';

// Example usage in conditional browser code:
/*
import { isBrowser, getBrowserInfo } from './browser';

// Safely use browser-only code
if (isBrowser) {
  // Browser-only code here
  const browserInfo = getBrowserInfo();
  console.log('Running in:', browserInfo.name, browserInfo.version);
}
*/
