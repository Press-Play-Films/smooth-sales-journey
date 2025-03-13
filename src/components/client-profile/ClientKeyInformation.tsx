
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface KeyInfo {
  category: string;
  value: string;
}

interface ClientKeyInformationProps {
  keyInformation: KeyInfo[];
}

const ClientKeyInformation: React.FC<ClientKeyInformationProps> = ({ keyInformation }) => {
  const { toast } = useToast();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Client Key Information</h3>
          <button
            onClick={() => {
              toast({
                title: "Edit Key Information",
                description: "This feature will be available soon!",
              });
            }}
            className="text-brio-navy hover:text-brio-teal text-sm transition-colors"
          >
            Edit Information
          </button>
        </div>
        
        <div className="space-y-4">
          {keyInformation.map((info, index) => (
            <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
              <p className="text-sm text-gray-500">{info.category}</p>
              <p className="font-medium">{info.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientKeyInformation;
