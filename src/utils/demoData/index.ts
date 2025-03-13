
// Main export file for demo data
// Combines all demo data from separate files

// Export clients data
export { demoClients } from './clients';

// Export presentations data
export { 
  demoActivePresentations,
  demoUpcomingPresentations,
  waveTimes,
  getPresentationsByWave,
  getPresentationsByRoom,
  getTeamMembersByWave,
  getTeamMembersByRoom
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
  teamPerformanceData,
  teamMemberAssignments
} from './performance';

// Export sales data
export {
  demoSales,
  getSalesByDate,
  getSalesByWave,
  getSalesByRoom,
  getSalesByPackage,
  getSalesBySalesExecutive,
  getSalesByTOManager,
  calculateTotalSales,
  getSalesCountByPackage
} from './sales';
