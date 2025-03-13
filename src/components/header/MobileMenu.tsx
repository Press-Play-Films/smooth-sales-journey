
import React from 'react';
import { Link } from 'react-router-dom';
import RoleToggle from './RoleToggle';

interface MobileMenuProps {
  isOpen: boolean;
  userRole: 'employee' | 'executive';
  toggleUserRole: () => void;
  onItemClick: () => void;
  onNewPresentation: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  userRole, 
  toggleUserRole,
  onItemClick,
  onNewPresentation
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-b border-gray-200 animate-slide-down">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Role toggle in mobile menu */}
        <RoleToggle 
          userRole={userRole} 
          toggleUserRole={toggleUserRole} 
          isMobile={true}
        />
        
        <Link 
          to="/"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
          onClick={onItemClick}
        >
          Dashboard
        </Link>
        <Link 
          to="/clients"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
          onClick={onItemClick}
        >
          Clients
        </Link>
        <Link 
          to="/presentations"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
          onClick={onItemClick}
        >
          Presentations
        </Link>
        <Link 
          to="/team"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
          onClick={onItemClick}
        >
          Team
        </Link>
        <Link 
          to="/analytics"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
          onClick={onItemClick}
        >
          Analytics
        </Link>
        
        <button
          onClick={onNewPresentation}
          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
        >
          New Presentation
        </button>
        
        {userRole === 'executive' && (
          <Link 
            to="/executive"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brio-navy hover:bg-gray-100"
            onClick={onItemClick}
          >
            Executive Dashboard
          </Link>
        )}
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
  );
};

export default MobileMenu;
