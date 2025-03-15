
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { isAuthenticated, initiateLogin, logout } from "@/services/salesforce/salesforceApi";
import { useToast } from "@/hooks/use-toast";

interface SalesforceAuthStatusProps {
  handleConnect: () => void;
  loading: boolean;
  authStatus: boolean;
  onDisconnect: () => void;
}

const SalesforceAuthStatus: React.FC<SalesforceAuthStatusProps> = ({
  handleConnect,
  loading,
  authStatus,
  onDisconnect
}) => {
  if (!authStatus) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-600 mb-4">
          Connect to Salesforce to enable data synchronization with your CRM
        </p>
        <Button 
          onClick={handleConnect} 
          className="bg-[#1589EE] hover:bg-[#0D7ACC]"
          disabled={loading}
        >
          Connect to Salesforce
        </Button>
      </div>
    );
  }
  
  return (
    <CardFooter className="border-t bg-gray-50 px-6 py-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onDisconnect}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
      >
        Disconnect
      </Button>
    </CardFooter>
  );
};

export default SalesforceAuthStatus;
