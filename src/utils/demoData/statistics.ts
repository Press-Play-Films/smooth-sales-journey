
import { DepartmentStatistics, TimeframeData } from '@/types/dashboard';

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
