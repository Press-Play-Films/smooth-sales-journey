/**
 * Browser compatibility utilities for ensuring app works across browsers
 */
import { isBrowser } from './core';
import { getBrowserInfo } from './detection';

// Check if browser has any critical compatibility issues
export const checkBrowserCompatibility = (): string | null => {
  if (!isBrowser) return null;
  
  try {
    const browserInfo = getBrowserInfo();
    const criticalIssues = [];
    
    // Check for very old Internet Explorer
    if (browserInfo.name === 'Internet Explorer' && 
        parseInt(browserInfo.version, 10) < 11) {
      criticalIssues.push("Internet Explorer versions below 11 are not supported.");
    }
    
    // Check for other very old browsers
    if (browserInfo.name === 'Safari' && 
        parseInt(browserInfo.version, 10) < 10) {
      criticalIssues.push("Safari versions below 10 are not fully supported.");
    }
    
    // Return combined issues or null
    return criticalIssues.length > 0 ? criticalIssues.join(" ") : null;
  } catch (error) {
    console.error("Error checking browser compatibility:", error);
    return null; // Don't block access if detection fails
  }
};

// Apply email client specific styles if needed
export const applyEmailClientStyles = (): void => {
  if (!isBrowser) return;
  
  try {
    // This is just a placeholder - in real app would detect email clients
    // and apply specific styles/workarounds
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Example: Apply Microsoft Outlook specific fixes
    if (userAgent.includes('msie') || userAgent.includes('trident')) {
      // Add a class to the body for Outlook-specific styles
      document.body.classList.add('email-client-outlook');
    }
  } catch (error) {
    console.error("Error applying email client styles:", error);
  }
};

// Apply fixes for cross-browser compatibility
export const applyCrossBrowserSupport = (): void => {
  if (!isBrowser) return;
  
  try {
    const browserInfo = getBrowserInfo();
    
    // Apply iOS specific styles
    if (browserInfo.isIOS) {
      // Fix for iOS input zooming issue
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=1');
      }
    }
    
    // Fix for some older Firefox specifics
    if (browserInfo.name === 'Firefox') {
      document.documentElement.classList.add('firefox-browser');
    }
  } catch (error) {
    console.error("Error applying cross-browser support:", error);
  }
};

// Add polyfills for missing browser features if needed
export const addPolyfills = (): void => {
  if (!isBrowser) return;
  
  try {
    // Example: Add Promise polyfill for old browsers
    if (typeof Promise === 'undefined') {
      console.warn('Promise API not available, consider adding a polyfill');
    }
    
    // Other polyfills could be conditionally loaded here
  } catch (error) {
    console.error("Error adding polyfills:", error);
  }
};
