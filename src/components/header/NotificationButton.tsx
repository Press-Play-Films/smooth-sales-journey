
import React from 'react';
import { useToast } from "@/hooks/use-toast";

const NotificationButton: React.FC = () => {
  const { toast } = useToast();
  
  return (
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
  );
};

export default NotificationButton;
