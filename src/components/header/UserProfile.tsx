
import React from 'react';
import { useToast } from "@/hooks/use-toast";

const UserProfile: React.FC = () => {
  const { toast } = useToast();
  
  return (
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
  );
};

export default UserProfile;
