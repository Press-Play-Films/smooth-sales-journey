
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { debug, LogLevel } from '@/utils/debugUtils';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  useEffect(() => {
    // Guard against React strict mode double rendering or stale closures
    if (!isMounted.current) return;
    
    // Basic guard against null location
    if (!location) {
      debug('RouteTracker: Location is null or undefined', null, LogLevel.WARN);
      return;
    }
    
    try {
      // Create a safe copy of location data (primitive values only)
      const safeLocationData = {
        pathname: typeof location.pathname === 'string' ? location.pathname : '/',
        search: typeof location.search === 'string' ? location.search : '',
        hash: typeof location.hash === 'string' ? location.hash : '',
        hasState: location.state !== null && location.state !== undefined
      };
      
      debug(`Route changed to: ${safeLocationData.pathname}`, safeLocationData, LogLevel.INFO);
    } catch (error) {
      // Safely log any errors without breaking the app
      try {
        debug("Error in route tracking:", { 
          error: error instanceof Error ? error.message : 'Unknown error',
          path: location?.pathname || 'unknown'
        }, LogLevel.ERROR);
      } catch (e) {
        // Silently fail if even debug logging fails
      }
    }
  }, [location]);
  
  return null;
};

export default RouteChangeTracker;
