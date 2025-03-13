
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DepartmentStatistics, TimeframeData } from '@/types/dashboard';
import StatsCard from '@/components/dashboard/StatsCard';

const ExecutiveDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');

  // Mock data for department statistics (in a real app, this would come from an API)
  const departmentStats: DepartmentStatistics[] = [
    { department: 'Sales', clientCount: 48, engagementRate: 78, conversionRate: 32 },
    { department: 'Finance', clientCount: 27, engagementRate: 85, conversionRate: 65 },
    { department: 'Exit Survey', clientCount: 35, engagementRate: 62, conversionRate: 42 }
  ];

  // Mock data for time series visualization
  const generateTimeframeData = (period: 'day' | 'week' | 'month' | 'year'): TimeframeData[] => {
    if (period === 'day') {
      return [
        { label: '9 AM', sales: 3, transfers: 2 },
        { label: '10 AM', sales: 5, transfers: 7 },
        { label: '11 AM', sales: 7, transfers: 5 },
        { label: '12 PM', sales: 2, transfers: 3 },
        { label: '1 PM', sales: 6, transfers: 4 },
        { label: '2 PM', sales: 8, transfers: 6 },
        { label: '3 PM', sales: 7, transfers: 10 },
        { label: '4 PM', sales: 5, transfers: 8 }
      ];
    } else if (period === 'week') {
      return [
        { label: 'Monday', sales: 15, transfers: 23 },
        { label: 'Tuesday', sales: 22, transfers: 27 },
        { label: 'Wednesday', sales: 28, transfers: 32 },
        { label: 'Thursday', sales: 25, transfers: 29 },
        { label: 'Friday', sales: 30, transfers: 35 },
        { label: 'Saturday', sales: 18, transfers: 21 },
        { label: 'Sunday', sales: 12, transfers: 15 }
      ];
    } else if (period === 'month') {
      return [
        { label: 'Week 1', sales: 125, transfers: 145 },
        { label: 'Week 2', sales: 132, transfers: 156 },
        { label: 'Week 3', sales: 140, transfers: 165 },
        { label: 'Week 4', sales: 148, transfers: 172 }
      ];
    } else {
      return [
        { label: 'Jan', sales: 580, transfers: 620 },
        { label: 'Feb', sales: 540, transfers: 610 },
        { label: 'Mar', sales: 620, transfers: 680 },
        { label: 'Apr', sales: 680, transfers: 720 },
        { label: 'May', sales: 720, transfers: 750 },
        { label: 'Jun', sales: 760, transfers: 790 },
        { label: 'Jul', sales: 800, transfers: 820 },
        { label: 'Aug', sales: 780, transfers: 800 },
        { label: 'Sep', sales: 760, transfers: 780 },
        { label: 'Oct', sales: 720, transfers: 740 },
        { label: 'Nov', sales: 680, transfers: 700 },
        { label: 'Dec', sales: 650, transfers: 670 }
      ];
    }
  };

  const timeframeData = generateTimeframeData(timeframe);

  // Calculate totals
  const totalClients = departmentStats.reduce((sum, dept) => sum + dept.clientCount, 0);
  const avgEngagementRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.engagementRate * dept.clientCount, 0) / totalClients
  );
  const avgConversionRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.conversionRate * dept.clientCount, 0) / totalClients
  );

  const handleExportData = () => {
    // In a real app, this would generate and download CSV data
    alert('This would export the current data to Excel/CSV in a real application.');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brio-navy">Executive Dashboard</h2>
          <Button 
            onClick={handleExportData}
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            Export to Excel
          </Button>
        </div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {departmentStats.map((dept) => (
                <Card key={dept.department} className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{dept.department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Clients:</span>
                        <span className="font-medium">{dept.clientCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Engagement:</span>
                        <span className="font-medium">{dept.engagementRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Conversion:</span>
                        <span className="font-medium">{dept.conversionRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
      </div>
    </Layout>
  );
};

export default ExecutiveDashboard;
