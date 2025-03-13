
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface ClientEngagementMetricsProps {
  clientData: {
    engaged: number;
    distracted: number;
    away: number;
  };
  showTitle?: boolean;
}

const ClientEngagementMetrics: React.FC<ClientEngagementMetricsProps> = ({ 
  clientData, 
  showTitle = true 
}) => {
  const totalTime = clientData.engaged + clientData.distracted + clientData.away;
  
  const metrics = {
    engagedPercentage: totalTime > 0 ? Math.round((clientData.engaged / totalTime) * 100) : 0,
    distractedPercentage: totalTime > 0 ? Math.round((clientData.distracted / totalTime) * 100) : 0,
    awayPercentage: totalTime > 0 ? Math.round((clientData.away / totalTime) * 100) : 0,
  };
  
  return (
    <Card>
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-lg">Engagement Metrics</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Engaged</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${metrics.engagedPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{metrics.engagedPercentage}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Distracted</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-amber-500 h-2.5 rounded-full" 
                  style={{ width: `${metrics.distractedPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{metrics.distractedPercentage}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Away</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${metrics.awayPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{metrics.awayPercentage}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientEngagementMetrics;
