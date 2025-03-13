
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { generateEngagementData } from '@/utils/dataGenerators';

const ClientEngagementTrends: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  
  const weeklyData = generateEngagementData(7, 'day');
  const monthlyData = generateEngagementData(30, 'day');
  
  const currentData = timeRange === 'weekly' ? weeklyData : monthlyData;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Client Engagement Trends</CardTitle>
            <CardDescription>
              Track client engagement over time
            </CardDescription>
          </div>
          <Tabs 
            defaultValue="weekly" 
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as 'weekly' | 'monthly')}
            className="w-[250px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={currentData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value}%`, undefined]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="engaged"
              name="Engaged"
              stroke="#4BC7B6"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="distracted"
              name="Distracted"
              stroke="#FF6B35"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="away"
              name="Away"
              stroke="#E5405E"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientEngagementTrends;
