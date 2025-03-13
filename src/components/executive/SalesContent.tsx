
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { packagePopularityData } from '@/utils/demoData';

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface SalesContentProps {
  timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year';
  historicData: any[];
}

const SalesContent: React.FC<SalesContentProps> = ({ timeframe, historicData }) => {
  // Calculate revenue based on conversion rate and client count
  const revenueData = historicData.map(item => ({
    ...item,
    revenue: Math.round(item.conversionRate * item.clientCount * 2.5)
  }));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend - {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
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
          <CardTitle>Clients & Conversions Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
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
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="clientCount" name="Total Clients" fill="#6366f1" stroke="#6366f1" />
              <Area yAxisId="right" type="monotone" dataKey="conversionRate" name="Conversion Rate %" fill="#0f766e" stroke="#0f766e" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Engagement vs Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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
              <Bar dataKey="engagementRate" name="Engagement %" fill="#6366f1" />
              <Bar dataKey="conversionRate" name="Conversion %" fill="#0f766e" />
              <Bar dataKey="away" name="Away %" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default SalesContent;
