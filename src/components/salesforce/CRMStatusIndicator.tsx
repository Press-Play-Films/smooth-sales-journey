
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { isAuthenticated, initiateLogin } from "@/services/salesforce/salesforceApi";
import { Database, LinkIcon, CloudCog, CheckIcon, XIcon } from "lucide-react";

interface CRMStatusIndicatorProps {
  variant?: 'compact' | 'full';
  className?: string;
}

const CRMStatusIndicator: React.FC<CRMStatusIndicatorProps> = ({ 
  variant = 'compact',
  className = ''
}) => {
  const isConnected = isAuthenticated();
  
  const handleConnect = () => {
    initiateLogin();
  };
  
  // Compact version for headers
  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center ${className}`}>
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 px-2 py-1 
                  ${isConnected 
                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`
                }
              >
                {isConnected ? (
                  <>
                    <CheckIcon className="h-3 w-3" />
                    <span>CRM</span>
                  </>
                ) : (
                  <>
                    <XIcon className="h-3 w-3" />
                    <span>CRM</span>
                  </>
                )}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isConnected 
              ? 'Connected to Salesforce CRM' 
              : 'Not connected to Salesforce CRM'
            }</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Full version for pages
  return (
    <div className={`rounded-md border p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-gray-500" />
          <div>
            <h3 className="font-medium leading-none">CRM Integration</h3>
            <p className="text-sm text-gray-500 mt-1">
              {isConnected 
                ? 'Your Salesforce CRM is connected' 
                : 'Connect to your Salesforce CRM'
              }
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            Connected
          </Badge>
        ) : (
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleConnect}
          >
            <LinkIcon className="h-4 w-4" />
            Connect
          </Button>
        )}
      </div>
      
      {isConnected && (
        <div className="mt-3 text-xs text-gray-500">
          <p>Syncing client data with Salesforce</p>
          <p className="mt-1">
            <Link to="/clients" className="text-blue-600 hover:underline">
              View client integrations
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CRMStatusIndicator;
