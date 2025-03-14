
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface SalesforceAutoSyncProps {
  isSyncEnabled: boolean;
  handleToggleSync: (enabled: boolean) => void;
}

const SalesforceAutoSync: React.FC<SalesforceAutoSyncProps> = ({
  isSyncEnabled,
  handleToggleSync
}) => {
  return (
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
  );
};

export default SalesforceAutoSync;
