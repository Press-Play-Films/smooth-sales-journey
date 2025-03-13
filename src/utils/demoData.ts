
// Demo data for the management presentation version
import { Client, ActivePresentation, UpcomingPresentation, Transfer, DepartmentStatistics, TimeframeData } from '@/types/dashboard';
import { subDays, addHours, addMinutes, addDays } from 'date-fns';

// Generate consistent demo client data
export const demoClients: Client[] = [
  { id: 'client-001', names: 'George & Lyn Whitehead', location: 'North Carolina', status: 'engaged', department: 'sales' },
  { id: 'client-002', names: 'Malinda & Larry Jones', location: 'Florida', status: 'distracted', department: 'sales' },
  { id: 'client-003', names: 'Philip & Traci Naegele', location: 'Georgia', status: 'engaged', department: 'finance' },
  { id: 'client-004', names: 'Scott & Renee White', location: 'Texas', status: 'engaged', department: 'finance' },
  { id: 'client-005', names: 'Brian & Stephanie Miller', location: 'California', status: 'engaged', department: 'sales' },
  { id: 'client-006', names: 'David & Karen Thompson', location: 'New York', status: 'away', department: 'exit-survey' },
  { id: 'client-007', names: 'Robert & Lisa Anderson', location: 'Arizona', status: 'distracted', department: 'sales' },
  { id: 'client-008', names: 'Michael & Jennifer Wilson', location: 'Colorado', status: 'engaged', department: 'finance' },
  { id: 'client-009', names: 'James & Patricia Martinez', location: 'Nevada', status: 'engaged', department: 'sales' },
  { id: 'client-010', names: 'John & Barbara Williams', location: 'Washington', status: 'distracted', department: 'exit-survey' },
];

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
    clients: demoClients.slice(0, 4) // First 4 clients
  },
  {
    id: 'pres-002',
    title: 'Brio Caribbean Experience',
    presenter: 'Sarah Miller',
    startTime: new Date(now.getTime() - 20 * 60000), // Started 20 minutes ago
    status: 'active',
    clients: demoClients.slice(4, 7) // Next 3 clients
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
    clients: 6
  },
  {
    id: 'pres-004',
    title: 'Brio Holiday Package',
    presenter: 'Sarah Miller',
    startTime: addHours(now, 4), // In 4 hours
    status: 'scheduled',
    clients: 4
  },
  {
    id: 'pres-005',
    title: 'Brio European Adventure',
    presenter: 'Michael Johnson',
    startTime: addHours(now, 6), // In 6 hours
    status: 'scheduled',
    clients: 5
  }
];

// Recent transfers
export const demoRecentTransfers: Transfer[] = [
  {
    id: 'transfer-001',
    clientNames: 'John & Jane Smith',
    fromDepartment: 'Presentation',
    toDepartment: 'Sales',
    timestamp: subDays(now, 0.0625) // 1.5 hours ago
  },
  {
    id: 'transfer-002',
    clientNames: 'Robert & Mary Johnson',
    fromDepartment: 'Sales',
    toDepartment: 'Finance',
    timestamp: subDays(now, 0.125) // 3 hours ago
  },
  {
    id: 'transfer-003',
    clientNames: 'David & Lisa Brown',
    fromDepartment: 'Finance',
    toDepartment: 'Exit Survey',
    timestamp: subDays(now, 0.25) // 6 hours ago
  },
  {
    id: 'transfer-004',
    clientNames: 'Michael & Susan Green',
    fromDepartment: 'Presentation',
    toDepartment: 'Sales',
    timestamp: subDays(now, 0.5) // 12 hours ago
  },
  {
    id: 'transfer-005',
    clientNames: 'Richard & Betty Clark',
    fromDepartment: 'Sales',
    toDepartment: 'Exit Survey',
    timestamp: subDays(now, 0.75) // 18 hours ago
  }
];

// Department statistics
export const demoDepartmentStats: DepartmentStatistics[] = [
  { department: 'Sales', clientCount: 48, engagementRate: 78, conversionRate: 32 },
  { department: 'Finance', clientCount: 27, engagementRate: 85, conversionRate: 65 },
  { department: 'Exit Survey', clientCount: 35, engagementRate: 62, conversionRate: 42 }
];

// Generate time series data for charts
export const generateDemoTimeframeData = (period: 'day' | 'week' | 'month' | 'year'): TimeframeData[] => {
  if (period === 'day') {
    return [
      { label: '9 AM', sales: 3, transfers: 2 },
      { label: '10 AM', sales: 5, transfers: 7 },
      { label: '11 AM', sales: 7, transfers: 5 },
      { label: '12 PM', sales: 2, transfers: 3 },
      { label: '1 PM', sales: 6, transfers: 4 },
      { label: '2 PM', sales: 8, transfers: 6 },
      { label: '3 PM', sales: 7, transfers: 10 },
      { label: '4 PM', sales: 5, transfers: 8 }
    ];
  } else if (period === 'week') {
    return [
      { label: 'Monday', sales: 15, transfers: 23 },
      { label: 'Tuesday', sales: 22, transfers: 27 },
      { label: 'Wednesday', sales: 28, transfers: 32 },
      { label: 'Thursday', sales: 25, transfers: 29 },
      { label: 'Friday', sales: 30, transfers: 35 },
      { label: 'Saturday', sales: 18, transfers: 21 },
      { label: 'Sunday', sales: 12, transfers: 15 }
    ];
  } else if (period === 'month') {
    return [
      { label: 'Week 1', sales: 125, transfers: 145 },
      { label: 'Week 2', sales: 132, transfers: 156 },
      { label: 'Week 3', sales: 140, transfers: 165 },
      { label: 'Week 4', sales: 148, transfers: 172 }
    ];
  } else {
    return [
      { label: 'Jan', sales: 580, transfers: 620 },
      { label: 'Feb', sales: 540, transfers: 610 },
      { label: 'Mar', sales: 620, transfers: 680 },
      { label: 'Apr', sales: 680, transfers: 720 },
      { label: 'May', sales: 720, transfers: 750 },
      { label: 'Jun', sales: 760, transfers: 790 },
      { label: 'Jul', sales: 800, transfers: 820 },
      { label: 'Aug', sales: 780, transfers: 800 },
      { label: 'Sep', sales: 760, transfers: 780 },
      { label: 'Oct', sales: 720, transfers: 740 },
      { label: 'Nov', sales: 680, transfers: 700 },
      { label: 'Dec', sales: 650, transfers: 670 }
    ];
  }
};

// Monthly performance data
export const monthlyPerformanceData = [
  { month: 'Jan', revenue: 250000, clients: 145, conversions: 48 },
  { month: 'Feb', revenue: 310000, clients: 162, conversions: 57 },
  { month: 'Mar', revenue: 350000, clients: 178, conversions: 63 },
  { month: 'Apr', revenue: 410000, clients: 192, conversions: 71 },
  { month: 'May', revenue: 460000, clients: 215, conversions: 78 },
  { month: 'Jun', revenue: 520000, clients: 234, conversions: 82 },
  { month: 'Jul', revenue: 490000, clients: 221, conversions: 75 },
  { month: 'Aug', revenue: 470000, clients: 208, conversions: 72 },
];

// Package popularity data
export const packagePopularityData = [
  { name: 'Basic Package', value: 25 },
  { name: 'Premium Package', value: 40 },
  { name: 'Luxury Experience', value: 20 },
  { name: 'Adventure Bundle', value: 15 },
];

// Team performance data
export const teamPerformanceData = [
  { name: 'Craig Boure', sales: 42, conversion: 68 },
  { name: 'Sarah Miller', sales: 38, conversion: 72 },
  { name: 'Michael Johnson', sales: 31, conversion: 65 },
  { name: 'Jennifer Williams', sales: 36, conversion: 70 },
  { name: 'Robert Davis', sales: 28, conversion: 63 },
];
