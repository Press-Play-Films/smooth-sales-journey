
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationButton from './header/NotificationButton';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenu from './header/MobileMenu';
import RoleToggle from './header/RoleToggle';
import UserProfile from './header/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, profile } = useAuth();
  
  const handleNewPresentation = () => {
    // Handle new presentation action
    console.log("New presentation action triggered");
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4 md:px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-brio-navy">BRIO</Link>
          {!isMobile && (
            <span className="text-gray-500 text-sm">|</span>
          )}
          {!isMobile && (
            <span className="text-gray-500 text-sm">Sales Management</span>
          )}
        </div>
        
        {isMobile ? (
          <div className="flex items-center space-x-4">
            <NotificationButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-6">
            <DesktopNavigation onNewPresentation={handleNewPresentation} />
          </div>
        )}
      </div>
      
      {isMobile && isMobileMenuOpen && (
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          userRole="employee"
          toggleUserRole={() => {}}
          onItemClick={() => setIsMobileMenuOpen(false)}
          onNewPresentation={handleNewPresentation}
        />
      )}
    </header>
  );
};

export default Header;
