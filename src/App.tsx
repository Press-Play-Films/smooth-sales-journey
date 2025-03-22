
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { debug, LogLevel, initQueryLogging } from './utils/debugUtils';
import { initErrorCollection } from './utils/errorCollector';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import QueryProvider from './components/providers/QueryProvider';
import RouteChangeTracker from './components/routing/RouteChangeTracker';
import AppRoutes from './components/routing/AppRoutes';
import ErrorDebugger from './components/debug/ErrorDebugger';

// Initialize debugging utilities
initQueryLogging();
initErrorCollection();

const App = () => {
  useEffect(() => {
    debug('App component mounted', null, LogLevel.INFO);
    return () => {
      debug('App component unmounted', null, LogLevel.INFO);
    };
  }, []);

  // Determine if we should show the debugger
  const showDebugger = import.meta.env.DEV || 
                       window.location.search.includes('debug=true');

  return (
    <QueryProvider>
      <BrowserCompatibilityProvider>
        <BrowserRouter>
          <RouteChangeTracker />
          <Toaster position="top-right" />
          <AppRoutes />
          {showDebugger && <ErrorDebugger showOnLoad={false} />}
        </BrowserRouter>
      </BrowserCompatibilityProvider>
    </QueryProvider>
  );
};

export default App;
