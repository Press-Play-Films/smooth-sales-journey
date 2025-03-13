import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClientSearch from '@/components/client/ClientSearch';
import ClientCard from '@/components/ClientCard';
import { Client } from '@/types/dashboard';
import { demoClients } from '@/utils/demoData';

const ClientsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Use the demo client data from the refactored import
  const [clients, setClients] = useState<Client[]>(demoClients.slice(0, 6));
  
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  
  // Handle client status change
  const handleStatusChange = (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => {
    const updatedClients = clients.map(client => 
      client.id === clientId ? {...client, status: newStatus} : client
    );
    setClients(updatedClients);
    
    toast({
      title: "Status Updated",
      description: `Client status has been updated to ${newStatus}.`,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Clients</h2>
          <Button 
            onClick={() => {
              toast({
                title: "Add Client",
                description: "This feature will be available soon!",
              });
            }}
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            <span className="mr-2">+</span> Add Client
          </Button>
        </div>
        
        {/* Client search and filters */}
        <div className="py-4">
          <ClientSearch 
            clients={clients} 
            onFilteredClientsChange={setFilteredClients}
          />
        </div>
        
        {/* Client grid */}
        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Clients Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                No clients match your search criteria. Try adjusting your filters or search term.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ClientsPage;
