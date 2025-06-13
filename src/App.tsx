
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
import { webAppConfig, initializeWebApp } from './config/webAppConfig';
import { demoWebSocket } from './services/demoBackendService';

const App = () => {
  useEffect(() => {
    debug('Web Application starting', { 
      timestamp: new Date().toISOString(),
      demoMode: webAppConfig.demoMode 
    }, LogLevel.INFO);
    
    // Initialize web app specific settings
    initializeWebApp();
    
    // Connect demo WebSocket for real-time features
    if (webAppConfig.demoMode && webAppConfig.features.realTimeUpdates) {
      demoWebSocket.connect();
    }
    
    return () => {
      debug('Web Application unmounting', null, LogLevel.INFO);
      demoWebSocket.disconnect();
    };
  }, []);

  // Show debugger in demo mode
  const showDebugger = webAppConfig.demoMode;

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
