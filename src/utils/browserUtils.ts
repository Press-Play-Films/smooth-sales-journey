
/**
 * Utility functions for browser detection and environment checks
 */

// Check if code is running in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Execute a function only if in browser environment
export const runInBrowser = (fn: () => void): void => {
  if (isBrowser) {
    fn();
  }
};

// Get current browser information (only works in browser)
export const getBrowserInfo = () => {
  if (!isBrowser) {
    return {
      name: 'Server',
      version: 'N/A',
      isMobile: false,
      isDesktop: false,
      isIOS: false,
      isAndroid: false,
    };
  }

  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  
  // Detect browser name and version
  if (/firefox|fxios/i.test(userAgent)) {
    browserName = 'Firefox';
    browserVersion = userAgent.match(/(?:firefox|fxios)[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
    browserName = 'Chrome';
    browserVersion = userAgent.match(/(?:chrome|chromium|crios)[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
    browserName = 'Safari';
    browserVersion = userAgent.match(/version[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/edg/i.test(userAgent)) {
    browserName = 'Edge';
    browserVersion = userAgent.match(/edg[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/opr\//i.test(userAgent)) {
    browserName = 'Opera';
    browserVersion = userAgent.match(/opr[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/trident/i.test(userAgent)) {
    browserName = 'Internet Explorer';
    browserVersion = userAgent.match(/trident[ \/](\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  }
  
  // Check if mobile or desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  return {
    name: browserName,
    version: browserVersion,
    isMobile,
    isDesktop: !isMobile,
    isIOS: /iPhone|iPad|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    userAgent
  };
};

// Safe localStorage wrapper with fallbacks
export const safeStorage = {
  getItem: (key: string, defaultValue: string = ''): string => {
    if (!isBrowser) return defaultValue;
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return defaultValue;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (!isBrowser) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (!isBrowser) return false;
    try {
      localStorage.setItem(key, '');
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing localStorage item:', e);
      return false;
    }
  }
};

// Example usage in conditional browser code:
/*
import { isBrowser, getBrowserInfo } from './browserUtils';

// Safely use browser-only code
if (isBrowser) {
  // Browser-only code here
  const browserInfo = getBrowserInfo();
  console.log('Running in:', browserInfo.name, browserInfo.version);
}
*/
