
import React, { useEffect, useState } from 'react';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';
import { collectError } from '@/utils/errorCollector';

const LoadingFallback: React.FC = () => {
  const [loadStartTime] = useState(Date.now());
  const [hasTimedOut, setHasTimedOut] = useState(false);
  
  useEffect(() => {
    debug('Suspense fallback rendered - component is loading', { 
      timestamp: new Date().toISOString(),
      pathname: window.location.pathname
    }, LogLevel.DEBUG);
    
    const perfTracker = trackPerformance('Component lazy loading');
    
    // Set a timeout to detect if loading takes too long
    const timeoutId = setTimeout(() => {
      const timeElapsed = Date.now() - loadStartTime;
      setHasTimedOut(true);
      collectError(
        `Component loading timed out after ${timeElapsed}ms`,
        'LoadingFallback',
        { timeElapsed, pathname: window.location.pathname }
      );
      debug('Component loading timeout', { timeElapsed }, LogLevel.WARN);
    }, 10000); // 10 seconds timeout
    
    return () => {
      const duration = perfTracker.end();
      debug('Component finished loading', { 
        durationMs: duration, 
        pathname: window.location.pathname 
      }, LogLevel.DEBUG);
      clearTimeout(timeoutId);
    };
  }, [loadStartTime]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brio-navy"></div>
        <p className="mt-4 text-brio-navy font-medium">Loading Brio Sales Management...</p>
        
        {hasTimedOut && (
          <div className="mt-4 text-red-500 text-sm">
            <p>Loading is taking longer than expected.</p>
            <button 
              onClick={() => window.location.reload()}
              className="underline mt-2"
            >
              Reload page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingFallback;
