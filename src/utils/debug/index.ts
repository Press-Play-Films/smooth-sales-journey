
// Simplified exports to prevent circular dependencies
export { LogLevel, debugConfig } from './types';
export { debug, safeOperation } from './core';

// Simple stub functions to satisfy imports elsewhere
export const initQueryLogging = () => {};
export const initDebugUtils = () => {};
export const initGlobalErrorHandling = () => {};
export const initNetworkMonitoring = () => {};
export const getBrowserInfo = () => ({});
export const trackPerformance = () => {};
export const debugServiceWorker = () => {};
export const isDebugMode = () => false;
