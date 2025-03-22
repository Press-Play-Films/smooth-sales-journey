
import React, { useEffect } from 'react';
import { debug, LogLevel } from '@/utils/debugUtils';
import { isBrowser, getBrowserInfo } from '@/utils/browserUtils';

const BrowserCompatibilityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  useEffect(() => {
    if (!isBrowser) return;
    
    // Log browser information
    const browserInfo = getBrowserInfo();
    debug('Browser detected', browserInfo, LogLevel.INFO);
    
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
    };
    
    applyEmailClientStyles();
    applyCrossBrowserSupport();
  }, []);
  
  return <>{children}</>;
};

export default BrowserCompatibilityProvider;
