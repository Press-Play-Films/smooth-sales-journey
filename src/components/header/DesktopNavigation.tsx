
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationButton from './NotificationButton';
import UserProfile from './UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

interface DesktopNavigationProps {
  onNewPresentation: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  onNewPresentation 
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Always show all navigation items regardless of auth status
  return (
    <nav className="hidden md:flex items-center space-x-4">
      <button 
        onClick={onNewPresentation}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100 transition-colors"
      >
        New Presentation
      </button>
      <NotificationButton />
      <div className="pl-3 border-l border-gray-200">
        <UserProfile />
      </div>
    </nav>
  );
};

export default DesktopNavigation;
