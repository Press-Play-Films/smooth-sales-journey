
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
    roomNumber: '6391'
  },
  {
    id: 'pres-002',
    title: 'Brio Caribbean Experience',
    presenter: 'Sarah Miller',
    startTime: new Date(now.getTime() - 20 * 60000), // Started 20 minutes ago
    status: 'active',
    clients: demoClients.slice(4, 7), // Next 3 clients
    roomNumber: '6392'
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
    roomNumber: '6391'
  },
  {
    id: 'pres-004',
    title: 'Brio Holiday Package',
    presenter: 'Sarah Miller',
    startTime: addHours(now, 4), // In 4 hours
    status: 'scheduled',
    clients: 4,
    roomNumber: '6392'
  },
  {
    id: 'pres-005',
    title: 'Brio European Adventure',
    presenter: 'Michael Johnson',
    startTime: addHours(now, 6), // In 6 hours
    status: 'scheduled',
    clients: 5,
    roomNumber: '6394'
  }
];
