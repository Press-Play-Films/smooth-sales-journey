
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell, Scatter, ScatterChart, ZAxis
} from 'recharts';
import StatsCard from '@/components/dashboard/StatsCard';
import DepartmentCards from './DepartmentCards';
import { DepartmentStatistics } from '@/types/dashboard';

interface OverviewContentProps {
  totalClients: number;
  avgEngagementRate: number;
  avgConversionRate: number;
  departments: DepartmentStatistics[];
  timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year';
  historicData: any[];
}

const OverviewContent: React.FC<OverviewContentProps> = ({ 
  totalClients, 
  avgEngagementRate, 
  avgConversionRate,
  departments,
  timeframe,
  historicData
}) => {
  // Demo data for client flow visualization
  const flowData = [
    { name: 'Marketing', value: 100, color: '#8b5cf6' },
    { name: 'Presentation', value: 85, color: '#3b82f6' },
    { name: 'Sales', value: 65, color: '#10b981' },
    { name: 'Finance', value: 48, color: '#f59e0b' },
    { name: 'Exit Survey', value: 42, color: '#ef4444' }
  ];

  // Virtual room allocation data for visualization
  const roomData = [
    { name: 'Room 6391', tours: 12, conversionRate: 75 },
    { name: 'Room 6392', tours: 15, conversionRate: 60 },
    { name: 'Room 6393', tours: 10, conversionRate: 80 },
    { name: 'Room 6394', tours: 14, conversionRate: 65 },
    { name: 'Room 6395', tours: 9, conversionRate: 55 }
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
            <CardTitle>Client Journey Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DepartmentCards departments={departments} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Client Flow Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={flowData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  name="Clients" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              {flowData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full mb-1"></div>
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Virtual Room Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid />
                <XAxis type="number" dataKey="tours" name="Daily Tours" unit="" />
                <YAxis type="number" dataKey="conversionRate" name="Conversion Rate" unit="%" />
                <ZAxis range={[100, 200]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [`${value}${name === 'conversionRate' ? '%' : ''}`, name === 'conversionRate' ? 'Conversion Rate' : 'Tours']} />
                <Scatter name="Rooms" data={roomData} fill="#8884d8">
                  {roomData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-5 gap-2 mt-4">
              {roomData.map((room, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium">{room.name}</div>
                  <div className="text-xs text-gray-500">{room.conversionRate}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Performance Trends - {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={historicData}
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
              <Bar dataKey="engagementRate" name="Engagement %" fill="#0f766e" />
              <Bar dataKey="conversionRate" name="Conversion %" fill="#6366f1" />
              <Bar dataKey="clientCount" name="Client Count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewContent;
