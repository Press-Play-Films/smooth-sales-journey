import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/executive/DashboardHeader';
import OverviewContent from '@/components/executive/OverviewContent';
import SalesContent from '@/components/executive/SalesContent';
import TeamContent from '@/components/executive/TeamContent';
import { demoDepartmentStats } from '@/utils/demoData';

const ExecutiveDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<'overview' | 'sales' | 'team'>('overview');

  // Enhanced department stats to reflect the complete client journey
  const departmentStats = [
    { department: 'Marketing', clientCount: 58, engagementRate: 72, conversionRate: 45 },
    { department: 'Presentation', clientCount: 48, engagementRate: 78, conversionRate: 52 },
    { department: 'Sales', clientCount: 35, engagementRate: 85, conversionRate: 65 },
    { department: 'Finance', clientCount: 27, engagementRate: 92, conversionRate: 88 },
    { department: 'Exit Survey', clientCount: 22, engagementRate: 62, conversionRate: 100 }
  ];

  // Calculate totals
  const totalClients = departmentStats.reduce((sum, dept) => sum + dept.clientCount, 0);
  const avgEngagementRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.engagementRate * dept.clientCount, 0) / totalClients
  );
  const avgConversionRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.conversionRate * dept.clientCount, 0) / totalClients
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
            departments={departmentStats}
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
