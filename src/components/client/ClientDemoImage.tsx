
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
  
  // Generate a consistent background color based on client ID
  const generateBackgroundColor = (id: string) => {
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = idSum % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };
  
  // Generate a different but complementary color for the gradient
  const generateSecondaryColor = (id: string) => {
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (idSum + 180) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };
  
  // Get user initials for the placeholder
  const getInitials = (name: string) => {
    return name
      .split('&')
      .map(part => part.trim().charAt(0))
      .join('');
  };
  
  // Select a placeholder image based on client ID
  const getPlaceholderImage = (id: string) => {
    // Use modulo to select from available placeholders
    const imageIndex = parseInt(id.replace(/\D/g, '')) % 6;
    
    const placeholders = [
      "public/lovable-uploads/af49a26c-e519-496d-b4ce-767db3b943c0.png",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ];
    
    return placeholders[imageIndex] || placeholders[0];
  };
  
  // Handle click to change status (for demo purposes)
  const handleClick = () => {
    if (onStatusChange) {
      const statuses: ('engaged' | 'distracted' | 'away')[] = ['engaged', 'distracted', 'away'];
      const currentIndex = statuses.indexOf(status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      onStatusChange(statuses[nextIndex]);
      
      toast({
        title: "Status Updated",
        description: `Client status changed to ${statuses[nextIndex]}.`,
      });
    }
  };
  
  return (
    <div 
      className="relative w-full h-full rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
      style={{
        background: `linear-gradient(to bottom right, ${generateBackgroundColor(clientId)}, ${generateSecondaryColor(clientId)})`
      }}
    >
      {/* Display a placeholder image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={getPlaceholderImage(clientId)}
          alt={`${clientNames} preview`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay with client status indicator */}
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
