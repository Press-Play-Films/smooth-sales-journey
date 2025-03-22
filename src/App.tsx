
import React, { useState } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from './components/providers/QueryProvider';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import AppRoutes from './components/routing/AppRoutes';
import RouteChangeTracker from './components/routing/RouteChangeTracker';

// Simplified App component without complex initialization
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Use a simpler approach to initialization
  React.useEffect(() => {
    console.log('App component mounted');
    
    // Set loading to false after a small delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      console.log('App component unmounted');
    };
  }, []);

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

  // Render the full application once initialized
  return (
    <React.StrictMode>
      <QueryProvider>
        <BrowserCompatibilityProvider>
          <BrowserRouter>
            <RouteChangeTracker />
            <Toaster position="top-right" />
            <AppRoutes />
          </BrowserRouter>
        </BrowserCompatibilityProvider>
      </QueryProvider>
    </React.StrictMode>
  );
};

export default App;
