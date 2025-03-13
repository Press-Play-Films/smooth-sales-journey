
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Client } from '@/types/dashboard';

interface EngagementMetricsProps {
  clients: Client[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ clients }) => {
  const [metrics, setMetrics] = useState({
    engagedPercentage: 0,
    distractedPercentage: 0,
    awayPercentage: 0,
    totalClients: 0,
  });
  
  useEffect(() => {
    if (clients.length > 0) {
      const engaged = clients.filter(c => c.status === 'engaged').length;
      const distracted = clients.filter(c => c.status === 'distracted').length;
      const away = clients.filter(c => c.status === 'away').length;
      
      setMetrics({
        engagedPercentage: Math.round((engaged / clients.length) * 100),
        distractedPercentage: Math.round((distracted / clients.length) * 100),
        awayPercentage: Math.round((away / clients.length) * 100),
        totalClients: clients.length,
      });
    }
  }, [clients]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Engagement Metrics</CardTitle>
      </CardHeader>
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

export default EngagementMetrics;
