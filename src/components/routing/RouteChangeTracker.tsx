
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { debug, LogLevel } from '@/utils/debug';

const RouteChangeTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (!location) return;
    
    try {
      const safeLocationData = {
        pathname: typeof location.pathname === 'string' ? location.pathname : '/',
        search: typeof location.search === 'string' ? location.search : '',
        hash: typeof location.hash === 'string' ? location.hash : '',
        hasState: location.state !== null && location.state !== undefined
      };
      
      debug(`Route changed to: ${safeLocationData.pathname}`, safeLocationData, LogLevel.INFO);
    } catch (error) {
      console.error("Error in route tracking:", error);
    }
  }, [location]);
  
  return null;
};

export default RouteChangeTracker;
