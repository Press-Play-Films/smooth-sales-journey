
export interface Client {
  id: string;
  names: string;
  location?: string;
  status: 'engaged' | 'distracted' | 'away';
  department?: 'sales' | 'finance' | 'exit-survey';
  roomNumber?: string;
  assignedAgent?: string;
  image?: string;
  presentationTime?: string;
}

export interface ActivePresentation {
  id: string;
  title: string;
  presenter: string;
  startTime: Date;
  status: string;
  clients: Client[];
  roomNumber: string;
  waveTime?: string;
}

export interface UpcomingPresentation {
  id: string;
  title: string;
  presenter: string;
  startTime: Date;
  status: string;
  clients: number;
  roomNumber: string;
  waveTime?: string;
}

export interface Transfer {
  id: string;
  clientNames: string;
  clientId: string;
  fromDepartment: string;
  toDepartment: string;
  fromAgent: string;
  toAgent: string;
  roomNumber: string;
  timestamp: Date;
  notes?: string;
}

export interface DepartmentStatistics {
  department: string;
  clientCount: number;
  engagementRate: number;
  conversionRate: number;
}

export interface TimeframeData {
  label: string;
  sales: number;
  transfers: number;
}

export interface EmployeePerformance {
  id: string;
  name: string;
  department: string;
  clientsHandled: number;
  conversions: number;
  conversionRate: number;
  avgEngagement: number;
  avgSessionTime: number;
}

export interface RoomPerformance {
  roomNumber: string;
  tours: number;
  conversionRate: number;
  avgClientCount: number;
  department: string;
}

export interface ClientJourney {
  clientId: string;
  clientNames: string;
  stages: {
    department: string;
    agent: string;
    timestamp: Date;
    duration: number;
    status: 'completed' | 'current' | 'pending';
  }[];
  currentStage: string;
  roomNumbers: string[];
}

export interface TeamMemberAssignment {
  id: string;
  name: string;
  role: string;
  waveAssignments: {
    time: string;
    roomNumbers: string[];
  }[];
}

