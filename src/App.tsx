
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { debug, LogLevel } from './utils/debugUtils';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import QueryProvider from './components/providers/QueryProvider';
import RouteChangeTracker from './components/routing/RouteChangeTracker';
import AppRoutes from './components/routing/AppRoutes';

// Safer initialization pattern
const App = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Simple initialization with reduced complexity
    debug('App component mounted', null, LogLevel.INFO);
    setInitialized(true);
    
    return () => {
      debug('App component unmounted', null, LogLevel.INFO);
    };
  }, []);

  // Simple loading state
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryProvider>
      <BrowserCompatibilityProvider>
        <BrowserRouter>
          <RouteChangeTracker />
          <Toaster position="top-right" />
          <AppRoutes />
        </BrowserRouter>
      </BrowserCompatibilityProvider>
    </QueryProvider>
  );
};

export default App;
