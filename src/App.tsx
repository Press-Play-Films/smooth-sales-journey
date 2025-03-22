
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from './components/providers/QueryProvider';
import AppRoutes from './components/routing/AppRoutes';

// Simplified App component without complex initialization
const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRoutes />
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
