
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DepartmentStatistics } from '@/types/dashboard';
import { ArrowRightIcon, Users, BarChart3, UserCheck } from "lucide-react";

interface DepartmentCardsProps {
  departments: DepartmentStatistics[];
}

const DepartmentCards: React.FC<DepartmentCardsProps> = ({ departments }) => {
  // Sort departments to reflect the client journey sequence
  const departmentOrder = ['Marketing', 'Presentation', 'Sales', 'Finance', 'Exit Survey'];
  
  // Create a copy of departments and sort them based on the predefined order
  const sortedDepartments = [...departments].sort((a, b) => {
    return departmentOrder.indexOf(a.department) - departmentOrder.indexOf(b.department);
  });
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="h-1 bg-gray-200 flex-grow">
          {departmentOrder.map((_, index) => (
            <div key={index} className="h-full bg-brio-navy" style={{ width: `${100 / departmentOrder.length}%` }} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedDepartments.map((dept, index) => (
          <Card key={dept.department} className="bg-gray-50 hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center">
                  {dept.department}
                  {index < sortedDepartments.length - 1 && (
                    <ArrowRightIcon className="w-4 h-4 ml-2 text-gray-400" />
                  )}
                </CardTitle>
                <p className="text-xs text-gray-500">Avg. Time: 45 min</p>
              </div>
              {getDepartmentIcon(dept.department)}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Clients:</span>
                  <span className="font-medium">{dept.clientCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Engagement:</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${dept.engagementRate}%` }}
                      />
                    </div>
                    <span className="font-medium">{dept.engagementRate}%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Conversion:</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${dept.conversionRate}%` }}
                      />
                    </div>
                    <span className="font-medium">{dept.conversionRate}%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200 mt-2">
                  {getRoomCount(dept.department)} virtual rooms • {getAgentCount(dept.department)} agents
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Helper functions for visual elements
const getDepartmentIcon = (department: string) => {
  switch (department) {
    case 'Marketing':
      return <Users className="w-5 h-5 text-purple-500" />;
    case 'Presentation':
      return <BarChart3 className="w-5 h-5 text-blue-500" />;
    case 'Sales':
      return <UserCheck className="w-5 h-5 text-green-500" />;
    case 'Finance':
      return <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>;
    case 'Exit Survey':
      return <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>;
    default:
      return null;
  }
};

const getRoomCount = (department: string) => {
  switch (department) {
    case 'Marketing':
      return 12;
    case 'Presentation':
      return 8;
    case 'Sales':
      return 15;
    case 'Finance':
      return 6;
    case 'Exit Survey':
      return 4;
    default:
      return 0;
  }
};

const getAgentCount = (department: string) => {
  switch (department) {
    case 'Marketing':
      return 14;
    case 'Presentation':
      return 6;
    case 'Sales':
      return 12;
    case 'Finance':
      return 5;
    case 'Exit Survey':
      return 3;
    default:
      return 0;
  }
};

export default DepartmentCards;
