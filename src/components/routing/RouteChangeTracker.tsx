
import React, { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';
import { collectError } from '@/utils/errorCollector';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    const perfTracker = trackPerformance(`Route change to ${location.pathname}`);
    
    debug(`Route changed to: ${location.pathname}`, {
      search: location.search,
      hash: location.hash,
      state: location.state,
      navigationType,
      timestamp: new Date().toISOString()
    }, LogLevel.INFO);
    
    // Track failed route transitions
    const timeout = setTimeout(() => {
      if (document.readyState !== 'complete') {
        collectError(
          `Route transition potentially stalled: ${location.pathname}`,
          'RouteChangeTracker',
          { 
            readyState: document.readyState,
            navigationType
          }
        );
      }
    }, 5000);
    
    // End performance tracking after component mount
    return () => {
      perfTracker.end();
      clearTimeout(timeout);
    };
  }, [location, navigationType]);
  
  // Monitor history state changes
  useEffect(() => {
    const handlePopState = () => {
      debug('History state changed', {
        currentPathname: window.location.pathname,
        state: history.state
      }, LogLevel.DEBUG);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  return null;
};

export default RouteChangeTracker;
