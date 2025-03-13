
import React, { memo } from 'react';

interface ClientInfoProps {
  names: string;
  location?: string;
  city?: string;
  state?: string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ names, location, city, state }) => {
  // Display location if provided, otherwise try to build it from city and state
  const displayLocation = location || 
    (city && state ? `${city}, ${state}` : 
    (city || state || ''));
  
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{names}</h3>
      {displayLocation && (
        <p className="text-sm text-gray-500">{displayLocation}</p>
      )}
    </div>
  );
};

export default memo(ClientInfo);
