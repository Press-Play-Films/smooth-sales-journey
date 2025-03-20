
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { debug, LogLevel, trackPerformance } from '@/utils/debugUtils';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (!location || !location.pathname) {
      return; // Guard against null locations
    }
    
    try {
      const perfTracker = trackPerformance(`Route change to ${location.pathname}`);
      debug(`Route changed to: ${location.pathname}`, {
        search: location.search,
        hash: location.hash,
        state: location.state,
      }, LogLevel.INFO);
      
      // End performance tracking after component mount
      return () => {
        perfTracker?.end?.();
      };
    } catch (error) {
      console.error("Error in route tracking:", error);
    }
  }, [location]);
  
  return null;
};

export default RouteChangeTracker;
