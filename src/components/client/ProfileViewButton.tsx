
import React from 'react';
import { useToast } from "@/hooks/use-toast";

interface ProfileViewButtonProps {
  clientNames: string;
}

const ProfileViewButton: React.FC<ProfileViewButtonProps> = ({ clientNames }) => {
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        toast({
          title: "Client Profile",
          description: "Opening detailed view for " + clientNames,
        });
      }}
      className="text-xs text-brio-navy hover:text-brio-teal flex items-center space-x-1 transition-colors"
    >
      <span>View Profile</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default ProfileViewButton;
