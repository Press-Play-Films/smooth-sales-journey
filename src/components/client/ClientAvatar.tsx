
import React, { memo } from 'react';

interface ClientAvatarProps {
  names: string;
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({ names }) => {
  // Generate initials from names
  const generateInitials = (names: string) => {
    return names
      .split('&')
      .map(name => name.trim().charAt(0))
      .join('');
  };

  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brio-navy to-brio-teal flex items-center justify-center text-white text-xl font-semibold">
      {generateInitials(names)}
    </div>
  );
};

export default memo(ClientAvatar);
