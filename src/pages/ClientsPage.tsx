
import React from 'react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsPage: React.FC = () => {
  const { toast } = useToast();
  
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
        
        <Card>
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Client management features are coming soon. You'll be able to view all clients, add new clients, 
              and manage client information from this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ClientsPage;
