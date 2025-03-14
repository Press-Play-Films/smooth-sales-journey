
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { isAuthenticated, initiateLogin, logout, fetchSalesforceClients, syncClientToSalesforce } from "@/services/salesforce/salesforceApi";

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
  
  // Reconnect to Salesforce
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
        </CardHeader>
        
        <CardContent className="pt-2">
          {!authStatus ? (
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
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Automatic Sync</div>
                  <div className="text-xs text-gray-500">
                    Automatically sync client updates to Salesforce
                  </div>
                </div>
                <Switch
                  checked={isSyncEnabled}
                  onCheckedChange={handleToggleSync}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {clientData && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSyncClient}
                    disabled={loading}
                    className="flex-grow sm:flex-grow-0"
                  >
                    Sync Client Data
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLookupClient}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0"
                >
                  Lookup Client
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfigDialog(true)}
                  className="flex-grow sm:flex-grow-0"
                >
                  Settings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        {authStatus && (
          <CardFooter className="border-t bg-gray-50 px-6 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
            >
              Disconnect
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Salesforce Integration Settings</DialogTitle>
            <DialogDescription>
              Configure your Salesforce integration options
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sync-presentations" className="flex-grow">
                Sync Presentation History
              </Label>
              <Switch id="sync-presentations" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sync-notes" className="flex-grow">
                Sync Client Notes
              </Label>
              <Switch id="sync-notes" defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sync-engagement" className="flex-grow">
                Sync Engagement Metrics
              </Label>
              <Switch id="sync-engagement" defaultChecked={false} />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowConfigDialog(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesforceIntegration;
