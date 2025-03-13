
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleToggle from './header/RoleToggle';
import DesktopNavigation from './header/DesktopNavigation';
import MobileMenu from './header/MobileMenu';
import NewPresentationForm from './presentation/NewPresentationForm';

interface HeaderProps {
  userRole: 'employee' | 'executive';
  toggleUserRole: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, toggleUserRole }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNewPresentationForm, setShowNewPresentationForm] = useState(false);
  
  const openNewPresentationForm = () => {
    setShowNewPresentationForm(true);
    setMobileMenuOpen(false);
  };
  
  const closeNewPresentationForm = () => {
    setShowNewPresentationForm(false);
  };
  
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
          {/* User Role Toggle */}
          <RoleToggle userRole={userRole} toggleUserRole={toggleUserRole} />
          
          {/* Desktop Navigation */}
          <DesktopNavigation onNewPresentation={openNewPresentationForm} />
          
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
      <MobileMenu 
        isOpen={mobileMenuOpen}
        userRole={userRole}
        toggleUserRole={toggleUserRole}
        onItemClick={() => setMobileMenuOpen(false)}
        onNewPresentation={openNewPresentationForm}
      />
      
      {/* New Presentation Form Modal */}
      {showNewPresentationForm && (
        <NewPresentationForm onClose={closeNewPresentationForm} />
      )}
    </header>
  );
};

export default Header;
