
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { debug, LogLevel } from './utils/debugUtils';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import QueryProvider from './components/providers/QueryProvider';
import RouteChangeTracker from './components/routing/RouteChangeTracker';
import AppRoutes from './components/routing/AppRoutes';
import SimpleErrorDebugger from './components/SimpleErrorDebugger';
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  useEffect(() => {
    debug('App component mounted', null, LogLevel.INFO);
    return () => {
      debug('App component unmounted', null, LogLevel.INFO);
    };
  }, []);

  // Always show the debugger for simplicity
  const showDebugger = true;

  return (
    <QueryProvider>
      <BrowserCompatibilityProvider>
        <AuthProvider>
          <BrowserRouter>
            <RouteChangeTracker />
            <Toaster position="top-right" />
            <AppRoutes />
            {showDebugger && <SimpleErrorDebugger />}
          </BrowserRouter>
        </AuthProvider>
      </BrowserCompatibilityProvider>
    </QueryProvider>
  );
};

export default App;
