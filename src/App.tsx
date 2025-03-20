
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { debug, LogLevel, initQueryLogging } from './utils/debugUtils';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import QueryProvider from './components/providers/QueryProvider';
import RouteChangeTracker from './components/routing/RouteChangeTracker';
import AppRoutes from './components/routing/AppRoutes';

// Initialize query logging
initQueryLogging();

const App = () => {
  useEffect(() => {
    debug('App component mounted', null, LogLevel.INFO);
    return () => {
      debug('App component unmounted', null, LogLevel.INFO);
    };
  }, []);

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
