
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { teamPerformanceData } from '@/utils/demoData';

interface TeamContentProps {
  timeframe?: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

const TeamContent: React.FC<TeamContentProps> = ({ timeframe = 'week' }) => {
  // Generate team performance trend data based on timeframe
  const generateTeamTrendData = () => {
    let periods: string[] = [];
    
    switch(timeframe) {
      case 'day':
        periods = ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM'];
        break;
      case 'week':
        periods = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case 'month':
        periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        break;
      case 'quarter':
        periods = ['Month 1', 'Month 2', 'Month 3'];
        break;
      case 'year':
        periods = ['Q1', 'Q2', 'Q3', 'Q4'];
        break;
    }
    
    return periods.map(period => {
      const baseData: any = { period };
      
      // Add performance data for each team member
      teamPerformanceData.forEach(member => {
        // Generate somewhat consistent but varied data
        const nameSeed = member.name.charCodeAt(0);
        const periodSeed = period.charCodeAt(0);
        const randomFactor = Math.sin(nameSeed * periodSeed) * 10;
        
        baseData[member.name] = Math.max(50, 
          Math.min(90, Math.round(member.conversion + randomFactor))
        );
      });
      
      return baseData;
    });
  };
  
  const teamTrendData = generateTeamTrendData();
  
  // Calculate team averages
  const teamAverage = Math.round(
    teamPerformanceData.reduce((sum, member) => sum + member.conversion, 0) / 
    teamPerformanceData.length
  );
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Team Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={teamTrendData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              {teamPerformanceData.map((member, index) => (
                <Line 
                  key={member.name}
                  type="monotone" 
                  dataKey={member.name} 
                  stroke={getColorByIndex(index)} 
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Conversion Rate by Team Member</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={teamPerformanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversion" name="Conversion Rate %" fill="#0f766e" />
              <Bar dataKey="sales" name="Sales (MTD)" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-md border">
            <p className="text-sm text-gray-500">
              Team Average Conversion Rate: <span className="font-medium text-gray-900">{teamAverage}%</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
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
    </>
  );
};

// Helper function to get color by index
const getColorByIndex = (index: number) => {
  const colors = ['#0f766e', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981'];
  return colors[index % colors.length];
};

export default TeamContent;
