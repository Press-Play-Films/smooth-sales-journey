
import React, { useEffect, useState } from 'react';
import { debug, LogLevel } from '@/utils/debugUtils';
import { isBrowser, getBrowserInfo } from '@/utils/browser';
import { toast } from 'sonner';

const BrowserCompatibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isCompatibilityChecked, setIsCompatibilityChecked] = useState(false);
  const [compatibilityIssue, setCompatibilityIssue] = useState<string | null>(null);

  useEffect(() => {
    if (!isBrowser) return;
    
    // Log browser information
    const browserInfo = getBrowserInfo();
    debug('Browser detected', browserInfo, LogLevel.INFO);
    
    // Check for browser compatibility issues
    const checkBrowserCompatibility = () => {
      try {
        // Check if the browser is supported
        const { name, version } = browserInfo;
        
        // Check for IE which is definitely not supported
        if (name === 'Internet Explorer') {
          setCompatibilityIssue('Internet Explorer is not supported. Please use a modern browser like Chrome, Firefox, Edge, or Safari.');
          toast.error('Browser compatibility issue detected', {
            description: 'Internet Explorer is not supported. Please use a modern browser.'
          });
          return false;
        }
        
        // Check for very old browsers
        if (name === 'Chrome' && parseInt(version) < 70) {
          setCompatibilityIssue('Your Chrome version is outdated. Please update to the latest version for the best experience.');
          toast.warning('Browser compatibility warning', {
            description: 'Your Chrome version is outdated. Please update for the best experience.'
          });
        } else if (name === 'Firefox' && parseInt(version) < 65) {
          setCompatibilityIssue('Your Firefox version is outdated. Please update to the latest version for the best experience.');
          toast.warning('Browser compatibility warning', {
            description: 'Your Firefox version is outdated. Please update for the best experience.'
          });
        } else if (name === 'Safari' && parseInt(version) < 12) {
          setCompatibilityIssue('Your Safari version is outdated. Please update to the latest version for the best experience.');
          toast.warning('Browser compatibility warning', {
            description: 'Your Safari version is outdated. Please update for the best experience.'
          });
        }
        
        // Check for required APIs
        if (!window.requestAnimationFrame) {
          debug('requestAnimationFrame not supported', null, LogLevel.WARN);
          toast.error('Browser compatibility issue detected', {
            description: 'Your browser does not support requestAnimationFrame, which is required for animations.'
          });
          return false;
        }
        
        if (!window.localStorage) {
          debug('localStorage not supported', null, LogLevel.WARN);
          toast.error('Browser compatibility issue detected', {
            description: 'Your browser does not support localStorage, which is required for saving preferences.'
          });
          return false;
        }
        
        return true;
      } catch (error) {
        debug('Error checking browser compatibility', error, LogLevel.ERROR);
        return false;
      }
    };
    
    // Initialize browser compatibility features
    const applyEmailClientStyles = () => {
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
    
    // Apply any browser-specific polyfills or styles
    const applyCrossBrowserSupport = () => {
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
    
    // Add polyfills for older browsers if needed
    const addPolyfills = () => {
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
    
    const isCompatible = checkBrowserCompatibility();
    if (isCompatible) {
      applyEmailClientStyles();
      applyCrossBrowserSupport();
      addPolyfills();
      debug('Browser compatibility checks passed', null, LogLevel.INFO);
    } else {
      debug('Browser compatibility checks failed', browserInfo, LogLevel.WARN);
    }
    
    setIsCompatibilityChecked(true);
  }, []);
  
  if (compatibilityIssue) {
    // Show a simple compatibility warning
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md p-6 bg-slate-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Browser Compatibility Issue</h2>
          <p className="mb-4">{compatibilityIssue}</p>
          <p className="text-sm opacity-80">You can continue anyway, but some features may not work correctly.</p>
          <button 
            onClick={() => setCompatibilityIssue(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default BrowserCompatibilityProvider;
