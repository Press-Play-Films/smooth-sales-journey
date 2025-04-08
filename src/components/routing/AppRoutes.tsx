
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

const RequireAuth = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
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
