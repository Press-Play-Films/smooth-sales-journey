
import { debug, safeOperation } from './core';
import { LogLevel, initialized, consolePatched } from './types';

// Initialize console patching for React Query safely
export const initQueryLogging = () => {
  // Prevent double initialization
  if (consolePatched) return;

  safeOperation(() => {
    // Store original methods again to ensure we have the current references
    const currentConsole = {
      error: console.error,
      warn: console.warn,
      log: console.log
    };

    // Override console methods to capture React Query logs
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('[TanStack Query]')) {
        debug(`Query Client: ${args[0]}`, args.slice(1), LogLevel.ERROR);
      }
      currentConsole.error(...args);
    };

    console.warn = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('[TanStack Query]')) {
        debug(`Query Client: ${args[0]}`, args.slice(1), LogLevel.WARN);
      }
      currentConsole.warn(...args);
    };

    console.log = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('[TanStack Query]')) {
        debug(`Query Client: ${args[0]}`, args.slice(1), LogLevel.DEBUG);
      }
      currentConsole.log(...args);
    };
    
    // Update the flag through module reference
    (consolePatched as boolean) = true;
  });
};

// Initialize all debugging features
export const initDebugUtils = () => {
  if (initialized) return;
  
  safeOperation(() => {
    initGlobalErrorHandling();
    initNetworkMonitoring();
    getBrowserInfo();
    (initialized as boolean) = true;
  });
};

// Capture uncaught errors
export const initGlobalErrorHandling = () => {
  safeOperation(() => {
    window.addEventListener('error', (event) => {
      debug(`Uncaught error: ${event.message}`, {
        error: event.error,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }, LogLevel.ERROR);
    });

    window.addEventListener('unhandledrejection', (event) => {
      debug('Unhandled Promise rejection', event.reason, LogLevel.ERROR);
    });
  });
};

// Network request monitoring
export const initNetworkMonitoring = () => {
  if (!debugConfig.logNetworkRequests) return;
  
  safeOperation(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const [resource, config] = args;
      debug(`Fetch request to: ${resource}`, { config }, LogLevel.INFO);
      
      try {
        const response = await originalFetch(resource, config);
        debug(`Fetch response from: ${resource}`, { 
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        }, LogLevel.DEBUG);
        return response;
      } catch (error) {
        debug(`Fetch error for: ${resource}`, error, LogLevel.ERROR);
        throw error;
      }
    };
  });
};

// Get detailed browser info for debugging
export const getBrowserInfo = () => {
  try {
    const browserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      screenSize: {
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    };
    
    debug('Browser information', browserInfo, LogLevel.DEBUG);
    return browserInfo;
  } catch (error) {
    debug('Failed to get browser info', error, LogLevel.WARN);
    return { error: 'Failed to get browser info' };
  }
};
