
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from './components/providers/QueryProvider';
import BrowserCompatibilityProvider from './components/providers/BrowserCompatibilityProvider';
import AppRoutes from './components/routing/AppRoutes';
import RouteChangeTracker from './components/routing/RouteChangeTracker';

// Extremely simplified App component without complex initialization
const App = () => {
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
