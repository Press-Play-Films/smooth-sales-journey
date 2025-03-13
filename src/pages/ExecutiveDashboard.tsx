
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/executive/DashboardHeader';
import OverviewContent from '@/components/executive/OverviewContent';
import SalesContent from '@/components/executive/SalesContent';
import TeamContent from '@/components/executive/TeamContent';
import { 
  demoDepartmentStats
} from '@/utils/demoData';

const ExecutiveDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<'overview' | 'sales' | 'team'>('overview');

  // Calculate totals
  const totalClients = demoDepartmentStats.reduce((sum, dept) => sum + dept.clientCount, 0);
  const avgEngagementRate = Math.round(
    demoDepartmentStats.reduce((sum, dept) => sum + dept.engagementRate * dept.clientCount, 0) / totalClients
  );
  const avgConversionRate = Math.round(
    demoDepartmentStats.reduce((sum, dept) => sum + dept.conversionRate * dept.clientCount, 0) / totalClients
  );

  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader 
          selectedReport={selectedReport} 
          setSelectedReport={setSelectedReport} 
        />

        {selectedReport === 'overview' && (
          <OverviewContent 
            totalClients={totalClients}
            avgEngagementRate={avgEngagementRate}
            avgConversionRate={avgConversionRate}
          />
        )}

        {selectedReport === 'sales' && (
          <SalesContent />
        )}

        {selectedReport === 'team' && (
          <TeamContent />
        )}
      </div>
    </Layout>
  );
};

export default ExecutiveDashboard;
