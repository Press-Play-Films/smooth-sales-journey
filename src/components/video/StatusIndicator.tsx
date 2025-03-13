
import React from 'react';

interface StatusIndicatorProps {
  status: 'engaged' | 'distracted' | 'away';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className="absolute bottom-2 right-2">
      <div className={`h-3 w-3 rounded-full ${
        status === 'engaged' ? 'bg-green-500' :
        status === 'distracted' ? 'bg-amber-500' : 'bg-red-500'
      }`} />
    </div>
  );
};

export default StatusIndicator;
