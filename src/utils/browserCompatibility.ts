
/**
 * This utility provides cross-browser compatibility functions and polyfills
 * for various browser features.
 */

// Core detection functions
export const detectBrowser = (): {
  name: string;
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isIE: boolean;
  isOpera: boolean;
} => {
  const userAgent = navigator.userAgent;
  
  return {
    name: getBrowserName(userAgent),
    isChrome: /chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent),
    isSafari: /safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent),
    isFirefox: /firefox|fxios/i.test(userAgent),
    isEdge: /edg/i.test(userAgent),
    isIE: /trident|msie/i.test(userAgent),
    isOpera: /opr\//i.test(userAgent)
  };
};

export const detectEmailClient = (): {
  isEmailClient: boolean;
  name: string | null;
} => {
  const userAgent = navigator.userAgent;
  let emailClientName = null;
  
  if (userAgent.indexOf('Outlook') !== -1) {
    emailClientName = 'Outlook';
  } else if (userAgent.indexOf('Gmail') !== -1) {
    emailClientName = 'Gmail';
  } else if (userAgent.indexOf('Yahoo') !== -1) {
    emailClientName = 'Yahoo';
  } else if (document.documentElement.className.indexOf('mail') !== -1) {
    emailClientName = 'Generic Mail Client';
  }
  
  return {
    isEmailClient: emailClientName !== null,
    name: emailClientName
  };
};

// Feature detection functions
export const supportsIntersectionObserver = (): boolean => {
  return 'IntersectionObserver' in window;
};

export const supportsSmoothScroll = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style;
};

// Browser utilities
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

// Helper functions
function getBrowserName(userAgent: string): string {
  if (/edg/i.test(userAgent)) {
    return 'Edge';
  } else if (/chrome|chromium|crios/i.test(userAgent)) {
    return 'Chrome';
  } else if (/firefox|fxios/i.test(userAgent)) {
    return 'Firefox';
  } else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
    return 'Safari';
  } else if (/trident|msie/i.test(userAgent)) {
    return 'Internet Explorer';
  } else if (/opr\//i.test(userAgent)) {
    return 'Opera';
  } else {
    return 'Unknown';
  }
}

// Add browser-specific classes to document root
export const addBrowserClasses = (): void => {
  const { isChrome, isSafari, isFirefox, isEdge, isIE } = detectBrowser();
  
  if (isChrome) document.documentElement.classList.add('browser-chrome');
  if (isSafari) document.documentElement.classList.add('browser-safari');
  if (isFirefox) document.documentElement.classList.add('browser-firefox');
  if (isEdge) document.documentElement.classList.add('browser-edge');
  if (isIE) document.documentElement.classList.add('browser-ie');
};

// Apply email client specific styles
export const applyEmailClientStyles = (): void => {
  const { isEmailClient, name } = detectEmailClient();
  
  if (isEmailClient) {
    document.documentElement.classList.add('email-client');
    if (name) document.documentElement.classList.add(`email-${name.toLowerCase()}`);
    
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
      
      /* Fix for Outlook */
      .email-outlook .mso-fix {
        mso-line-height-rule: exactly;
      }
    `;
    document.head.appendChild(emailStyleElement);
  }
};

// Initialize all browser compatibility features
export const initCompatibilityHelpers = (): void => {
  addBrowserClasses();
  applyEmailClientStyles();
  
  // Console log for demonstration purposes
  console.log('Browser compatibility helpers initialized');
  console.log('Browser:', detectBrowser().name);
  console.log('Email client:', detectEmailClient().isEmailClient ? detectEmailClient().name : 'Not an email client');
};
