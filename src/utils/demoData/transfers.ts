
import { Transfer } from '@/types/dashboard';
import { subDays } from 'date-fns';

// Current date reference
const now = new Date();

// Recent transfers
export const demoRecentTransfers: Transfer[] = [
  {
    id: 'transfer-001',
    clientNames: 'John & Jane Smith',
    clientId: 'client-011',
    fromDepartment: 'Presentation',
    toDepartment: 'Sales',
    fromAgent: 'Craig Boure',
    toAgent: 'Sarah Miller',
    roomNumber: '6391',
    timestamp: subDays(now, 0.0625), // 1.5 hours ago
    notes: 'Interested in premium package'
  },
  {
    id: 'transfer-002',
    clientNames: 'Robert & Mary Johnson',
    clientId: 'client-012',
    fromDepartment: 'Sales',
    toDepartment: 'Finance',
    fromAgent: 'Sarah Miller',
    toAgent: 'Jennifer Williams',
    roomNumber: '6392',
    timestamp: subDays(now, 0.125), // 3 hours ago
    notes: 'Ready to purchase'
  },
  {
    id: 'transfer-003',
    clientNames: 'David & Lisa Brown',
    clientId: 'client-013',
    fromDepartment: 'Finance',
    toDepartment: 'Exit Survey',
    fromAgent: 'Jennifer Williams',
    toAgent: 'Robert Davis',
    roomNumber: '6393',
    timestamp: subDays(now, 0.25), // 6 hours ago
    notes: 'Completed purchase'
  },
  {
    id: 'transfer-004',
    clientNames: 'Michael & Susan Green',
    clientId: 'client-014',
    fromDepartment: 'Presentation',
    toDepartment: 'Sales',
    fromAgent: 'Michael Johnson',
    toAgent: 'Craig Boure',
    roomNumber: '6394',
    timestamp: subDays(now, 0.5), // 12 hours ago
    notes: 'Highly interested'
  },
  {
    id: 'transfer-005',
    clientNames: 'Richard & Betty Clark',
    clientId: 'client-015',
    fromDepartment: 'Sales',
    toDepartment: 'Exit Survey',
    fromAgent: 'Sarah Miller',
    toAgent: 'Robert Davis',
    roomNumber: '6395',
    timestamp: subDays(now, 0.75), // 18 hours ago
    notes: 'Declined offer'
  }
];
