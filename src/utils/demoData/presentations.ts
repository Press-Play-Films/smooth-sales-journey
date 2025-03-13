
import { ActivePresentation, UpcomingPresentation } from '@/types/dashboard';
import { addHours } from 'date-fns';
import { demoClients } from './clients';

// Current date reference for relative times
const now = new Date();

// Active presentations
export const demoActivePresentations: ActivePresentation[] = [
  {
    id: 'pres-001',
    title: 'Brio Vacations',
    presenter: 'Craig Boure',
    startTime: new Date(now.getTime() - 45 * 60000), // Started 45 minutes ago
    status: 'active',
    clients: demoClients.slice(0, 4), // First 4 clients
    roomNumber: '6391',
    waveTime: '12:30 PM'
  },
  {
    id: 'pres-002',
    title: 'Brio Vacation Experience',
    presenter: 'Sarah Miller',
    startTime: new Date(now.getTime() - 20 * 60000), // Started 20 minutes ago
    status: 'active',
    clients: demoClients.slice(4, 7), // Next 3 clients
    roomNumber: '6392',
    waveTime: '12:30 PM'
  }
];

// Upcoming presentations
export const demoUpcomingPresentations: UpcomingPresentation[] = [
  {
    id: 'pres-003',
    title: 'Brio Tour 1',
    presenter: 'Craig Boure',
    startTime: addHours(now, 2), // In 2 hours
    status: 'scheduled',
    clients: 6,
    roomNumber: '6391',
    waveTime: '3:30 PM'
  },
  {
    id: 'pres-004',
    title: 'Brio Tour 2',
    presenter: 'Sarah Miller',
    startTime: addHours(now, 4), // In 4 hours
    status: 'scheduled',
    clients: 4,
    roomNumber: '6392',
    waveTime: '3:30 PM'
  },
  {
    id: 'pres-005',
    title: 'Brio Tour 3',
    presenter: 'Michael Johnson',
    startTime: addHours(now, 6), // In 6 hours
    status: 'scheduled',
    clients: 5,
    roomNumber: '6394',
    waveTime: '6:00 PM'
  }
];

// Wave times available in the system
export const waveTimes = [
  '9:00 AM',
  '12:30 PM',
  '3:30 PM',
  '6:00 PM',
  '8:00 PM'
];

// Function to get presentations by wave time
export const getPresentationsByWave = (time: string) => {
  const active = demoActivePresentations.filter(p => p.waveTime === time);
  const upcoming = demoUpcomingPresentations.filter(p => p.waveTime === time);
  return { active, upcoming };
};

// Function to get presentations by room number
export const getPresentationsByRoom = (roomNumber: string) => {
  const active = demoActivePresentations.filter(p => p.roomNumber === roomNumber);
  const upcoming = demoUpcomingPresentations.filter(p => p.roomNumber === roomNumber);
  return { active, upcoming };
};

// Function to get team member assignments by wave time
export const getTeamMembersByWave = (time: string, teamMembers: any[]) => {
  return teamMembers.filter(member => 
    member.waveAssignments.some((assignment: any) => assignment.time === time)
  );
};

// Function to get team members assigned to a specific room
export const getTeamMembersByRoom = (roomNumber: string, teamMembers: any[]) => {
  return teamMembers.filter(member => 
    member.waveAssignments.some((assignment: any) => 
      assignment.roomNumbers.includes(roomNumber)
    )
  );
};

// New: Get presentation metrics with thresholds
export interface MetricThreshold {
  metric: string;
  warning: number;
  critical: number;
  direction: 'above' | 'below';
}

export const defaultMetricThresholds: MetricThreshold[] = [
  { metric: 'engagementRate', warning: 65, critical: 50, direction: 'below' },
  { metric: 'conversionRate', warning: 25, critical: 15, direction: 'below' },
  { metric: 'clientCount', warning: 25, critical: 15, direction: 'below' },
  { metric: 'away', warning: 20, critical: 40, direction: 'above' }
];

// Historic data for metrics (for time-based filtering)
export const generateHistoricData = (
  timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'
) => {
  let data = [];
  const baseEngagement = 75;
  const baseConversion = 35;
  
  // Generate data based on timeframe
  switch(timeframe) {
    case 'day':
      for (let hour = 9; hour <= 21; hour++) {
        data.push({
          label: `${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}`,
          engagementRate: Math.min(100, baseEngagement + Math.round(Math.sin(hour / 3) * 10 + Math.random() * 5)),
          conversionRate: Math.min(100, baseConversion + Math.round(Math.cos(hour / 4) * 7 + Math.random() * 4)),
          clientCount: Math.round(20 + Math.sin(hour / 2) * 8 + Math.random() * 5),
          away: Math.round(10 + Math.cos(hour / 2) * 5 + Math.random() * 3)
        });
      }
      break;
      
    case 'week':
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      days.forEach((day, i) => {
        data.push({
          label: day,
          engagementRate: Math.min(100, baseEngagement + Math.round(Math.sin(i / 2) * 8 + Math.random() * 4)),
          conversionRate: Math.min(100, baseConversion + Math.round(Math.cos(i / 3) * 6 + Math.random() * 4)),
          clientCount: Math.round(120 + Math.sin(i) * 30 + Math.random() * 10),
          away: Math.round(15 + Math.cos(i) * 7 + Math.random() * 5)
        });
      });
      break;
      
    case 'month':
      for (let i = 1; i <= 4; i++) {
        data.push({
          label: `Week ${i}`,
          engagementRate: Math.min(100, baseEngagement + Math.round(Math.sin(i) * 7 + Math.random() * 4)),
          conversionRate: Math.min(100, baseConversion + Math.round(Math.cos(i) * 5 + Math.random() * 3)),
          clientCount: Math.round(500 + Math.sin(i) * 100 + Math.random() * 50),
          away: Math.round(18 + Math.cos(i) * 6 + Math.random() * 4)
        });
      }
      break;
      
    case 'quarter':
      for (let i = 1; i <= 3; i++) {
        data.push({
          label: `Month ${i}`,
          engagementRate: Math.min(100, baseEngagement + Math.round(Math.sin(i / 1.5) * 6 + Math.random() * 4)),
          conversionRate: Math.min(100, baseConversion + Math.round(Math.cos(i / 2) * 5 + Math.random() * 3)),
          clientCount: Math.round(1500 + Math.sin(i) * 300 + Math.random() * 100),
          away: Math.round(17 + Math.cos(i) * 5 + Math.random() * 4)
        });
      }
      break;
      
    case 'year':
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      months.forEach((month, i) => {
        data.push({
          label: month,
          engagementRate: Math.min(100, baseEngagement + Math.round(Math.sin(i / 3) * 8 + Math.random() * 5)),
          conversionRate: Math.min(100, baseConversion + Math.round(Math.cos(i / 4) * 7 + Math.random() * 4)),
          clientCount: Math.round(5000 + Math.sin(i / 2) * 1000 + Math.random() * 300),
          away: Math.round(16 + Math.cos(i / 2) * 8 + Math.random() * 5)
        });
      });
      break;
  }
  
  return data;
};
