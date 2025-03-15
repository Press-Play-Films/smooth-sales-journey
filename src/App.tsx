import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from "@/pages/Index";
import ClientView from "@/pages/ClientView";
import PresentationsPage from "@/pages/PresentationsPage";
import ClientsPage from "@/pages/ClientsPage";
import TeamView from "@/pages/TeamView";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import NotFound from "@/pages/NotFound";
import SalesforceCallback from "@/pages/SalesforceCallback";

function App() {
  return (
    <RouterProvider
      router={
        createBrowserRouter([
          {
            path: "/",
            element: <Index />,
          },
          {
            path: "/client/:clientId",
            element: <ClientView />,
          },
          {
            path: "/presentations",
            element: <PresentationsPage />,
          },
          {
            path: "/clients",
            element: <ClientsPage />,
          },
          {
            path: "/team",
            element: <TeamView />,
          },
          {
            path: "/analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "/executive",
            element: <ExecutiveDashboard />,
          },
          {
            // Add route for Salesforce auth callback
            path: "/auth/callback",
            element: <SalesforceCallback />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])
      }
    />
  );
}

export default App;
