
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, DollarSign, MoreVertical } from "lucide-react";
import ClientCard from '../ClientCard';
import SaleRecordForm from './SaleRecordForm';
import { ActivePresentation } from '@/types/dashboard';
import { formatTime } from '@/utils/formatters';

interface ActivePresentationCardProps {
  presentation: ActivePresentation;
}

const ActivePresentationCard: React.FC<ActivePresentationCardProps> = ({ presentation }) => {
  const { toast } = useToast();
  const [clients, setClients] = useState(presentation.clients);
  const [activeSaleClientId, setActiveSaleClientId] = useState<string | null>(null);
  const [showSaleDialog, setShowSaleDialog] = useState(false);

  // Handle client status updates from video analysis
  const handleClientStatusChange = (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId ? { ...client, status: newStatus } : client
      )
    );
  };

  // Initialize sale recording for a specific client
  const handleRecordSale = (clientId: string) => {
    setActiveSaleClientId(clientId);
    setShowSaleDialog(true);
  };

  // Handle successful sale recording
  const handleSaleSuccess = () => {
    setShowSaleDialog(false);
    setActiveSaleClientId(null);
  };

  // Handle cancellation of sale recording
  const handleSaleCancel = () => {
    setShowSaleDialog(false);
    setActiveSaleClientId(null);
  };

  // Check if it's the main Brio Vacations presentation
  const isBrioVacations = presentation.title === 'Brio Vacations';

  // Find the active client for sale recording
  const activeClient = clients.find(client => client.id === activeSaleClientId);

  return (
    <Card key={presentation.id} className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-brio-navy to-brio-navy/80 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isBrioVacations && (
              <img 
                src="/lovable-uploads/378ec97a-04b4-45e4-93e8-5bc4340decae.png" 
                alt="Brio Vacations Logo" 
                className="h-8 mr-3" 
              />
            )}
            <div>
              <CardTitle>{presentation.title}</CardTitle>
              <CardDescription className="text-white/80">
                Presenter: {presentation.presenter} • Started: {formatTime(presentation.startTime)}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-brio-teal text-brio-navy hover:bg-brio-teal/90">
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {clients.map(client => (
            <div key={client.id} className="relative">
              <ClientCard 
                client={client}
                onStatusChange={handleClientStatusChange}
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white shadow-sm">
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Client Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRecordSale(client.id)}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>Record Sale</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Client Profile",
                      description: "Opening client profile",
                    });
                  }}>
                    <span>View Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <button 
          onClick={() => {
            toast({
              title: "Full View",
              description: "Opening detailed presentation view",
            });
          }}
          className="text-brio-navy hover:text-brio-teal text-sm font-medium flex items-center space-x-1 transition-colors"
        >
          <span>View Full Presentation</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <button 
          onClick={() => {
            toast({
              title: "End Presentation",
              description: "This will end the presentation for all participants.",
              variant: "destructive",
            });
          }}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          End Presentation
        </button>
      </CardFooter>

      {/* Sale Recording Dialog */}
      <Dialog open={showSaleDialog} onOpenChange={setShowSaleDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {activeClient && (
            <SaleRecordForm 
              presentationId={presentation.id}
              clientId={activeClient.id}
              clientNames={activeClient.names}
              onSuccess={handleSaleSuccess}
              onCancel={handleSaleCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ActivePresentationCard;
