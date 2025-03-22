
import React, { useEffect } from 'react';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';

const LoadingFallback: React.FC = () => {
  useEffect(() => {
    debug('Suspense fallback rendered - component is loading', null, LogLevel.DEBUG);
    const perfTracker = trackPerformance('Component lazy loading');
    
    return () => {
      const duration = perfTracker.end();
      debug('Component finished loading', { durationMs: duration }, LogLevel.DEBUG);
    };
  }, []);
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brio-navy"></div>
        <p className="mt-4 text-brio-navy font-medium">Loading Brio Sales Management...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
