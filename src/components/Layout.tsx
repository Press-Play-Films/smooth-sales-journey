
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { toast } = useToast();
  
  // Active link helper
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        
        <div className="flex flex-1 w-full">
          {/* Sidebar Navigation */}
          <aside className="hidden md:flex flex-col w-64 bg-brio-navy text-white p-4 space-y-6">
            <div className="flex items-center justify-center p-4">
              <img 
                src="/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png" 
                alt="Brio Vacations" 
                className="h-16 object-contain"
              />
            </div>
            
            <nav className="flex-1 space-y-2">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive('/') 
                    ? 'bg-white/20 text-brio-teal' 
                    : 'hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/clients" 
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive('/clients') 
                    ? 'bg-white/20 text-brio-teal' 
                    : 'hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Clients</span>
              </Link>
              
              <Link 
                to="/presentations" 
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive('/presentations') 
                    ? 'bg-white/20 text-brio-teal' 
                    : 'hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span>Presentations</span>
              </Link>
              
              <Link 
                to="/team" 
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive('/team') 
                    ? 'bg-white/20 text-brio-teal' 
                    : 'hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Team</span>
              </Link>
              
              <Link 
                to="/analytics" 
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  isActive('/analytics') 
                    ? 'bg-white/20 text-brio-teal' 
                    : 'hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Analytics</span>
              </Link>
            </nav>
            
            <div className="border-t border-white/10 pt-4">
              <button 
                onClick={() => {
                  toast({
                    title: "Help & Resources",
                    description: "Contact support@briovacations.com for assistance.",
                  });
                }}
                className="flex items-center space-x-2 p-3 rounded-lg w-full hover:bg-white/10 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Help</span>
              </button>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
