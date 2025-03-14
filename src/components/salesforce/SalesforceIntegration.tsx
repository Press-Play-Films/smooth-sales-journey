
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { isAuthenticated, initiateLogin, logout, fetchSalesforceClients, syncClientToSalesforce } from "@/services/salesforce/salesforceApi";

// Import smaller components
import SalesforceHeader from './SalesforceHeader';
import SalesforceAuthStatus from './SalesforceAuthStatus';
import SalesforceAutoSync from './SalesforceAutoSync';
import SalesforceActions from './SalesforceActions';
import SalesforceConfigDialog from './SalesforceConfigDialog';

interface SalesforceIntegrationProps {
  clientId?: string;
  clientNames?: string;
  clientData?: any;
}

const SalesforceIntegration: React.FC<SalesforceIntegrationProps> = ({ 
  clientId,
  clientNames,
  clientData
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<boolean>(isAuthenticated());
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);
  
  // Connect to Salesforce
  const handleConnect = () => {
    setLoading(true);
    
    try {
      initiateLogin();
      
      toast({
        title: "Connecting to Salesforce",
        description: "Redirecting to Salesforce login...",
      });
    } catch (error) {
      console.error("Failed to connect to Salesforce:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Salesforce. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  // Disconnect from Salesforce
  const handleDisconnect = () => {
    logout();
    setAuthStatus(false);
    setIsSyncEnabled(false);
    
    toast({
      title: "Disconnected",
      description: "Your Salesforce connection has been removed.",
    });
  };
  
  // Sync current client to Salesforce
  const handleSyncClient = async () => {
    if (!clientData) {
      toast({
        title: "Sync Failed",
        description: "No client data available to sync",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await syncClientToSalesforce(clientData);
      
      if (success) {
        toast({
          title: "Sync Successful",
          description: `${clientNames || 'Client'} has been synced to Salesforce`,
        });
      } else {
        toast({
          title: "Sync Failed",
          description: "Failed to sync client to Salesforce",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error syncing client:", error);
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing to Salesforce",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle enabling/disabling auto-sync
  const handleToggleSync = (enabled: boolean) => {
    setIsSyncEnabled(enabled);
    
    toast({
      title: enabled ? "Auto-Sync Enabled" : "Auto-Sync Disabled",
      description: enabled 
        ? "Changes will automatically sync to Salesforce" 
        : "Automatic synchronization has been disabled",
    });
  };
  
  // Demo data lookup from Salesforce
  const handleLookupClient = async () => {
    setLoading(true);
    
    try {
      const clients = await fetchSalesforceClients();
      
      if (clients.length > 0) {
        toast({
          title: "Salesforce Data Retrieved",
          description: `Found ${clients.length} clients in Salesforce`
        });
      } else {
        toast({
          title: "No Data Found",
          description: "No matching clients found in Salesforce"
        });
      }
    } catch (error) {
      console.error("Error fetching Salesforce data:", error);
      toast({
        title: "Lookup Failed",
        description: "Could not retrieve data from Salesforce",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="relative pb-2">
          <SalesforceHeader authStatus={authStatus} />
        </CardHeader>
        
        <CardContent className="pt-2">
          {!authStatus ? (
            <SalesforceAuthStatus 
              handleConnect={handleConnect}
              loading={loading}
              authStatus={authStatus}
              onDisconnect={handleDisconnect}
            />
          ) : (
            <div className="space-y-4">
              <SalesforceAutoSync 
                isSyncEnabled={isSyncEnabled}
                handleToggleSync={handleToggleSync}
              />
              
              <SalesforceActions 
                clientData={clientData}
                handleSyncClient={handleSyncClient}
                handleLookupClient={handleLookupClient}
                openConfigDialog={() => setShowConfigDialog(true)}
                loading={loading}
              />
            </div>
          )}
        </CardContent>
        
        {authStatus && (
          <SalesforceAuthStatus 
            handleConnect={handleConnect}
            loading={loading}
            authStatus={authStatus}
            onDisconnect={handleDisconnect}
          />
        )}
      </Card>
      
      <SalesforceConfigDialog 
        showConfigDialog={showConfigDialog}
        setShowConfigDialog={setShowConfigDialog}
      />
    </>
  );
};

export default SalesforceIntegration;
