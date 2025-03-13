
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TeamMemberStats {
  [key: string]: number;
  conversionRate?: number;
  salesWeek?: number;
  clientsAssigned?: number;
  presentationsToday?: number;
  presentationsWeek?: number;
  processedToday?: number;
  closingRate?: number;
  surveysToday?: number;
  recoveryRate?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl: string;
  initials: string;
  status: 'online' | 'offline';
  activePresentation?: boolean;
  stats: TeamMemberStats;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { toast } = useToast();

  return (
    <Card className="hover-lift">
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
          {renderStatsGrid(member)}
          
          {member.activePresentation && (
            <div className="text-center p-2 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">Currently in presentation</p>
            </div>
          )}
          
          {renderCardActions(member)}
        </div>
      </CardContent>
    </Card>
  );
};

const renderStatsGrid = (member: TeamMember) => {
  // Different stats based on department
  if (member.department === 'Presentations') {
    return (
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
    );
  } else if (member.department === 'Sales') {
    return (
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
    );
  } else if (member.department === 'Finance') {
    return (
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
    );
  } else if (member.department === 'Exit Survey') {
    return (
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
    );
  }
  return null;
};

const renderCardActions = (member: TeamMember) => {
  const { toast } = useToast();
  
  if (member.department === 'Presentations') {
    return (
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
    );
  } else if (member.department === 'Sales') {
    return (
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
    );
  }
  return null;
};

export default TeamMemberCard;
