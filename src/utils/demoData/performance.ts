
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

// Team member role assignments
export const teamMemberAssignments = [
  {
    id: 'team-001',
    name: 'Craig Boure',
    role: 'Presenter',
    waveAssignments: [
      { time: '12:30 PM', roomNumbers: ['6391'] },
      { time: '3:30 PM', roomNumbers: ['6392'] },
      { time: '6:00 PM', roomNumbers: ['6391'] }
    ]
  },
  {
    id: 'team-002',
    name: 'Sarah Miller',
    role: 'Presenter',
    waveAssignments: [
      { time: '12:30 PM', roomNumbers: ['6392'] },
      { time: '6:00 PM', roomNumbers: ['6392'] }
    ]
  },
  {
    id: 'team-003',
    name: 'Michael Johnson',
    role: 'Sales Executive',
    waveAssignments: [
      { time: '3:30 PM', roomNumbers: ['6393'] },
      { time: '6:00 PM', roomNumbers: ['6394'] }
    ]
  },
  {
    id: 'team-004',
    name: 'Jennifer Williams',
    role: 'Sales Executive',
    waveAssignments: [
      { time: '12:30 PM', roomNumbers: ['6393'] },
      { time: '3:30 PM', roomNumbers: ['6393'] }
    ]
  },
  {
    id: 'team-005',
    name: 'Robert Davis',
    role: 'T.O. Manager',
    waveAssignments: [
      { time: '12:30 PM', roomNumbers: ['6391', '6392', '6393'] },
      { time: '3:30 PM', roomNumbers: ['6392', '6393', '6394'] },
      { time: '6:00 PM', roomNumbers: ['6391', '6392', '6394', '6395'] }
    ]
  }
]

