
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Index from "@/pages/Index";

// Create a simple query client
const queryClient = new QueryClient();

// Extremely simplified App component for debugging
const App = () => {
  console.log("Rendering App component");
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
