
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PresentationList from '@/components/presentation/PresentationList';
import PresentationFilters from '@/components/presentation/PresentationFilters';
import CRMStatusIndicator from '@/components/salesforce/CRMStatusIndicator';
import { usePresentations } from '@/utils/demoData'; // Assuming this hook exists

const PresentationsPage: React.FC = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Mock presentation data
  const { presentations, status } = usePresentations();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Presentations</h1>
          <CRMStatusIndicator variant="compact" className="self-start sm:self-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <div>
            <PresentationFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
              dateRange={dateRange}
              setDateRange={setDateRange}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            
            {/* CRM Status Card */}
            <div className="mt-4 hidden md:block">
              <CRMStatusIndicator variant="full" />
            </div>
          </div>
          
          <PresentationList 
            title="All Presentations"
            presentations={presentations}
            status={status}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PresentationsPage;
