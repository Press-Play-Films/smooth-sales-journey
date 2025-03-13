
/**
 * This utility provides cross-browser compatibility functions and polyfills
 * for various browser features.
 */

/**
 * Check if the browser supports the Intersection Observer API
 */
export const supportsIntersectionObserver = (): boolean => {
  return 'IntersectionObserver' in window;
};

/**
 * Check if the browser supports smooth scrolling
 */
export const supportsSmoothScroll = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style;
};

/**
 * Fallback for smooth scrolling for browsers that don't support it natively
 */
export const smoothScrollTo = (element: HTMLElement): void => {
  if (supportsSmoothScroll()) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Fallback for browsers without smooth scrolling
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // ms
    let start: number | null = null;
    
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      window.scrollTo(0, startPosition + distance * percentage);
      
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }
};

/**
 * Generate CSS that works across browsers including older versions
 */
export const getCrossBrowserCSS = (property: string, value: string): Record<string, string> => {
  const prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
  const result: Record<string, string> = {};
  
  prefixes.forEach(prefix => {
    result[`${prefix}${property}`] = value;
  });
  
  return result;
};

/**
 * Feature detection for email client rendering
 */
export const isEmailClient = (): boolean => {
  // Basic detection - this is a simplification
  return (
    window.navigator.userAgent.indexOf('Outlook') !== -1 ||
    window.navigator.userAgent.indexOf('Gmail') !== -1 ||
    window.navigator.userAgent.indexOf('Yahoo') !== -1 ||
    document.documentElement.className.indexOf('mail') !== -1
  );
};

/**
 * Apply email client specific styles if needed
 */
export const applyEmailClientStyles = (): void => {
  if (isEmailClient()) {
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

// Initialize compatibility helpers
export const initCompatibilityHelpers = (): void => {
  // Apply email client specific styles
  applyEmailClientStyles();
  
  // Add any other initialization logic as needed
};
