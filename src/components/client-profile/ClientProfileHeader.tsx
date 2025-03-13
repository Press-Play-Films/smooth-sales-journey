
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ClientProfileHeaderProps {
  clientNames: string;
  status: string;
  statusStyle: {
    bg: string;
    text: string;
    border: string;
    label: string;
  };
}

const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({ clientNames, status, statusStyle }) => {
  const { toast } = useToast();

  return (
    <CardHeader className="bg-gradient-to-r from-brio-navy to-brio-navy/80 text-white">
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center space-x-2">
          <span>{clientNames}</span>
          <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg} border ${statusStyle.border}`}>
            {statusStyle.label}
          </Badge>
        </CardTitle>
        <div className="flex space-x-2">
          <button 
            onClick={() => {
              toast({
                title: "Email Client",
                description: "Opening email composer...",
              });
            }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onClick={() => {
              toast({
                title: "Call Client",
                description: "Initiating call...",
              });
            }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ClientProfileHeader;
