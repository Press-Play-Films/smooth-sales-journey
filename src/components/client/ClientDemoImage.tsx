
import React from 'react';
import { useToast } from "@/hooks/use-toast";

interface ClientDemoImageProps {
  clientId: string;
  clientNames: string;
  status: 'engaged' | 'distracted' | 'away';
  onStatusChange?: (newStatus: 'engaged' | 'distracted' | 'away') => void;
}

const ClientDemoImage: React.FC<ClientDemoImageProps> = ({
  clientId,
  clientNames,
  status,
  onStatusChange
}) => {
  const { toast } = useToast();
  
  // Get user initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(n => n && n !== '&')
      .map(part => part.trim().charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  // Generate a background color based on client ID
  const generateBackgroundColor = (id: string) => {
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = idSum % 360;
    return `hsl(${hue}, 70%, 75%)`;
  };
  
  // Handle click to change status (for demo purposes)
  const handleClick = () => {
    if (onStatusChange) {
      const statuses: ('engaged' | 'distracted' | 'away')[] = ['engaged', 'distracted', 'away'];
      const currentIndex = statuses.indexOf(status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      onStatusChange(statuses[nextIndex]);
    }
  };
  
  return (
    <div 
      className="relative w-full h-full rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Avatar circle with initials */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: generateBackgroundColor(clientId) }}
      >
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
          {getInitials(clientNames)}
        </div>
      </div>
      
      {/* Status overlay */}
      <div className={`absolute inset-0 flex items-center justify-center ${
        status === 'away' ? 'bg-black/50' : 
        status === 'distracted' ? 'bg-black/30' : 
        'bg-black/10'
      }`}>
        <div className="text-white text-xs bg-black/70 px-2 py-1 rounded-full">
          {status === 'engaged' ? '👁️ Viewing' : 
           status === 'distracted' ? '⚠️ Distracted' : 
           '⏸️ Away'}
        </div>
      </div>
    </div>
  );
};

export default ClientDemoImage;
