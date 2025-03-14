
import React from 'react';
import Layout from '@/components/Layout';
import PresentationList from '@/components/presentation/PresentationList';
import PresentationFilters from '@/components/presentation/PresentationFilters';
import CRMStatusIndicator from '@/components/salesforce/CRMStatusIndicator';

const PresentationsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Presentations</h1>
          <CRMStatusIndicator variant="compact" className="self-start sm:self-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <div>
            <PresentationFilters />
            
            {/* CRM Status Card */}
            <div className="mt-4 hidden md:block">
              <CRMStatusIndicator variant="full" />
            </div>
          </div>
          
          <PresentationList />
        </div>
      </div>
    </Layout>
  );
};

export default PresentationsPage;
