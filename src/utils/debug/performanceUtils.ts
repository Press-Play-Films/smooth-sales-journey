
import { debug, safeOperation } from './core';
import { LogLevel } from './types';

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
