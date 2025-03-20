
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Guard against null locations or incomplete initialization
    if (!location || !location.pathname) {
      debug('Route tracker received invalid location', { location }, LogLevel.WARN);
      return;
    }
    
    try {
      const perfTracker = trackPerformance(`Route change to ${location.pathname}`);
      
      // Create a safe copy of location data for logging
      const locationData = {
        pathname: location.pathname,
        search: location.search || '',
        hash: location.hash || '',
        // Don't log potentially circular state object
        hasState: location.state !== null && location.state !== undefined
      };
      
      debug(`Route changed to: ${location.pathname}`, locationData, LogLevel.INFO);
      
      // End performance tracking after component mount
      return () => {
        try {
          perfTracker?.end?.();
        } catch (error) {
          // Silently handle any performance tracking errors
        }
      };
    } catch (error) {
      debug("Error in route tracking:", error, LogLevel.ERROR);
    }
  }, [location]);
  
  return null;
};

export default RouteChangeTracker;
