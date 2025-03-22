
// Re-export only the most basic functionality to prevent circular dependencies
export { LogLevel, debugConfig } from './types';
export { debug, safeOperation } from './core';

// Simple stub functions
export const initQueryLogging = () => console.log('Query logging initialized');
export const initDebugUtils = () => console.log('Debug utils initialized');
export const initGlobalErrorHandling = () => console.log('Global error handling initialized');
export const initNetworkMonitoring = () => console.log('Network monitoring initialized');
export const getBrowserInfo = () => ({ browser: 'unknown', version: 'unknown' });
export const trackPerformance = () => console.log('Performance tracking initialized');
export const debugServiceWorker = () => console.log('Service worker debugging initialized');
export const isDebugMode = () => false;
