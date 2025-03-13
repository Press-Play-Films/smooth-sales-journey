
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientNotes from '../ClientNotes';
import ClientTransfer from '../ClientTransfer';
import ClientKeyInformation from './ClientKeyInformation';

interface KeyInfo {
  category: string;
  value: string;
}

interface ClientTabContentProps {
  clientId: string;
  clientNames: string;
  keyInformation: KeyInfo[];
}

const ClientTabContent: React.FC<ClientTabContentProps> = ({ clientId, clientNames, keyInformation }) => {
  return (
    <Tabs defaultValue="key-info" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="key-info">Key Information</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="transfer">Transfer</TabsTrigger>
      </TabsList>
      
      <TabsContent value="key-info" className="mt-4">
        <ClientKeyInformation keyInformation={keyInformation} />
      </TabsContent>
      
      <TabsContent value="notes" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <ClientNotes clientId={clientId} clientNames={clientNames} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="transfer" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <ClientTransfer clientId={clientId} clientNames={clientNames} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ClientTabContent;
