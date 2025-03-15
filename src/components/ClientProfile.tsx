
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getStatusStyles, formatDate } from "@/utils/clientUtils";
import ClientProfileHeader from './client-profile/ClientProfileHeader';
import ClientContactInfo from './client-profile/ClientContactInfo';
import PresentationHistory from './client-profile/PresentationHistory';
import ClientMetricsSection from './client-profile/ClientMetricsSection';
import ClientTabContent from './client-profile/ClientTabContent';

interface ClientProfileProps {
  clientId: string;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  // Mock client data (in a real app, this would come from an API)
  const client = {
    id: clientId,
    names: 'George & Lyn Whitehead',
    location: 'North Carolina',
    email: 'whiteheads@example.com',
    phone: '(555) 123-4567',
    status: 'engaged',
    presentationHistory: [
      { id: 'pres-001', title: 'Brio Vacations Premium Package', date: new Date(), result: 'In Progress' },
      { id: 'pres-002', title: 'Brio Summer Special', date: new Date(Date.now() - 7776000000), result: 'Declined' } // 90 days ago
    ],
    keyInformation: [
      { category: 'Vacation Frequency', value: 'Twice a year' },
      { category: 'Favorite Destinations', value: 'Beach resorts, Europe' },
      { category: 'Retirement Status', value: 'Planning to retire in 2 years' },
      { category: 'Travel Companions', value: 'Adult children, grandchildren' },
      { category: 'Budget Range', value: '$5,000 - $8,000 per trip' },
      { category: 'Dream Destinations', value: 'Mediterranean cruise, Japanese tour' }
    ],
    engagementData: {
      engaged: 75,
      distracted: 20,
      away: 5
    }
  };
  
  const statusStyle = getStatusStyles(client.status);
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <ClientProfileHeader 
          clientNames={client.names} 
          status={client.status} 
          statusStyle={statusStyle} 
        />
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClientContactInfo 
              email={client.email} 
              phone={client.phone} 
              location={client.location || ''} 
            />
            
            <PresentationHistory 
              presentations={client.presentationHistory} 
              formatDate={formatDate} 
            />
          </div>
        </CardContent>
      </Card>
      
      <ClientMetricsSection 
        engagementData={client.engagementData} 
        status={client.status} 
        statusStyle={statusStyle} 
      />
      
      <ClientTabContent 
        clientId={client.id} 
        clientNames={client.names} 
        keyInformation={client.keyInformation} 
      />
    </div>
  );
};

export default ClientProfile;
