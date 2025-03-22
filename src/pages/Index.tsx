
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-blue-600">Brio Sales Management</h1>
        <p className="mt-2 text-gray-600">
          Welcome to the Brio Sales Management application.
        </p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
            <CardDescription>View and manage your client records</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access detailed client information, track interactions, and manage client relationships.</p>
          </CardContent>
          <CardFooter>
            <Link to="/clients">
              <Button>Manage Clients</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Presentations</CardTitle>
            <CardDescription>Schedule and track presentations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create, schedule, and manage your sales presentations for potential clients.</p>
          </CardContent>
          <CardFooter>
            <Link to="/presentations">
              <Button>View Presentations</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View detailed analytics about your sales performance and client engagement.</p>
          </CardContent>
          <CardFooter>
            <Link to="/analytics">
              <Button>View Analytics</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-10 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          This application helps sales teams manage clients, track presentations, and analyze performance.
          Navigate through the cards above to access different sections of the application.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link to="/team">
            <Button variant="outline">Team View</Button>
          </Link>
          <Link to="/executive">
            <Button variant="outline">Executive Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
