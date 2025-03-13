
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import PresentationCard from './PresentationCard';
import { ActivePresentation, UpcomingPresentation } from '@/types/dashboard';

interface PresentationListProps {
  title: string;
  presentations: (ActivePresentation | UpcomingPresentation)[];
  status: 'active' | 'scheduled';
}

const PresentationList: React.FC<PresentationListProps> = ({ title, presentations, status }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-brio-navy">{title}</h3>
      
      {presentations.length > 0 ? (
        <div className="grid gap-4">
          {presentations.map((presentation) => (
            <PresentationCard
              key={presentation.id}
              id={presentation.id}
              title={presentation.title}
              presenter={presentation.presenter}
              roomNumber={presentation.roomNumber}
              waveTime={presentation.waveTime}
              startTime={presentation.startTime}
              clients={status === 'active' 
                ? (presentation as ActivePresentation).clients 
                : (presentation as UpcomingPresentation).clients}
              status={status}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center text-gray-500">
            No {status === 'active' ? 'active' : 'upcoming'} presentations found matching your criteria.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PresentationList;
