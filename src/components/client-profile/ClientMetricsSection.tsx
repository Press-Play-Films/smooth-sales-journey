
import React from 'react';
import ClientEngagementMetrics from '../ClientEngagementMetrics';
import ClientStatusCard from './ClientStatusCard';

interface ClientMetricsSectionProps {
  engagementData: {
    engaged: number;
    distracted: number;
    away: number;
  };
  status: string;
  statusStyle: {
    bg: string;
    text: string;
    border: string;
    label: string;
  };
}

const ClientMetricsSection: React.FC<ClientMetricsSectionProps> = ({ 
  engagementData, 
  status, 
  statusStyle 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="md:col-span-2">
        <ClientEngagementMetrics clientData={engagementData} />
      </div>
      <div className="md:col-span-1">
        <ClientStatusCard status={status} statusStyle={statusStyle} />
      </div>
    </div>
  );
};

export default ClientMetricsSection;
