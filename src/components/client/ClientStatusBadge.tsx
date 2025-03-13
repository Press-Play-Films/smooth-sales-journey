
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ClientStatusBadgeProps {
  status: 'engaged' | 'distracted' | 'away';
}

const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  // Status styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'engaged':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'Engaged'
        };
      case 'distracted':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-200',
          label: 'Distracted'
        };
      case 'away':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          label: 'Away'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: 'Unknown'
        };
    }
  };

  const statusStyle = getStatusStyles(status);

  return (
    <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg} border ${statusStyle.border}`}>
      {statusStyle.label}
    </Badge>
  );
};

export default ClientStatusBadge;
