
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface RoleToggleProps {
  userRole: 'employee' | 'executive';
  toggleUserRole: () => void;
  isMobile?: boolean;
}

const RoleToggle: React.FC<RoleToggleProps> = ({ userRole, toggleUserRole, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm font-medium">View Mode:</span>
        <div className="flex items-center space-x-2">
          <Switch 
            id="mobile-role-mode" 
            checked={userRole === 'executive'}
            onCheckedChange={toggleUserRole}
          />
          <Label htmlFor="mobile-role-mode" className="text-sm">
            {userRole === 'executive' ? 'Executive' : 'Employee'}
          </Label>
        </div>
      </div>
    );
  }
  
  return (
    <div className="hidden md:flex items-center space-x-2 mr-4 bg-gray-100 p-2 rounded-lg">
      <Switch 
        id="role-mode" 
        checked={userRole === 'executive'}
        onCheckedChange={toggleUserRole}
      />
      <Label htmlFor="role-mode" className="text-sm font-medium">
        {userRole === 'executive' ? 'Executive View' : 'Employee View'}
      </Label>
    </div>
  );
};

export default RoleToggle;
