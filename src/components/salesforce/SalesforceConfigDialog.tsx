
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SalesforceConfigDialogProps {
  showConfigDialog: boolean;
  setShowConfigDialog: (show: boolean) => void;
}

const SalesforceConfigDialog: React.FC<SalesforceConfigDialogProps> = ({
  showConfigDialog,
  setShowConfigDialog
}) => {
  return (
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
  );
};

export default SalesforceConfigDialog;
