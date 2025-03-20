
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Additional guard against null or invalid locations
    if (!location || typeof location !== 'object') {
      debug('RouteTracker: Invalid location object', null, LogLevel.WARN);
      return;
    }
    
    // Guard against incomplete location properties
    if (typeof location.pathname !== 'string') {
      debug('RouteTracker: Missing pathname in location', { location }, LogLevel.WARN);
      return;
    }
    
    try {
      const perfTracker = trackPerformance(`Route change to ${location.pathname}`);
      
      // Create a safe, non-circular copy of location data
      const safeLocationData = {
        pathname: location.pathname || '/',
        search: typeof location.search === 'string' ? location.search : '',
        hash: typeof location.hash === 'string' ? location.hash : '',
        hasState: location.state !== null && location.state !== undefined
      };
      
      debug(`Route changed to: ${safeLocationData.pathname}`, safeLocationData, LogLevel.INFO);
      
      // End performance tracking after component mount
      return () => {
        try {
          perfTracker?.end?.();
        } catch (error) {
          // Silently handle any performance tracking errors
          debug('Performance tracker error', { error }, LogLevel.DEBUG);
        }
      };
    } catch (error) {
      debug("Error in route tracking:", { error, location: location?.pathname }, LogLevel.ERROR);
    }
  }, [location]);
  
  return null;
};

export default RouteChangeTracker;
