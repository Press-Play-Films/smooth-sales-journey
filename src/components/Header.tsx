
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-nav px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png" 
              alt="Brio Vacations" 
              className="h-10 object-contain hidden sm:block" 
            />
            <span className="font-semibold text-lg tracking-tight text-brio-navy">
              Brio Sales Management
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => {
                toast({
                  title: "New Presentation",
                  description: "This feature will be available soon!",
                });
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100 transition-colors"
            >
              New Presentation
            </button>
            <button 
              onClick={() => {
                toast({
                  title: "Notifications",
                  description: "You have no new notifications.",
                });
              }}
              className="p-2 rounded-full text-gray-700 hover:text-brio-navy hover:bg-gray-100 relative transition-colors"
            >
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-brio-orange"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="pl-3 border-l border-gray-200">
              <button 
                onClick={() => {
                  toast({
                    title: "User Profile",
                    description: "Profile management coming soon!",
                  });
                }}
                className="flex items-center space-x-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brio-navy to-brio-teal flex items-center justify-center text-white text-sm font-medium">
                  CB
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-brio-navy">Craig Boure</p>
                  <p className="text-xs text-gray-500">Presenter</p>
                </div>
              </button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-brio-navy hover:bg-gray-100 focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/clients"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clients
            </Link>
            <Link 
              to="/presentations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Presentations
            </Link>
            <Link 
              to="/team"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              to="/analytics"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brio-navy to-brio-teal flex items-center justify-center text-white font-medium">
                  CB
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Craig Boure</div>
                <div className="text-sm font-medium text-gray-500">Presenter</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
