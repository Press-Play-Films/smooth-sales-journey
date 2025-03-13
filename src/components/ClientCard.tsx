
import React from 'react';
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import ClientAvatar from './client/ClientAvatar';
import ClientStatusBadge from './client/ClientStatusBadge';
import ClientInfo from './client/ClientInfo';
import ClientActions from './client/ClientActions';
import ClientOptions from './client/ClientOptions';
import ProfileViewButton from './client/ProfileViewButton';
import ClientThumbnail from './client/ClientThumbnail';
import ClientDemoImage from './client/ClientDemoImage';

interface ClientCardProps {
  client: {
    id: string;
    names: string;
    location?: string;
    city?: string;
    state?: string;
    status: 'engaged' | 'distracted' | 'away';
    image?: string;
    presentationTime?: string;
  };
  onStatusChange?: (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onStatusChange }) => {
  // Handle status change from client image
  const handleStatusChange = (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => {
    if (onStatusChange) {
      onStatusChange(clientId, newStatus);
    }
  };
  
  return (
    <Card className="overflow-hidden hover-lift border border-gray-200 h-full flex flex-col">
      <CardContent className="p-4 flex-1">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-between items-start">
            <ClientThumbnail 
              names={client.names} 
              image={client.image}
              presentationTime={client.presentationTime}
            />
            <ClientStatusBadge status={client.status} />
          </div>
          
          <ClientInfo 
            names={client.names} 
            location={client.location}
            city={client.city}
            state={client.state}
          />
          
          {/* Replace video stream with static client image */}
          <div className="mt-3 mb-3 h-24 rounded-md overflow-hidden">
            <ClientDemoImage 
              clientId={client.id}
              clientNames={client.names} 
              status={client.status}
              onStatusChange={(newStatus) => handleStatusChange(client.id, newStatus)}
            />
          </div>
          
          <ClientActions clientId={client.id} clientNames={client.names} />
        </div>
      </CardContent>
      
      <CardFooter className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
        <ProfileViewButton clientNames={client.names} />
        <ClientOptions />
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
