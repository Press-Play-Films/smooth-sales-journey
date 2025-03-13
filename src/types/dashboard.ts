
export interface Client {
  id: string;
  names: string;
  location?: string;
  status: 'engaged' | 'distracted' | 'away';
}

export interface ActivePresentation {
  id: string;
  title: string;
  presenter: string;
  startTime: Date;
  status: string;
  clients: Client[];
}

export interface UpcomingPresentation {
  id: string;
  title: string;
  presenter: string;
  startTime: Date;
  status: string;
  clients: number;
}

export interface Transfer {
  id: string;
  clientNames: string;
  fromDepartment: string;
  toDepartment: string;
  timestamp: Date;
}
