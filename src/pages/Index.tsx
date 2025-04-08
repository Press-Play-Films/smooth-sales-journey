import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BrowserPreview from '@/components/browser/BrowserPreview';

const Index: React.FC = () => {
  const [welcomeDismissed, setWelcomeDismissed] = React.useState(false);
  const [demoMode] = React.useState(true);
  
  // Show welcome toast for demo purposes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Welcome to the Brio Sales Management demo!", {
        description: "This demonstration is optimized for all browsers and email clients.",
        duration: 5000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate notifications for demo purposes
  React.useEffect(() => {
    if (demoMode) {
      const notifications = [
        { title: "New client registered", message: "The Andersons have scheduled a presentation" },
        { title: "Team meeting reminder", message: "Sales team meeting at 3:00 PM" },
        { title: "Performance milestone", message: "Congratulations! 90% client engagement today" }
      ];
      
      let notificationIndex = 0;
      const interval = setInterval(() => {
        const notification = notifications[notificationIndex % notifications.length];
        toast.info(notification.title, {
          description: notification.message,
          duration: 4000,
        });
        notificationIndex++;
        
        // Stop after cycling through all notifications once
        if (notificationIndex >= notifications.length) {
          clearInterval(interval);
        }
      }, 25000);
      
      return () => clearInterval(interval);
    }
  }, [demoMode]);

  const dismissWelcome = () => {
    setWelcomeDismissed(true);
  };

  return (
    <Layout>
      {!welcomeDismissed && (
        <Card className="mb-6 border-blue-100 bg-blue-50">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-800">Welcome to Brio Sales Management</h3>
                <p className="text-sm text-blue-600 mt-1">
                  This dashboard allows you to track presentations, manage clients, and monitor performance metrics.
                  All features are cross-browser compatible and optimized for your workflow.
                </p>
                <div className="mt-2 flex justify-end">
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
        {/* Feature Browser Compatibility Tool */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Browser Compatibility Tool</h2>
          <p className="text-gray-700 mb-6">
            This interactive tool helps you identify your browser capabilities and ensure compatibility with our application.
            Check if your browser supports all the features required for optimal performance.
          </p>
          
          {/* Browser preview component with improved visibility */}
          <BrowserPreview />
        </section>
        
        {/* Dashboard Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <Dashboard />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
