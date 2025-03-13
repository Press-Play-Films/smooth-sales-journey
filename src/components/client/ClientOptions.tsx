
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const ClientOptions: React.FC = () => {
  const { toast } = useToast();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-xs text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-44">
        <div className="space-y-1">
          <button
            onClick={() => {
              toast({
                title: "Transfer Client",
                description: "This feature will be available soon!",
              });
            }}
            className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md transition-colors"
          >
            Transfer Client
          </button>
          <button
            onClick={() => {
              toast({
                title: "Send Message",
                description: "This feature will be available soon!",
              });
            }}
            className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md transition-colors"
          >
            Send Message
          </button>
          <button
            onClick={() => {
              toast({
                title: "Remove from Presentation",
                description: "Are you sure you want to remove this client?",
                variant: "destructive",
              });
            }}
            className="w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Remove
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ClientOptions;
