
// Debugging levels
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

// Debug configuration
export const debugConfig = {
  enabled: true,
  logLevel: LogLevel.DEBUG,
  logNetworkRequests: true,
  logComponentRenders: true,
  logRouteChanges: true,
  logStateChanges: true
};

// Store original console methods immediately before any potential overrides
// This prevents circular references when importing this module
const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: console.debug.bind(console)
};

// Flag to track initialization status
let initialized = false;
let consolePatched = false;

// Enhanced logging function with safeguards against recursive calls
export const debug = (
  message: string, 
  data?: any, 
  level: LogLevel = LogLevel.INFO
) => {
  // Exit early if debugging is disabled
  if (!debugConfig.enabled) return;
  
  try {
    const timestamp = new Date().toISOString();
    const prefix = `[Brio:${level.toUpperCase()}][${timestamp}]`;
    
    // Use the stored original console methods to avoid issues with overridden methods
    switch (level) {
      case LogLevel.ERROR:
        originalConsole.error(`${prefix} ${message}`, data ? data : '');
        break;
      case LogLevel.WARN:
        originalConsole.warn(`${prefix} ${message}`, data ? data : '');
        break;
      case LogLevel.DEBUG:
        originalConsole.debug(`${prefix} ${message}`, data ? data : '');
        break;
      case LogLevel.INFO:
      default:
        originalConsole.log(`${prefix} ${message}`, data ? data : '');
    }
  } catch (error) {
    // Last resort fallback if something goes wrong with logging
    try {
      originalConsole.error('Debug logging failed:', error);
    } catch {
      // Silently fail if all else fails
    }
  }
};

// Safe operation helper
const safeOperation = (fn: () => void) => {
  try {
    fn();
    return true;
  } catch (error) {
    try {
      debug('Operation failed', { error }, LogLevel.ERROR);
    } catch {
      // Silent fallback
    }
    return false;
  }
};

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
    
    consolePatched = true;
  });
};

// Initialize all debugging features
export const initDebugUtils = () => {
  if (initialized) return;
  
  safeOperation(() => {
    initGlobalErrorHandling();
    initNetworkMonitoring();
    getBrowserInfo();
    initialized = true;
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

// Performance tracking
export const trackPerformance = (operationName: string) => {
  let start: number;
  
  try {
    start = performance.now();
  } catch (error) {
    debug('Performance API not available', error, LogLevel.WARN);
    return { end: () => 0 };
  }
  
  return {
    end: () => {
      try {
        const end = performance.now();
        const duration = end - start;
        debug(`Performance: ${operationName} took ${duration.toFixed(2)}ms`, null, LogLevel.DEBUG);
        return duration;
      } catch (error) {
        debug('Performance tracking error', error, LogLevel.WARN);
        return 0;
      }
    }
  };
};

// Service worker debug helper
export const debugServiceWorker = () => {
  safeOperation(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        debug('Service Worker is ready', {
          scope: registration.scope,
          active: registration.active ? true : false
        });
      });
      
      navigator.serviceWorker.addEventListener('message', (event) => {
        debug('Service Worker message', event.data);
      });
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        debug('Service Worker controller changed');
      });
    } else {
      debug('Service Worker not supported', null, LogLevel.WARN);
    }
  });
};

// Create a debugging URL parameter helper
export const isDebugMode = () => {
  try {
    return window.location.search.includes('debug=true');
  } catch (error) {
    return false;
  }
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
