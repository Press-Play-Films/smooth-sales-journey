
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BrowserPreview from '@/components/browser/BrowserPreview';
import { webAppConfig } from '@/config/webAppConfig';

const Index: React.FC = () => {
  const [welcomeDismissed, setWelcomeDismissed] = React.useState(false);
  
  // Show welcome toast for demo purposes
  React.useEffect(() => {
    if (webAppConfig.demoMode) {
      toast.success("🌐 CRM Web Application Demo", {
        description: "This is a fully functional web application with simulated backend",
      });
    }
    
    return () => {};
  }, []);

  const dismissWelcome = () => {
    setWelcomeDismissed(true);
  };

  return (
    <Layout>
      {/* Demo Web App Header */}
      {webAppConfig.demoMode && !welcomeDismissed && (
        <Card className="mb-6 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-800">🌐 CRM Web Application Demo</h3>
                <p className="text-sm text-blue-600 mt-1">
                  This is a complete web application with frontend React components and simulated backend API. 
                  Features include real-time updates, client engagement tracking, sales management, and browser compatibility tools.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Frontend: React + TypeScript</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Backend: Simulated API</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Real-time: WebSocket</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Database: Demo Data</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={dismissWelcome}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-8">
        {/* Browser Compatibility Tool */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Browser Compatibility Tool</h2>
          <p className="text-gray-700 mb-6">
            This interactive tool helps you identify your browser capabilities and ensure compatibility with our web application.
            Check if your browser supports all the features required for optimal performance.
          </p>
          
          <BrowserPreview />
        </section>
        
        {/* Main Dashboard */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">CRM Dashboard</h2>
            {webAppConfig.demoMode && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Demo</span>
              </div>
            )}
          </div>
          <Dashboard />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
