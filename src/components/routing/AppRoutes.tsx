
import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import ClientsPage from '@/pages/ClientsPage';
import PresentationsPage from '@/pages/PresentationsPage';
import ExecutiveDashboard from '@/pages/ExecutiveDashboard';
import TeamView from '@/pages/TeamView';
import AnalyticsPage from '@/pages/AnalyticsPage';
import DebugPage from '@/pages/DebugPage';
import ClientView from '@/pages/ClientView';
import NotFound from '@/pages/NotFound';
import AuthPage from '@/pages/AuthPage';
import { useAuth } from '@/contexts/AuthContext';

// This component is now just a passthrough without authentication checks
const BypassAuth = () => {
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* All routes are now public - bypassing auth check */}
      <Route element={<BypassAuth />}>
        <Route path="/" element={<Index />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/presentations" element={<PresentationsPage />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/client/:clientId" element={<ClientView />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
