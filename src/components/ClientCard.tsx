
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import ClientNotes from './ClientNotes';

interface ClientCardProps {
  client: {
    id: string;
    names: string;
    location?: string;
    status: 'engaged' | 'distracted' | 'away';
  };
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const { toast } = useToast();
  
  // Generate initials from names
  const generateInitials = (names: string) => {
    return names
      .split('&')
      .map(name => name.trim().charAt(0))
      .join('');
  };
  
  // Status styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'engaged':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'Engaged'
        };
      case 'distracted':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-200',
          label: 'Distracted'
        };
      case 'away':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          label: 'Away'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: 'Unknown'
        };
    }
  };
  
  const statusStyle = getStatusStyles(client.status);
  
  return (
    <Card className="overflow-hidden hover-lift border border-gray-200 h-full flex flex-col">
      <CardContent className="p-4 flex-1">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brio-navy to-brio-teal flex items-center justify-center text-white text-xl font-semibold">
              {generateInitials(client.names)}
            </div>
            <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg} border ${statusStyle.border}`}>
              {statusStyle.label}
            </Badge>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{client.names}</h3>
            {client.location && (
              <p className="text-sm text-gray-500">{client.location}</p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  Add Note
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ClientNotes clientId={client.id} clientNames={client.names} />
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
        </div>
      </CardContent>
      
      <CardFooter className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <button
          onClick={() => {
            toast({
              title: "Client Profile",
              description: "Opening detailed view for " + client.names,
            });
          }}
          className="text-xs text-brio-navy hover:text-brio-teal flex items-center space-x-1 transition-colors"
        >
          <span>View Profile</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
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
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
