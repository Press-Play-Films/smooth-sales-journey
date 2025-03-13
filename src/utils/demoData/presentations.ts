
import { ActivePresentation, UpcomingPresentation } from '@/types/dashboard';
import { addHours } from 'date-fns';
import { demoClients } from './clients';

// Current date reference for relative times
const now = new Date();

// Active presentations
export const demoActivePresentations: ActivePresentation[] = [
  {
    id: 'pres-001',
    title: 'Brio Vacations Premium Package',
    presenter: 'Craig Boure',
    startTime: new Date(now.getTime() - 45 * 60000), // Started 45 minutes ago
    status: 'active',
    clients: demoClients.slice(0, 4), // First 4 clients
    roomNumber: '6391',
    waveTime: '12:30 PM'
  },
  {
    id: 'pres-002',
    title: 'Brio Caribbean Experience',
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
    title: 'Brio Summer Special',
    presenter: 'Craig Boure',
    startTime: addHours(now, 2), // In 2 hours
    status: 'scheduled',
    clients: 6,
    roomNumber: '6391',
    waveTime: '3:30 PM'
  },
  {
    id: 'pres-004',
    title: 'Brio Holiday Package',
    presenter: 'Sarah Miller',
    startTime: addHours(now, 4), // In 4 hours
    status: 'scheduled',
    clients: 4,
    roomNumber: '6392',
    waveTime: '3:30 PM'
  },
  {
    id: 'pres-005',
    title: 'Brio European Adventure',
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

