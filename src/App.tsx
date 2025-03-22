
import React, { useEffect, useState, StrictMode } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { debug, LogLevel } from './utils/debugUtils';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import QueryProvider from './components/providers/QueryProvider';
import RouteChangeTracker from './components/routing/RouteChangeTracker';
import AppRoutes from './components/routing/AppRoutes';

// Simplified initialization pattern without unnecessary timers
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mountError, setMountError] = useState<Error | null>(null);

  useEffect(() => {
    // Simple initialization with try/catch
    try {
      debug('App component mounted', null, LogLevel.INFO);
      
      // Immediately set initialized without delay
      setIsLoading(false);
      
      return () => {
        debug('App component unmounted', null, LogLevel.INFO);
      };
    } catch (error) {
      debug('Error during App initialization', { error }, LogLevel.ERROR);
      setMountError(error instanceof Error ? error : new Error('Unknown initialization error'));
    }
  }, []);

  // Handle initialization errors
  if (mountError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Initialization Error</h2>
          <p className="text-gray-700 mb-4">{mountError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-brio-navy text-white rounded hover:bg-blue-700 transition-colors"
          >
            Restart Application
          </button>
        </div>
      </div>
    );
  }

  // Simple loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  // Render the full application once initialized - strip to bare essentials for preview
  return (
    <StrictMode>
      <QueryProvider>
        <BrowserCompatibilityProvider>
          <BrowserRouter>
            <RouteChangeTracker />
            <Toaster position="top-right" />
            <AppRoutes />
          </BrowserRouter>
        </BrowserCompatibilityProvider>
      </QueryProvider>
    </StrictMode>
  );
};

export default App;
