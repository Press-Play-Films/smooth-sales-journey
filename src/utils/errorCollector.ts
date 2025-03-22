
import { debug, LogLevel } from './debugUtils';

// Store for collecting errors during app execution
interface ErrorEntry {
  timestamp: number;
  message: string;
  source: string;
  stack?: string;
  componentInfo?: string;
  additionalData?: any;
}

// Global error store
const errorStore: ErrorEntry[] = [];

// Add an error to the store
export const collectError = (
  message: string,
  source: string,
  additionalData?: any,
  stack?: string,
  componentInfo?: string
): void => {
  const errorEntry: ErrorEntry = {
    timestamp: Date.now(),
    message,
    source,
    stack,
    componentInfo,
    additionalData
  };

  errorStore.push(errorEntry);
  debug(`Error collected: ${message}`, errorEntry, LogLevel.ERROR);
};

// Get all collected errors
export const getCollectedErrors = (): ErrorEntry[] => {
  return [...errorStore];
};

// Clear error store
export const clearCollectedErrors = (): void => {
  errorStore.length = 0;
  debug('Error store cleared', null, LogLevel.INFO);
};

// Export error data in a format suitable for sharing
export const exportErrorReport = (): string => {
  const report = {
    timestamp: new Date().toISOString(),
    errors: errorStore,
    browserInfo: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language
    },
    appVersion: import.meta.env.VITE_APP_VERSION || 'unknown'
  };
  
  return JSON.stringify(report, null, 2);
};

// Initialize error listeners
export const initErrorCollection = (): void => {
  // Global error handler
  window.addEventListener('error', (event) => {
    collectError(
      event.message,
      'window.onerror',
      { filename: event.filename, lineno: event.lineno, colno: event.colno },
      event.error?.stack
    );
  });

  // Promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    collectError(
      event.reason?.message || 'Unhandled Promise Rejection',
      'unhandledrejection',
      event.reason,
      event.reason?.stack
    );
  });
};
