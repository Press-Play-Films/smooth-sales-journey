
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppRoutes from "@/components/routing/AppRoutes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Detect if we're in a production environment where the base path might be different
const isProduction = 
  !window.location.hostname.includes('localhost') && 
  !window.location.hostname.includes('lovable.');

// Use HashRouter in production to avoid path issues, BrowserRouter in development
const Router = isProduction ? HashRouter : BrowserRouter;

const App = () => {
  console.log("Rendering App component", { isProduction });
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" />
        <div className="app-container min-h-screen bg-background">
          <AppRoutes />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
