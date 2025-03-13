
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Presentation {
  id: string;
  title: string;
  date: Date;
  result: string;
}

interface PresentationHistoryProps {
  presentations: Presentation[];
  formatDate: (date: Date) => string;
}

const PresentationHistory: React.FC<PresentationHistoryProps> = ({ presentations, formatDate }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Presentation History</h3>
      <div className="space-y-3">
        {presentations.map(presentation => (
          <div key={presentation.id} className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
            <div>
              <p className="font-medium">{presentation.title}</p>
              <p className="text-sm text-gray-500">{formatDate(presentation.date)}</p>
            </div>
            <Badge className={
              presentation.result === 'Purchased' ? 'bg-green-100 text-green-800 border border-green-200' :
              presentation.result === 'Declined' ? 'bg-red-100 text-red-800 border border-red-200' :
              presentation.result === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }>
              {presentation.result}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresentationHistory;
