
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientNotes from '../ClientNotes';

interface ClientActionsProps {
  clientId: string;
  clientNames: string;
}

const ClientActions: React.FC<ClientActionsProps> = ({ clientId, clientNames }) => {
  const { toast } = useToast();
  const [keyInfo, setKeyInfo] = useState('');

  const handleSaveKeyInfo = () => {
    if (keyInfo.trim()) {
      toast({
        title: "Key Information Saved",
        description: `Key information saved for ${clientNames}`,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
            Add Note
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ClientNotes clientId={clientId} clientNames={clientNames} />
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
            Key Info
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <h4 className="font-medium">Key Information</h4>
            <div className="space-y-2">
              <Label htmlFor="keyInfo">Add Key Information</Label>
              <Input 
                id="keyInfo" 
                placeholder="Enter important client details"
                value={keyInfo}
                onChange={(e) => setKeyInfo(e.target.value)}
              />
              <div className="pt-2">
                <Button 
                  onClick={handleSaveKeyInfo} 
                  className="w-full bg-brio-navy hover:bg-brio-navy/90"
                >
                  Save Information
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ClientActions;
