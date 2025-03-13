
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DepartmentStatistics } from '@/types/dashboard';

interface DepartmentCardsProps {
  departments: DepartmentStatistics[];
}

const DepartmentCards: React.FC<DepartmentCardsProps> = ({ departments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {departments.map((dept) => (
        <Card key={dept.department} className="bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{dept.department}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Clients:</span>
                <span className="font-medium">{dept.clientCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Engagement:</span>
                <span className="font-medium">{dept.engagementRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Conversion:</span>
                <span className="font-medium">{dept.conversionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentCards;
