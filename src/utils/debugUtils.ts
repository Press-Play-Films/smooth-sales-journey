
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

// Enhanced logging function
export const debug = (
  message: string, 
  data?: any, 
  level: LogLevel = LogLevel.INFO
) => {
  if (!debugConfig.enabled) return;
  
  const timestamp = new Date().toISOString();
  const prefix = `[Brio:${level.toUpperCase()}][${timestamp}]`;
  
  switch (level) {
    case LogLevel.ERROR:
      console.error(`${prefix} ${message}`, data ? data : '');
      break;
    case LogLevel.WARN:
      console.warn(`${prefix} ${message}`, data ? data : '');
      break;
    case LogLevel.DEBUG:
      console.debug(`${prefix} ${message}`, data ? data : '');
      break;
    case LogLevel.INFO:
    default:
      console.log(`${prefix} ${message}`, data ? data : '');
  }
};

// Capture uncaught errors
export const initGlobalErrorHandling = () => {
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
};

// Network request monitoring
export const initNetworkMonitoring = () => {
  if (!debugConfig.logNetworkRequests) return;
  
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
};

// Performance tracking
export const trackPerformance = (operationName: string) => {
  const start = performance.now();
  return {
    end: () => {
      const end = performance.now();
      const duration = end - start;
      debug(`Performance: ${operationName} took ${duration.toFixed(2)}ms`, null, LogLevel.DEBUG);
      return duration;
    }
  };
};

// Service worker debug helper
export const debugServiceWorker = () => {
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
};

// Create a debugging URL parameter helper
export const isDebugMode = () => {
  return window.location.search.includes('debug=true');
};

// Get detailed browser info for debugging
export const getBrowserInfo = () => {
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
};
