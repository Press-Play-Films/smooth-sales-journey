
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateEngagementData } from '@/utils/dataGenerators';

const ClientEngagementTrends: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7days' | '30days' | '90days'>('30days');
  const [viewType, setViewType] = useState<'area' | 'bar'>('area');
  
  // Generate demo data based on selected timeframe
  const data = generateEngagementData(
    timeframe === '7days' ? 7 : timeframe === '30days' ? 30 : 90, 
    'day'
  );
  
  return (
    <Card className="mb-6">
      <CardHeader className="space-y-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <CardTitle>Client Engagement Trends</CardTitle>
          <div className="flex space-x-4">
            <Tabs value={timeframe} onValueChange={(value: string) => setTimeframe(value as any)} className="w-[280px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="7days">7 Days</TabsTrigger>
                <TabsTrigger value="30days">30 Days</TabsTrigger>
                <TabsTrigger value="90days">90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tabs value={viewType} onValueChange={(value: string) => setViewType(value as any)} className="w-[120px]">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="area" className="px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                    <path d="M22 12v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5z" />
                  </svg>
                </TabsTrigger>
                <TabsTrigger value="bar" className="px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide">
                    <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M16 10v4" />
                    <path d="M19 17v-5" />
                    <path d="M22 17v-1" />
                  </svg>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-4">
          {viewType === 'area' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="engaged" 
                  name="Engaged"
                  stackId="1"
                  stroke="#4ade80" 
                  fill="#4ade80" 
                />
                <Area 
                  type="monotone" 
                  dataKey="distracted" 
                  name="Distracted"
                  stackId="1"
                  stroke="#fbbf24" 
                  fill="#fbbf24" 
                />
                <Area 
                  type="monotone" 
                  dataKey="away" 
                  name="Away"
                  stackId="1"
                  stroke="#f87171" 
                  fill="#f87171" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engaged" name="Engaged" stackId="a" fill="#4ade80" />
                <Bar dataKey="distracted" name="Distracted" stackId="a" fill="#fbbf24" />
                <Bar dataKey="away" name="Away" stackId="a" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-green-800 font-medium">Engaged</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-green-700">
                {data.length > 0 ? data[data.length - 1].engaged : 0}%
              </span>
              <p className="text-green-600 text-sm mt-1">
                {timeframe === '7days' ? '+5%' : timeframe === '30days' ? '+3%' : '+7%'} from previous period
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-yellow-800 font-medium">Distracted</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-yellow-700">
                {data.length > 0 ? data[data.length - 1].distracted : 0}%
              </span>
              <p className="text-yellow-600 text-sm mt-1">
                {timeframe === '7days' ? '-2%' : timeframe === '30days' ? '-1%' : '-4%'} from previous period
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-red-800 font-medium">Away</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-red-700">
                {data.length > 0 ? data[data.length - 1].away : 0}%
              </span>
              <p className="text-red-600 text-sm mt-1">
                {timeframe === '7days' ? '-3%' : timeframe === '30days' ? '-2%' : '-3%'} from previous period
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientEngagementTrends;
