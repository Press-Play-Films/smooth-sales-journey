
import React from 'react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PresentationsPage: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Presentations</h2>
          <Button 
            onClick={() => {
              toast({
                title: "New Presentation",
                description: "This feature will be available soon!",
              });
            }}
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            <span className="mr-2">+</span> New Presentation
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Presentation Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Presentation management features are coming soon. You'll be able to create new presentations,
              schedule presentations, and view presentation history from this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PresentationsPage;
