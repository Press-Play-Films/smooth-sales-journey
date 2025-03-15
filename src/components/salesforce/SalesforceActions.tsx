
import React from 'react';
import { Button } from "@/components/ui/button";

interface SalesforceActionsProps {
  clientData?: any;
  handleSyncClient: () => Promise<void>;
  handleLookupClient: () => Promise<void>;
  openConfigDialog: () => void;
  loading: boolean;
}

const SalesforceActions: React.FC<SalesforceActionsProps> = ({
  clientData,
  handleSyncClient,
  handleLookupClient,
  openConfigDialog,
  loading
}) => {
  return (
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
        onClick={openConfigDialog}
        className="flex-grow sm:flex-grow-0"
      >
        Settings
      </Button>
    </div>
  );
};

export default SalesforceActions;
