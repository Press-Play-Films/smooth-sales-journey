
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
  
  // Use a pattern that resembles real-world engagement trends
  // Rising engagement over time with small fluctuations
  const engagementTrend = Array(numDays).fill(0).map((_, i) => {
    // Base trend: engagement improves over time (upward trend)
    const trendPosition = i / numDays;
    const baseEngaged = 45 + (trendPosition * 15); // Start at ~45%, rise to ~60%
    
    // Add weekly pattern - better engagement midweek
    const dayOfWeek = (today.getDay() - (numDays - 1 - i) + 7) % 7;
    const weekdayFactor = dayOfWeek >= 1 && dayOfWeek <= 5 ? 5 : -5; // Better on weekdays
    
    // Add some randomness
    const randomFactor = Math.sin((i + seed) * 0.5) * 8;
    
    return baseEngaged + weekdayFactor + randomFactor;
  });
  
  for (let i = numDays - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const formattedDate = format(date, 'MMM d');
    
    // Get the engagement for this day from our trend array
    const engaged = Math.round(Math.max(30, Math.min(75, engagementTrend[numDays - 1 - i])));
    
    // Calculate distracted as inverse correlation to engaged (but not perfectly)
    const baseDistracted = Math.round(Math.max(10, Math.min(50, 100 - engaged - 10 + (Math.random() * 10 - 5))));
    
    // Ensure all percentages add up to 100%
    const distracted = Math.min(baseDistracted, 100 - engaged);
    const away = 100 - engaged - distracted;
    
    data.push({
      date: formattedDate,
      engaged,
      distracted,
      away
    });
  }
  
  return data;
};

/**
 * Generates realistic demo financial data
 * @param months Number of months to generate data for
 */
export const generateFinancialData = (months: number) => {
  const data = [];
  const baseRevenue = 250000;
  const baseClients = 145;
  const baseConversions = 48;
  
  // This simulates seasonal effects and growth
  for (let i = 0; i < months; i++) {
    // Simulate growth trend
    const growthFactor = 1 + (i * 0.03);
    
    // Simulate seasonal effects (Q2 and Q3 stronger)
    const monthIndex = i % 12;
    const seasonalFactor = 
      (monthIndex >= 3 && monthIndex <= 7) ? 1.2 :  // Strong in spring/summer
      (monthIndex >= 8 && monthIndex <= 10) ? 0.9 : // Weaker in fall
      1.0;                                         // Normal in winter
    
    // Add some random noise to make it realistic
    const randomFactor = 0.9 + (Math.random() * 0.2);
    
    const revenue = Math.round(baseRevenue * growthFactor * seasonalFactor * randomFactor);
    const clients = Math.round(baseClients * growthFactor * (0.95 + (Math.random() * 0.1)));
    const conversions = Math.round(baseConversions * growthFactor * seasonalFactor * (0.95 + (Math.random() * 0.1)));
    
    const monthName = new Date(2023, monthIndex, 1).toLocaleString('default', { month: 'short' });
    
    data.push({
      month: monthName,
      revenue,
      clients,
      conversions
    });
  }
  
  return data;
};

/**
 * Generates client transfer data between departments
 * @param days Number of days to generate data for
 */
export const generateTransferData = (days: number) => {
  const data = [];
  const departments = ['Sales', 'Finance', 'Exit Survey', 'Presentation'];
  
  for (let i = 0; i < days; i++) {
    const date = format(subDays(new Date(), days - i - 1), 'MMM d');
    
    const entry: Record<string, any> = { date };
    
    // Add transfer counts for each department
    departments.forEach(dept => {
      // Base values that vary by department
      const baseValue = dept === 'Sales' ? 20 : 
                        dept === 'Finance' ? 15 : 
                        dept === 'Exit Survey' ? 10 : 25;
      
      // Add day-of-week pattern
      const dayOfWeek = (new Date().getDay() - (days - i - 1) + 7) % 7;
      const weekdayFactor = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.8; // More on weekdays
      
      // Add randomness
      const randomFactor = 0.8 + (Math.random() * 0.4);
      
      entry[dept] = Math.round(baseValue * weekdayFactor * randomFactor);
    });
    
    data.push(entry);
  }
  
  return data;
};

/**
 * Generates realistic conversion data by sales team member
 */
export const generateTeamPerformanceData = () => {
  const teamMembers = [
    "Craig Boure", 
    "Sarah Miller", 
    "Michael Johnson", 
    "Jennifer Williams", 
    "Robert Davis",
    "Emily Thompson", 
    "David Wilson", 
    "Lisa Brown"
  ];
  
  return teamMembers.map(name => {
    // Base conversion rate varies by experience (simulated by position in array)
    const baseConversion = 63 + (Math.random() * 15);
    
    // Sales count also varies but not perfectly correlated with conversion rate
    const baseSales = 25 + (Math.random() * 20);
    
    return {
      name,
      sales: Math.round(baseSales),
      conversion: Math.round(baseConversion)
    };
  }).sort((a, b) => b.sales - a.sales); // Sort by sales descending
};
