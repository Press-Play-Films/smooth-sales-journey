
import { LogLevel, debugConfig } from './types';

// Store original console methods immediately
const originalConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  debug: console.debug.bind(console)
};

// Simple logging function with safeguards
export const debug = (
  message: string, 
  data?: any, 
  level: LogLevel = LogLevel.INFO
) => {
  try {
    // Exit early if debugging is disabled
    if (!debugConfig.enabled) return;
    
    const timestamp = new Date().toISOString();
    const prefix = `[Brio:${level.toUpperCase()}][${timestamp}]`;
    
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
    // Fallback if something goes wrong with logging
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
