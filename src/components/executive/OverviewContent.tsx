
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';
import { 
  demoDepartmentStats, 
  generateDemoTimeframeData
} from '@/utils/demoData';
import DepartmentCards from './DepartmentCards';

interface OverviewContentProps {
  totalClients: number;
  avgEngagementRate: number;
  avgConversionRate: number;
}

const OverviewContent: React.FC<OverviewContentProps> = ({ 
  totalClients, 
  avgEngagementRate, 
  avgConversionRate 
}) => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');
  
  // Generate data for the selected timeframe
  const timeframeData = generateDemoTimeframeData(timeframe);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Total Clients"
          value={totalClients}
          description="Active clients across all departments"
        />
        <StatsCard 
          title="Average Engagement"
          value={`${avgEngagementRate}%`}
          description="Client engagement rate across all sessions"
        />
        <StatsCard 
          title="Conversion Rate"
          value={`${avgConversionRate}%`}
          description="Overall client conversion percentage"
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Performance by Department</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DepartmentCards departments={demoDepartmentStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Performance Trends</CardTitle>
            <div>
              <Tabs value={timeframe} onValueChange={(v: any) => setTimeframe(v)} className="w-[400px]">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={timeframeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="#0f766e" />
              <Bar dataKey="transfers" name="Transfers" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewContent;
