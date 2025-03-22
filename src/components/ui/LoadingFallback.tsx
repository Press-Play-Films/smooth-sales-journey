
import React, { useEffect, useRef } from 'react';
import { debug, LogLevel } from '@/utils/debug';

interface PerformanceTracker {
  startTime: number;
  end: () => number;
}

const LoadingFallback: React.FC = () => {
  const isMounted = useRef(true);
  
  useEffect(() => {
    let perfTracker: PerformanceTracker | null = null;
    
    try {
      debug('Suspense fallback rendered - component is loading', null, LogLevel.DEBUG);
      
      // Store performance tracking in a variable so we can safely clean it up
      perfTracker = {
        startTime: performance.now(),
        end: function() {
          const duration = performance.now() - this.startTime;
          return duration;
        }
      };
    } catch (error) {
      // Prevent any errors in debug from breaking the component
    }
    
    return () => {
      isMounted.current = false;
      
      // Only run cleanup logic if we have a performance tracker
      if (perfTracker) {
        try {
          const duration = perfTracker.end();
          if (isMounted.current) {
            debug('Component finished loading', { durationMs: duration }, LogLevel.DEBUG);
          }
        } catch (error) {
          // Silently handle any errors in performance tracking
        }
      }
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brio-navy"></div>
        <p className="mt-4 text-brio-navy font-medium">Loading content...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
