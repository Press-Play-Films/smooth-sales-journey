
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from './Header';
import Sidebar from './layout/Sidebar';
import MainContent from './layout/MainContent';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Simple role management (in a real app, this would come from authentication)
  const [userRole, setUserRole] = useState<'employee' | 'executive'>('employee');
  
  // Settings for resource-intensive features
  const [enableAnalysis, setEnableAnalysis] = useState<boolean>(() => {
    const savedSetting = localStorage.getItem('enableAnalysis');
    return savedSetting ? savedSetting === 'true' : true; // Default to enabled
  });
  
  // Get stored user role from localStorage if available
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'employee' || storedRole === 'executive') {
      setUserRole(storedRole);
    }
  }, []);
  
  // Toggle between employee and executive views
  const toggleUserRole = () => {
    const newRole = userRole === 'employee' ? 'executive' : 'employee';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };
  
  // Toggle video analysis feature
  const toggleAnalysis = () => {
    const newSetting = !enableAnalysis;
    setEnableAnalysis(newSetting);
    localStorage.setItem('enableAnalysis', newSetting.toString());
    
    // Broadcast setting change to components that need it
    window.dispatchEvent(new CustomEvent('analysisSettingChanged', { 
      detail: { enabled: newSetting } 
    }));
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        
        <div className="flex flex-1 w-full">
          <Sidebar userRole={userRole} />
          <MainContent>
            {/* Settings Panel for resource-intensive features */}
            <div className="bg-slate-50 p-2 mb-4 rounded-md flex items-center justify-end space-x-2">
              <Label htmlFor="analysis-toggle" className="text-xs text-gray-600">
                Video Analysis 
                <span className="hidden sm:inline"> (resource-intensive)</span>
              </Label>
              <Switch 
                id="analysis-toggle"
                checked={enableAnalysis}
                onCheckedChange={toggleAnalysis}
              />
            </div>
            
            {children}
          </MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
