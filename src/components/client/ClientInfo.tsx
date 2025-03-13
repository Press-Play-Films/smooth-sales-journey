
import React, { memo } from 'react';

interface ClientInfoProps {
  names: string;
  location?: string;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ names, location }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-900">{names}</h3>
      {location && (
        <p className="text-sm text-gray-500">{location}</p>
      )}
    </div>
  );
};

export default memo(ClientInfo);
