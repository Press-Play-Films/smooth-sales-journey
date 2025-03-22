
import { LogLevel, debugConfig } from './types';

// Simple logging function with safeguards
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
  } catch (error) {
    // Fallback if logging fails
    try {
      console.error('Debug logging failed:', error);
    } catch {
      // Silent fallback if all else fails
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
