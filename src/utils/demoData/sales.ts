
import { Sale } from '@/types/dashboard';

// Current date reference for relative times
const now = new Date();

// Demo sales data
export const demoSales: Sale[] = [
  {
    id: 'sale-001',
    presentationId: 'pres-001',
    clientId: 'client-001',
    clientNames: 'George & Lyn Whitehead',
    packageType: 'premium',
    paymentMethod: 'credit-card',
    salesExecutive: 'exec-001',
    toManager: 'manager-001',
    amount: 12999.99,
    transactionNotes: 'Upgraded from standard package. Additional resort credits included.',
    timestamp: new Date(now.getTime() - 24 * 60 * 60000), // 1 day ago
    waveTime: '12:30 PM',
    roomNumber: '6391'
  },
  {
    id: 'sale-002',
    presentationId: 'pres-002',
    clientId: 'client-005',
    clientNames: 'Brian & Stephanie Miller',
    packageType: 'military',
    paymentMethod: 'financing',
    salesExecutive: 'exec-002',
    toManager: 'manager-002',
    amount: 9999.99,
    transactionNotes: 'Military discount applied. Financing over 36 months.',
    timestamp: new Date(now.getTime() - 48 * 60 * 60000), // 2 days ago
    waveTime: '3:30 PM',
    roomNumber: '6392'
  },
  {
    id: 'sale-003',
    presentationId: 'pres-003',
    clientId: 'client-008',
    clientNames: 'Michael & Jennifer Wilson',
    packageType: 'standard',
    paymentMethod: 'cash',
    salesExecutive: 'exec-003',
    toManager: 'manager-001',
    amount: 7999.99,
    timestamp: new Date(now.getTime() - 72 * 60 * 60000), // 3 days ago
    waveTime: '6:00 PM',
    roomNumber: '6394'
  },
  {
    id: 'sale-004',
    presentationId: 'pres-004',
    clientId: 'client-003',
    clientNames: 'Philip & Traci Naegele',
    packageType: 'first-responder',
    paymentMethod: 'credit-card',
    salesExecutive: 'exec-004',
    toManager: 'manager-003',
    amount: 8999.99,
    transactionNotes: 'First responder discount applied.',
    timestamp: new Date(now.getTime() - 96 * 60 * 60000), // 4 days ago
    waveTime: '12:30 PM',
    roomNumber: '6393'
  }
];

// Function to get sales by date
export const getSalesByDate = (date: Date) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);
  
  return demoSales.filter(sale => {
    const saleDate = new Date(sale.timestamp);
    return saleDate >= targetDate && saleDate < nextDay;
  });
};

// Function to get sales by wave time
export const getSalesByWave = (waveTime: string) => {
  return demoSales.filter(sale => sale.waveTime === waveTime);
};

// Function to get sales by room number
export const getSalesByRoom = (roomNumber: string) => {
  return demoSales.filter(sale => sale.roomNumber === roomNumber);
};

// Function to get sales by package type
export const getSalesByPackage = (packageType: string) => {
  return demoSales.filter(sale => sale.packageType === packageType);
};

// Function to get sales by sales executive
export const getSalesBySalesExecutive = (salesExecutiveId: string) => {
  return demoSales.filter(sale => sale.salesExecutive === salesExecutiveId);
};

// Function to get sales by TO manager
export const getSalesByTOManager = (toManagerId: string) => {
  return demoSales.filter(sale => sale.toManager === toManagerId);
};

// Calculate total sales amount
export const calculateTotalSales = (sales: Sale[]) => {
  return sales.reduce((total, sale) => total + sale.amount, 0);
};

// Calculate sales counts by package type
export const getSalesCountByPackage = () => {
  const packageCounts: Record<string, number> = {
    premium: 0,
    military: 0,
    'first-responder': 0,
    standard: 0,
    renewal: 0
  };
  
  demoSales.forEach(sale => {
    if (packageCounts[sale.packageType] !== undefined) {
      packageCounts[sale.packageType]++;
    }
  });
  
  return packageCounts;
};
