
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import ClientNotes from '../ClientNotes';

interface ClientActionsProps {
  clientId: string;
  clientNames: string;
}

const ClientActions: React.FC<ClientActionsProps> = ({ clientId, clientNames }) => {
  const { toast } = useToast();

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
          <div className="space-y-2">
            <h4 className="font-medium">Key Information</h4>
            <p className="text-sm text-gray-500">No key information recorded yet.</p>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <button
                onClick={() => {
                  toast({
                    title: "Key Information",
                    description: "This feature will be available soon!",
                  });
                }}
                className="text-xs text-brio-navy hover:text-brio-teal"
              >
                Manage Key Information
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ClientActions;
