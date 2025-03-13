
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

interface ClientThumbnailProps {
  names: string;
  image?: string;
  presentationTime?: string;
}

const ClientThumbnail: React.FC<ClientThumbnailProps> = ({ 
  names,
  image,
  presentationTime
}) => {
  // Generate initials from names
  const generateInitials = (names: string) => {
    return names
      .split('&')
      .map(name => name.trim().charAt(0))
      .join('');
  };

  return (
    <div className="space-y-2">
      <Avatar className="w-16 h-16 rounded-md border">
        <AvatarImage src={image} alt={names} />
        <AvatarFallback className="bg-gradient-to-br from-brio-navy to-brio-teal text-white text-xl">
          {generateInitials(names)}
        </AvatarFallback>
      </Avatar>
      
      {presentationTime && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{presentationTime}</span>
        </div>
      )}
    </div>
  );
};

export default ClientThumbnail;
