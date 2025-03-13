
import React, { useState } from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpcomingPresentation } from '@/types/dashboard';
import { formatTime } from '@/utils/formatters';
import EditPresentationForm from '../presentation/EditPresentationForm';

interface UpcomingPresentationListProps {
  presentations: UpcomingPresentation[];
}

const UpcomingPresentationList: React.FC<UpcomingPresentationListProps> = ({ presentations }) => {
  const [selectedPresentation, setSelectedPresentation] = useState<UpcomingPresentation | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handlePresentationClick = (presentation: UpcomingPresentation) => {
    setSelectedPresentation(presentation);
    setEditDialogOpen(true);
  };
  
  return (
    <div className="space-y-4">
      {presentations.map(presentation => (
        <Card 
          key={presentation.id} 
          className="hover-lift cursor-pointer transition-all hover:shadow-md"
          onClick={() => handlePresentationClick(presentation)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{presentation.title}</h4>
                <p className="text-sm text-gray-500">
                  {presentation.presenter} • {formatTime(presentation.startTime)}
                </p>
              </div>
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                {presentation.clients} clients
              </Badge>
            </div>
            <div className="flex justify-end mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-brio-navy hover:text-brio-navy/90 hover:bg-brio-navy/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPresentation(presentation);
                  setEditDialogOpen(true);
                }}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {presentations.length === 0 && (
        <Card className="bg-gray-50 border-dashed">
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-gray-500">No upcoming presentations</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {selectedPresentation && (
        <EditPresentationForm
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          presentation={selectedPresentation}
        />
      )}
    </div>
  );
};

export default UpcomingPresentationList;
