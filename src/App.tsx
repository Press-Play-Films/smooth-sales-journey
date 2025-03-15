
import React, { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const PresentationsPage = lazy(() => import("./pages/PresentationsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ClientView = lazy(() => import("./pages/ClientView"));
const TeamView = lazy(() => import("./pages/TeamView"));
const ExecutiveDashboard = lazy(() => import("./pages/ExecutiveDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Browser compatibility component
const BrowserCompatibilityProvider = ({ children }: {children: React.ReactNode}) => {
  React.useEffect(() => {
    // Initialize browser compatibility features
    const applyEmailClientStyles = () => {
      const isEmailClient = window.navigator.userAgent.indexOf('Outlook') !== -1 || 
        window.navigator.userAgent.indexOf('Gmail') !== -1 ||
        window.navigator.userAgent.indexOf('Yahoo') !== -1 ||
        document.documentElement.className.indexOf('mail') !== -1;
      
      if (isEmailClient) {
        const emailStyleElement = document.createElement('style');
        emailStyleElement.innerHTML = `
          /* Email client specific overrides */
          body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          
          table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
          
          img {
            -ms-interpolation-mode: bicubic;
          }
        `;
        document.head.appendChild(emailStyleElement);
      }
    };
    
    // Apply any browser-specific polyfills or styles
    const applyCrossBrowserSupport = () => {
      // Add Safari flex gap support
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        document.documentElement.classList.add('safari');
        const safariStyleFix = document.createElement('style');
        safariStyleFix.innerHTML = `
          .safari .gap-fix {
            margin-right: var(--gap-size, 1rem);
            margin-bottom: var(--gap-size, 1rem);
          }
        `;
        document.head.appendChild(safariStyleFix);
      }
      
      // Add Firefox specific styles if needed
      if (navigator.userAgent.indexOf("Firefox") > -1) {
        document.documentElement.classList.add('firefox');
      }
    };
    
    applyEmailClientStyles();
    applyCrossBrowserSupport();
  }, []);
  
  return <>{children}</>;
};

function App() {
  // Create a client instance inside the function component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <BrowserCompatibilityProvider>
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
              <Toaster />
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
          </BrowserCompatibilityProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
