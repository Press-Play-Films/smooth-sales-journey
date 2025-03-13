
import React, { useEffect, useState } from 'react';
import { Client } from '@/types/dashboard';
import ClientEngagementMetrics from './ClientEngagementMetrics';

interface EngagementMetricsProps {
  clients: Client[];
}

const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ clients }) => {
  const [aggregatedData, setAggregatedData] = useState({
    engaged: 0,
    distracted: 0,
    away: 0
  });
  
  useEffect(() => {
    if (clients.length > 0) {
      const engaged = clients.filter(c => c.status === 'engaged').length;
      const distracted = clients.filter(c => c.status === 'distracted').length;
      const away = clients.filter(c => c.status === 'away').length;
      
      setAggregatedData({
        engaged,
        distracted,
        away
      });
    }
  }, [clients]);
  
  return <ClientEngagementMetrics clientData={aggregatedData} />;
};

export default EngagementMetrics;
