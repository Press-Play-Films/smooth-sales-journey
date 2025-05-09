
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClientEngagementTrends from '@/components/analytics/ClientEngagementTrends';

const AnalyticsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Analytics</h2>
        </div>
        
        <ClientEngagementTrends />
        
        <Card>
          <CardHeader>
            <CardTitle>Additional Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              More analytics features are coming soon. You'll be able to view detailed statistics,
              generate reports, and track performance metrics from this page.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
