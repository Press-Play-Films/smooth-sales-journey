
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingFallback from '../ui/LoadingFallback';

// Lazy load page components
const Index = lazy(() => import("@/pages/Index"));
const ClientsPage = lazy(() => import("@/pages/ClientsPage"));
const PresentationsPage = lazy(() => import("@/pages/PresentationsPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ClientView = lazy(() => import("@/pages/ClientView"));
const TeamView = lazy(() => import("@/pages/TeamView"));
const ExecutiveDashboard = lazy(() => import("@/pages/ExecutiveDashboard"));
const DebugPage = lazy(() => import("@/pages/DebugPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AppRoutes: React.FC = () => {
  // Log current path to help with debugging
  console.log("Current path:", window.location.pathname);
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:clientId" element={<ClientView />} />
        <Route path="/presentations" element={<PresentationsPage />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/debug" element={<DebugPage />} />
        
        {/* Add explicit redirects for common issues */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/presentations/index.html" element={<Navigate to="/presentations" replace />} />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
