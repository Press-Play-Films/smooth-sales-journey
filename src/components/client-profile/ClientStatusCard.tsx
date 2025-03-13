
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface ClientStatusCardProps {
  status: string;
  statusStyle: {
    bg: string;
    text: string;
    border: string;
    label: string;
  };
}

const ClientStatusCard: React.FC<ClientStatusCardProps> = ({ status, statusStyle }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`text-center p-4 rounded-lg ${statusStyle.bg} ${statusStyle.text}`}>
          <p className="text-xl font-semibold">{statusStyle.label}</p>
          <p className="text-sm mt-1">Last updated: Just now</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientStatusCard;
