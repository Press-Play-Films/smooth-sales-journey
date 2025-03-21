
import { LogLevel, debugConfig } from './types';

// Store original console methods immediately before any potential overrides
// This prevents circular references when importing this module
const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: console.debug.bind(console)
};

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
export const safeOperation = (fn: () => void) => {
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
