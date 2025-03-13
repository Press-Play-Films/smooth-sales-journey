
import React from 'react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock team data (in a real app, this would come from an API)
const teamMembers = [
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
    activePresentation: false,
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
    activePresentation: false,
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
    activePresentation: false,
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
    activePresentation: false,
    stats: {
      surveysToday: 7,
      recoveryRate: 12
    }
  }
];

const TeamView: React.FC = () => {
  const { toast } = useToast();
  
  // Filter team members by department
  const presenters = teamMembers.filter(member => member.department === 'Presentations');
  const salesAgents = teamMembers.filter(member => member.department === 'Sales');
  const financeAgents = teamMembers.filter(member => member.department === 'Finance');
  const exitSurveyAgents = teamMembers.filter(member => member.department === 'Exit Survey');
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Team Management</h2>
          <button 
            onClick={() => {
              toast({
                title: "Team Management",
                description: "This feature will be available soon!",
              });
            }}
            className="bg-brio-navy hover:bg-brio-navy/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Team Member</span>
          </button>
        </div>
        
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Presenters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presenters.map(member => (
              <Card key={member.id} className="hover-lift">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-brio-navy to-brio-teal text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Badge className={
                      member.status === 'online' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }>
                      {member.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Today</p>
                        <p className="font-semibold">{member.stats.presentationsToday}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">This Week</p>
                        <p className="font-semibold">{member.stats.presentationsWeek}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Conversion</p>
                        <p className="font-semibold">{member.stats.conversionRate}%</p>
                      </div>
                    </div>
                    
                    {member.activePresentation && (
                      <div className="text-center p-2 bg-blue-50 rounded-md border border-blue-100">
                        <p className="text-sm text-blue-800">Currently in presentation</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-2">
                      <button 
                        onClick={() => {
                          toast({
                            title: "View Schedule",
                            description: `Viewing schedule for ${member.name}`,
                          });
                        }}
                        className="text-sm text-brio-navy hover:text-brio-teal transition-colors"
                      >
                        View Schedule
                      </button>
                      <button 
                        onClick={() => {
                          toast({
                            title: "Message Sent",
                            description: `Your message has been sent to ${member.name}`,
                          });
                        }}
                        className="text-sm text-brio-navy hover:text-brio-teal transition-colors"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Sales Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salesAgents.map(member => (
              <Card key={member.id} className="hover-lift">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={member.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-brio-navy to-brio-teal text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Badge className={
                      member.status === 'online' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }>
                      {member.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Assigned</p>
                        <p className="font-semibold">{member.stats.clientsAssigned}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Sales (Week)</p>
                        <p className="font-semibold">{member.stats.salesWeek}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Conversion</p>
                        <p className="font-semibold">{member.stats.conversionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <button 
                        onClick={() => {
                          toast({
                            title: "View Clients",
                            description: `Viewing clients assigned to ${member.name}`,
                          });
                        }}
                        className="text-sm text-brio-navy hover:text-brio-teal transition-colors"
                      >
                        View Clients
                      </button>
                      <button 
                        onClick={() => {
                          toast({
                            title: "Message Sent",
                            description: `Your message has been sent to ${member.name}`,
                          });
                        }}
                        className="text-sm text-brio-navy hover:text-brio-teal transition-colors"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section>
            <h3 className="text-2xl font-semibold text-brio-navy mb-4">Finance Agents</h3>
            <div className="grid grid-cols-1 gap-4">
              {financeAgents.map(member => (
                <Card key={member.id} className="hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={member.avatarUrl} />
                          <AvatarFallback className="bg-gradient-to-br from-brio-navy to-brio-teal text-white">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                        </div>
                      </div>
                      <Badge className={
                        member.status === 'online' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }>
                        {member.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-500">Assigned</p>
                          <p className="font-semibold">{member.stats.clientsAssigned}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-500">Processed</p>
                          <p className="font-semibold">{member.stats.processedToday}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-500">Closing</p>
                          <p className="font-semibold">{member.stats.closingRate}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          <section>
            <h3 className="text-2xl font-semibold text-brio-navy mb-4">Exit Survey Agents</h3>
            <div className="grid grid-cols-1 gap-4">
              {exitSurveyAgents.map(member => (
                <Card key={member.id} className="hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={member.avatarUrl} />
                          <AvatarFallback className="bg-gradient-to-br from-brio-navy to-brio-teal text-white">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                        </div>
                      </div>
                      <Badge className={
                        member.status === 'online' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }>
                        {member.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-2 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-500">Surveys (Today)</p>
                          <p className="font-semibold">{member.stats.surveysToday}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-md">
                          <p className="text-xs text-gray-500">Recovery Rate</p>
                          <p className="font-semibold">{member.stats.recoveryRate}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TeamView;
