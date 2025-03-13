
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const PresentationsPage = lazy(() => import("./pages/PresentationsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ClientView = lazy(() => import("./pages/ClientView"));
const TeamView = lazy(() => import("./pages/TeamView"));
const ExecutiveDashboard = lazy(() => import("./pages/ExecutiveDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
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

export default App;
