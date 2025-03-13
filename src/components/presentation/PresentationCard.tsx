
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import EditPresentationForm from './EditPresentationForm';

interface PresentationCardProps {
  id: string;
  title: string;
  presenter: string;
  roomNumber: string;
  waveTime?: string;
  startTime: Date;
  clients: number | any[];
  status: 'active' | 'scheduled';
}

const PresentationCard: React.FC<PresentationCardProps> = ({
  id,
  title,
  presenter,
  roomNumber,
  waveTime,
  startTime,
  clients,
  status
}) => {
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const clientsCount = typeof clients === 'number' ? clients : clients.length;
  const isActive = status === 'active';
  
  const handleViewDetails = () => {
    toast({
      title: isActive ? "View Presentation" : "Edit Presentation",
      description: isActive ? "Opening detailed presentation view" : "Opening presentation editor",
    });
    
    if (!isActive) {
      setEditDialogOpen(true);
    }
  };
  
  return (
    <>
      <Card key={id} className="hover-lift">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-gray-500">
                Presenter: {presenter} • Room: {roomNumber} • 
                Wave: {waveTime || 'N/A'} •
                {isActive ? 'Started: ' : 'Starts: '}{format(startTime, 'h:mm a')}
              </p>
              <p className="mt-2">
                {clientsCount} client{clientsCount !== 1 ? 's' : ''} {isActive ? 'attending' : 'scheduled'}
              </p>
            </div>
            <div className={`${isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'} px-3 py-1 rounded-full text-sm font-medium`}>
              {isActive ? 'Live' : 'Scheduled'}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleViewDetails}
            >
              {isActive ? 'View Details' : 'Edit'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {!isActive && (
        <EditPresentationForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          presentation={{
            id,
            title,
            presenter,
            roomNumber,
            waveTime,
            startTime,
            clients
          }}
        />
      )}
    </>
  );
};

export default PresentationCard;
