
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';
import { 
  demoDepartmentStats, 
  generateDemoTimeframeData, 
  monthlyPerformanceData,
  packagePopularityData,
  teamPerformanceData
} from '@/utils/demoData';
import { format } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExecutiveDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'sales' | 'team'>('overview');

  // Generate data for the selected timeframe
  const timeframeData = generateDemoTimeframeData(timeframe);

  // Calculate totals
  const totalClients = demoDepartmentStats.reduce((sum, dept) => sum + dept.clientCount, 0);
  const avgEngagementRate = Math.round(
    demoDepartmentStats.reduce((sum, dept) => sum + dept.engagementRate * dept.clientCount, 0) / totalClients
  );
  const avgConversionRate = Math.round(
    demoDepartmentStats.reduce((sum, dept) => sum + dept.conversionRate * dept.clientCount, 0) / totalClients
  );

  const handleExportData = () => {
    // In a real app, this would generate and download CSV data
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    alert(`Brio Sales Report ${currentDate}.xlsx would be downloaded in a production environment.`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brio-navy">Executive Dashboard</h2>
          <div className="flex space-x-4">
            <Tabs 
              value={selectedReport} 
              onValueChange={(v: any) => setSelectedReport(v)}
              className="border rounded-lg overflow-hidden"
            >
              <TabsList className="grid grid-cols-3 w-[300px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              onClick={handleExportData}
              className="bg-brio-navy hover:bg-brio-navy/90"
            >
              Export to Excel
            </Button>
          </div>
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

        {selectedReport === 'overview' && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Performance by Department</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {demoDepartmentStats.map((dept) => (
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
          </>
        )}

        {selectedReport === 'sales' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={monthlyPerformanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#0f766e" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Package Popularity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={packagePopularityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {packagePopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Clients & Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="clients" name="Total Clients" fill="#6366f1" />
                    <Bar dataKey="conversions" name="Conversions" fill="#0f766e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}

        {selectedReport === 'team' && (
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Member
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales (MTD)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conversion Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamPerformanceData.map((member, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{member.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{member.sales}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{member.conversion}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.conversion > 70 ? 'bg-green-100 text-green-800' : 
                            member.conversion > 65 ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.conversion > 70 ? 'Excellent' : 
                             member.conversion > 65 ? 'Good' : 'Average'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ExecutiveDashboard;
