
import React, { useEffect } from 'react';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';

const LoadingFallback: React.FC = () => {
  useEffect(() => {
    try {
      debug('Suspense fallback rendered - component is loading', null, LogLevel.DEBUG);
      const perfTracker = trackPerformance('Component lazy loading');
      
      return () => {
        try {
          const duration = perfTracker.end();
          debug('Component finished loading', { durationMs: duration }, LogLevel.DEBUG);
        } catch (error) {
          // Silently handle any errors in performance tracking
        }
      };
    } catch (error) {
      // Prevent any errors in debug from breaking the component
    }
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
