
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ClientProfile from '@/components/ClientProfile';
import { Button } from '@/components/ui/button';

const ClientView: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  
  if (!clientId) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-brio-navy mb-4">Client Not Found</h2>
          <p className="text-gray-500 mb-6">The client ID was not provided or is invalid.</p>
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-brio-navy hover:text-brio-teal flex items-center space-x-1 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <ClientProfile clientId={clientId} />
    </Layout>
  );
};

export default ClientView;
