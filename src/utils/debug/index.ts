
// Re-export only the most basic functionality to prevent circular dependencies
import { LogLevel, debugConfig } from './types';
import { debug, safeOperation } from './core';

// Export main functionality
export { LogLevel, debugConfig, debug, safeOperation };

// Simple stub functions
export const initQueryLogging = () => console.log('Query logging initialized');
export const initDebugUtils = () => console.log('Debug utils initialized');
export const initGlobalErrorHandling = () => console.log('Global error handling initialized');
export const initNetworkMonitoring = () => console.log('Network monitoring initialized');
export const getBrowserInfo = () => ({ browser: 'unknown', version: 'unknown' });
export const trackPerformance = () => console.log('Performance tracking initialized');
export const debugServiceWorker = () => console.log('Service worker debugging initialized');
export const isDebugMode = () => false;

// Add better environment detection
export const getEnvironment = () => {
  try {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }
    
    if (hostname.includes('lovable.') || hostname.includes('lovableproject.com')) {
      return 'preview';
    }
    
    return 'production';
  } catch (e) {
    return 'unknown';
  }
};

// Check if current environment is production
export const isProduction = () => getEnvironment() === 'production';
