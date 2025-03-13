
import React from 'react';
import { useToast } from "@/hooks/use-toast";

const TeamPageHeader: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-brio-navy">Team Management</h2>
      <button 
        onClick={() => {
          toast({
            title: "Team Management",
            description: "This feature will be available soon!",
          });
        }}
        className="bg-brio-navy hover:bg-brio-navy/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Team Member</span>
      </button>
    </div>
  );
};

export default TeamPageHeader;
