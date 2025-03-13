
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <Layout>
      <Card className="mb-6 border-blue-100 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Welcome to Brio Sales Management</h3>
              <p className="text-sm text-blue-600 mt-1">
                This is the employee dashboard for managing your daily tasks. For executive-level data and reports, 
                switch to <span className="font-semibold">Executive View</span> using the toggle in the header.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dashboard />
    </Layout>
  );
};

export default Index;
