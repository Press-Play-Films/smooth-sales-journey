
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
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

const App = () => {
  console.log("Rendering App component");
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="app-container min-h-screen bg-background">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
