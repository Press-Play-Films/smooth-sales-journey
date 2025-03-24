
import { debug, LogLevel } from '@/utils/debugUtils';
import { getBrowserInfo } from './detection';
import { toast } from 'sonner';

/**
 * Checks browser compatibility and returns any detected issues
 */
export const checkBrowserCompatibility = () => {
  try {
    // Get browser information
    const browserInfo = getBrowserInfo();
    debug('Browser detected', browserInfo, LogLevel.INFO);
    
    // Check if the browser is supported
    const { name, version } = browserInfo;
    
    // Internet Explorer is not supported
    if (name === 'Internet Explorer') {
      toast.error('Browser compatibility issue detected', {
        description: 'Internet Explorer is not supported. Please use a modern browser.'
      });
      return 'Internet Explorer is not supported. Please use a modern browser like Chrome, Firefox, Edge, or Safari.';
    }
    
    // Check for outdated browsers and show warnings
    if (name === 'Chrome' && parseInt(version) < 70) {
      toast.warning('Browser compatibility warning', {
        description: 'Your Chrome version is outdated. Please update for the best experience.'
      });
      return 'Your Chrome version is outdated. Please update to the latest version for the best experience.';
    } else if (name === 'Firefox' && parseInt(version) < 65) {
      toast.warning('Browser compatibility warning', {
        description: 'Your Firefox version is outdated. Please update for the best experience.'
      });
      return 'Your Firefox version is outdated. Please update to the latest version for the best experience.';
    } else if (name === 'Safari' && parseInt(version) < 12) {
      toast.warning('Browser compatibility warning', {
        description: 'Your Safari version is outdated. Please update for the best experience.'
      });
      return 'Your Safari version is outdated. Please update to the latest version for the best experience.';
    }
    
    // Check for required APIs
    if (!window.requestAnimationFrame) {
      debug('requestAnimationFrame not supported', null, LogLevel.WARN);
      toast.error('Browser compatibility issue detected', {
        description: 'Your browser does not support requestAnimationFrame, which is required for animations.'
      });
      return 'Your browser does not support important features required for this application.';
    }
    
    if (!window.localStorage) {
      debug('localStorage not supported', null, LogLevel.WARN);
      toast.error('Browser compatibility issue detected', {
        description: 'Your browser does not support localStorage, which is required for saving preferences.'
      });
      return 'Your browser does not support important features required for this application.';
    }
    
    return null;
  } catch (error) {
    debug('Error checking browser compatibility', error, LogLevel.ERROR);
    return 'An error occurred while checking browser compatibility.';
  }
};

/**
 * Applies email client specific styles if detected
 */
export const applyEmailClientStyles = () => {
  const isEmailClient = window.navigator.userAgent.indexOf('Outlook') !== -1 || 
    window.navigator.userAgent.indexOf('Gmail') !== -1 ||
    window.navigator.userAgent.indexOf('Yahoo') !== -1 ||
    document.documentElement.className.indexOf('mail') !== -1;
  
  if (isEmailClient) {
    const emailStyleElement = document.createElement('style');
    emailStyleElement.innerHTML = `
      /* Email client specific overrides */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      
      img {
        -ms-interpolation-mode: bicubic;
      }
    `;
    document.head.appendChild(emailStyleElement);
  }
};

/**
 * Applies browser-specific CSS fixes
 */
export const applyCrossBrowserSupport = () => {
  const { name } = getBrowserInfo();
  document.documentElement.classList.add(`browser-${name.toLowerCase()}`);
  
  // Add Safari flex gap support
  if (name === 'Safari') {
    const safariStyleFix = document.createElement('style');
    safariStyleFix.innerHTML = `
      .safari .gap-fix {
        margin-right: var(--gap-size, 1rem);
        margin-bottom: var(--gap-size, 1rem);
      }
    `;
    document.head.appendChild(safariStyleFix);
  }
  
  // Add general browser polyfills
  const generalFixes = document.createElement('style');
  generalFixes.innerHTML = `
    /* Fix for Firefox rendering issues */
    @-moz-document url-prefix() {
      .firefox-fix {
        display: inline-block;
      }
    }
    
    /* Fix for Safari's incomplete resize observer support */
    @supports (-webkit-touch-callout: none) {
      .safari-resize-fix {
        height: 100% !important;
        max-height: 100vh !important;
      }
    }
  `;
  document.head.appendChild(generalFixes);
};

/**
 * Adds polyfills for older browsers if needed
 */
export const addPolyfills = () => {
  // Add Promise polyfill for older browsers
  if (typeof Promise === 'undefined') {
    debug('Promise not supported, loading polyfill', null, LogLevel.WARN);
    // Note: In a real app, you would load a polyfill here
  }
  
  // Add fetch polyfill for older browsers
  if (typeof fetch === 'undefined') {
    debug('fetch not supported, loading polyfill', null, LogLevel.WARN);
    // Note: In a real app, you would load a polyfill here
  }
};
