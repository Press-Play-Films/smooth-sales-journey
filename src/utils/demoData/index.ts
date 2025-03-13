
// Main export file for demo data
// Combines all demo data from separate files

// Export clients data
export { demoClients } from './clients';

// Export presentations data
export { 
  demoActivePresentations,
  demoUpcomingPresentations
} from './presentations';

// Export transfers data
export { demoRecentTransfers } from './transfers';

// Export statistics data
export {
  demoDepartmentStats,
  generateDemoTimeframeData
} from './statistics';

// Export performance data
export {
  monthlyPerformanceData,
  packagePopularityData,
  teamPerformanceData
} from './performance';
