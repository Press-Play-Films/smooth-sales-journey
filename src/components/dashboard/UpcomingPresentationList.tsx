
import React from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpcomingPresentation } from '@/types/dashboard';
import { formatTime } from '@/utils/formatters';

interface UpcomingPresentationListProps {
  presentations: UpcomingPresentation[];
}

const UpcomingPresentationList: React.FC<UpcomingPresentationListProps> = ({ presentations }) => {
  return (
    <div className="space-y-4">
      {presentations.map(presentation => (
        <Card key={presentation.id} className="hover-lift">
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
    </div>
  );
};

export default UpcomingPresentationList;
