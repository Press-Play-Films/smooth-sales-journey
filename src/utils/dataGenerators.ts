
import { format, subDays } from 'date-fns';

/**
 * Generates sample engagement data for visualization
 * @param numDays Number of days to generate data for
 * @param unit The unit of time ('day', 'week', 'month')
 */
export const generateEngagementData = (numDays: number, unit: 'day' | 'week' | 'month') => {
  const today = new Date();
  const data = [];
  
  // Create a seed value to make the data somewhat consistent
  const seed = today.getDate() + today.getMonth() * 30;
  
  for (let i = numDays - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const formattedDate = format(date, 'MMM d');
    
    // Use seeded random values that follow a pattern
    const baseEngaged = 50 + Math.sin((i + seed) * 0.5) * 15;
    const baseDistracted = 30 + Math.cos((i + seed) * 0.5) * 10;
    
    // Calculate values ensuring they add up to 100%
    const engaged = Math.round(baseEngaged);
    const distracted = Math.round(baseDistracted);
    const away = Math.round(100 - engaged - distracted);
    
    data.push({
      date: formattedDate,
      engaged,
      distracted,
      away
    });
  }
  
  return data;
};
