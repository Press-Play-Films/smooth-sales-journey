
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from './Header';
import Sidebar from './layout/Sidebar';
import MainContent from './layout/MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Simple role management (in a real app, this would come from authentication)
  const [userRole, setUserRole] = useState<'employee' | 'executive'>('employee');
  
  // Toggle between employee and executive views
  const toggleUserRole = () => {
    const newRole = userRole === 'employee' ? 'executive' : 'employee';
    setUserRole(newRole);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header userRole={userRole} toggleUserRole={toggleUserRole} />
        
        <div className="flex flex-1 w-full">
          <Sidebar userRole={userRole} />
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
