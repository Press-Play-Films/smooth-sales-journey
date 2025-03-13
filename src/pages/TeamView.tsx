
import React from 'react';
import Layout from '@/components/Layout';
import DepartmentSection from '@/components/team/DepartmentSection';
import TeamPageHeader from '@/components/team/TeamPageHeader';
import { TeamMember } from '@/components/team/TeamMemberCard';

// Mock team data (in a real app, this would come from an API)
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Craig Boure',
    role: 'Presenter',
    department: 'Presentations',
    avatarUrl: '',
    initials: 'CB',
    status: 'online',
    activePresentation: true,
    stats: {
      presentationsToday: 1,
      presentationsWeek: 5,
      conversionRate: 34
    }
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'Sales Agent',
    department: 'Sales',
    avatarUrl: '',
    initials: 'JS',
    status: 'online',
    stats: {
      clientsAssigned: 3,
      salesWeek: 2,
      conversionRate: 28
    }
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    role: 'Sales Agent',
    department: 'Sales',
    avatarUrl: '',
    initials: 'SJ',
    status: 'offline',
    stats: {
      clientsAssigned: 0,
      salesWeek: 3,
      conversionRate: 35
    }
  },
  {
    id: '4',
    name: 'Amanda Wilson',
    role: 'Finance Agent',
    department: 'Finance',
    avatarUrl: '',
    initials: 'AW',
    status: 'online',
    stats: {
      clientsAssigned: 2,
      processedToday: 5,
      closingRate: 85
    }
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'Exit Survey Agent',
    department: 'Exit Survey',
    avatarUrl: '',
    initials: 'JM',
    status: 'online',
    stats: {
      surveysToday: 7,
      recoveryRate: 12
    }
  }
];

const TeamView: React.FC = () => {
  // Filter team members by department
  const presenters = teamMembers.filter(member => member.department === 'Presentations');
  const salesAgents = teamMembers.filter(member => member.department === 'Sales');
  const financeAgents = teamMembers.filter(member => member.department === 'Finance');
  const exitSurveyAgents = teamMembers.filter(member => member.department === 'Exit Survey');
  
  return (
    <Layout>
      <div className="space-y-8">
        <TeamPageHeader />
        
        {/* Presenters Section */}
        <DepartmentSection 
          title="Presenters" 
          members={presenters} 
          columnLayout="triple"
        />
        
        {/* Sales Agents Section */}
        <DepartmentSection 
          title="Sales Agents" 
          members={salesAgents} 
          columnLayout="triple"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Finance Agents Section */}
          <DepartmentSection 
            title="Finance Agents" 
            members={financeAgents} 
            columnLayout="single"
          />
          
          {/* Exit Survey Agents Section */}
          <DepartmentSection 
            title="Exit Survey Agents" 
            members={exitSurveyAgents} 
            columnLayout="single"
          />
        </div>
      </div>
    </Layout>
  );
};

export default TeamView;
