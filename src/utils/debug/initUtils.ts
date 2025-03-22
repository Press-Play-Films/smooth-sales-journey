
import { debug, safeOperation } from './core';
import { LogLevel, debugConfig } from './types';
import { isDebugMode } from './urlUtils';

// Tracking initialization status
let initialized = false;
let consolePatched = false;

// Initialize query logging
export const initQueryLogging = () => {
  debug('Initializing query logging', null, LogLevel.INFO);
};

// Initialize all debug utilities
export const initDebugUtils = () => {
  if (initialized) {
    debug('Debug utilities already initialized', null, LogLevel.WARN);
    return;
  }
  
  debug('Initializing debug utilities', { 
    level: debugConfig.logLevel 
  }, LogLevel.INFO);
  
  initialized = true;
};

// Initialize error handling
export const initGlobalErrorHandling = () => {
  if (!debugConfig.enabled) return;
  
  debug('Setting up global error handlers', null, LogLevel.INFO);
  
  // Set up window error handler
  window.addEventListener('error', (event) => {
    debug('Uncaught error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    }, LogLevel.ERROR);
  });
  
  // Set up promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    debug('Unhandled promise rejection', {
      reason: event.reason
    }, LogLevel.ERROR);
  });
  
  // Handle React render errors
  if (!consolePatched) {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      // Check for React-specific errors
      const errorText = args.join(' ');
      if (
        errorText.includes('React will try to recreate this component tree') ||
        errorText.includes('Consider adding an error boundary')
      ) {
        debug('React rendering error detected', {
          error: args[0]
        }, LogLevel.ERROR);
      }
      
      // Call original
      originalConsoleError.apply(console, args);
    };
    
    consolePatched = true;
  }
};

// Set up network request monitoring
export const initNetworkMonitoring = () => {
  if (!debugConfig.enabled || !debugConfig.logNetworkRequests) return;
  
  debug('Setting up network monitoring', null, LogLevel.INFO);
  
  // Use a more reliable approach for intercepting fetch
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const startTime = performance.now();
    try {
      const response = await originalFetch(...args);
      
      const endTime = performance.now();
      const url = typeof args[0] === 'string' 
        ? args[0] 
        : args[0] instanceof Request 
          ? args[0].url 
          : String(args[0]);
      
      debug('Fetch completed', {
        url,
        status: response.status,
        duration: `${(endTime - startTime).toFixed(2)}ms`,
        ok: response.ok
      }, response.ok ? LogLevel.DEBUG : LogLevel.WARN);
      
      return response;
    } catch (error) {
      const endTime = performance.now();
      const url = typeof args[0] === 'string' 
        ? args[0] 
        : args[0] instanceof Request 
          ? args[0].url 
          : String(args[0]);
          
      debug('Fetch failed', {
        url,
        error: error instanceof Error ? error.message : String(error),
        duration: `${(endTime - startTime).toFixed(2)}ms`
      }, LogLevel.ERROR);
      throw error;
    }
  };
};

// Get browser information for debugging
export const getBrowserInfo = () => {
  try {
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      onLine: navigator.onLine,
      debugMode: isDebugMode()
    };
    
    debug('Browser information', browserInfo, LogLevel.INFO);
    return browserInfo;
  } catch (error) {
    debug('Error collecting browser info', error, LogLevel.ERROR);
    return { error: error instanceof Error ? error.message : String(error) };
  }
};
