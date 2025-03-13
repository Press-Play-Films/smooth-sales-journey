
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initCompatibilityHelpers } from "@/utils/browserCompatibility";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const PresentationsPage = lazy(() => import("./pages/PresentationsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ClientView = lazy(() => import("./pages/ClientView"));
const TeamView = lazy(() => import("./pages/TeamView"));
const ExecutiveDashboard = lazy(() => import("./pages/ExecutiveDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
  useEffect(() => {
    // Initialize browser compatibility helpers
    initCompatibilityHelpers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense 
            fallback={
              <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brio-navy"></div>
                  <p className="mt-4 text-brio-navy font-medium">Loading Brio Sales Management...</p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/clients/:clientId" element={<ClientView />} />
              <Route path="/presentations" element={<PresentationsPage />} />
              <Route path="/team" element={<TeamView />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/executive" element={<ExecutiveDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
