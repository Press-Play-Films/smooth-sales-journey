
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface SalesforceHeaderProps {
  authStatus: boolean;
}

const SalesforceHeader: React.FC<SalesforceHeaderProps> = ({ authStatus }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" 
          alt="Salesforce Logo" 
          className="h-6 mr-1"
        />
        <div>
          <CardTitle className="text-lg">Salesforce Integration</CardTitle>
          <CardDescription>
            Connect client data with your Salesforce CRM
          </CardDescription>
        </div>
      </div>
      <Badge 
        className={authStatus 
          ? "bg-green-100 text-green-800 border border-green-200" 
          : "bg-gray-100 text-gray-800 border border-gray-200"
        }
      >
        {authStatus ? "Connected" : "Not Connected"}
      </Badge>
    </div>
  );
};

export default SalesforceHeader;
