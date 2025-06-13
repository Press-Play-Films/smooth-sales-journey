
/**
 * Demo Backend Service - Simulates API calls for demonstration purposes
 * In a real application, these would be actual HTTP requests to your backend
 */

import { Client, ActivePresentation, Sale, TeamMember } from '@/types/dashboard';

// Simulated API delay
const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Demo data storage (simulates a database)
const demoData = {
  clients: [
    {
      id: '1',
      names: 'John & Sarah Mitchell',
      status: 'engaged' as const,
      department: 'sales',
      roomNumber: '6391',
      assignedAgent: 'Alex Johnson',
      presentationTime: '10:00 AM',
      location: 'Miami, FL',
      city: 'Miami',
      state: 'Florida',
      image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
    },
    {
      id: '2',
      names: 'Michael Rodriguez',
      status: 'distracted' as const,
      department: 'sales',
      roomNumber: '6391',
      assignedAgent: 'Alex Johnson',
      presentationTime: '10:00 AM',
      location: 'Dallas, TX',
      city: 'Dallas',
      state: 'Texas',
      image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
    },
    {
      id: '3',
      names: 'Emma & David Chen',
      status: 'away' as const,
      department: 'finance',
      roomNumber: '6392',
      assignedAgent: 'Maria Garcia',
      presentationTime: '2:00 PM',
      location: 'Los Angeles, CA',
      city: 'Los Angeles',
      state: 'California',
      image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
    }
  ] as Client[],
  
  presentations: [
    {
      id: 'pres-001',
      title: 'Premium Vacation Package',
      presenter: 'Alex Johnson',
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      status: 'active',
      roomNumber: 'Room A',
      waveTime: '10:00 AM',
      clients: [
        {
          id: '1',
          names: 'John & Sarah Mitchell',
          status: 'engaged' as const,
          department: 'sales',
          roomNumber: '6391',
          assignedAgent: 'Alex Johnson',
          presentationTime: '10:00 AM',
          location: 'Miami, FL',
          city: 'Miami',
          state: 'Florida',
          image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
        },
        {
          id: '2',
          names: 'Michael Rodriguez',
          status: 'distracted' as const,
          department: 'sales',
          roomNumber: '6391',
          assignedAgent: 'Alex Johnson',
          presentationTime: '10:00 AM',
          location: 'Dallas, TX',
          city: 'Dallas',
          state: 'Texas',
          image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
        }
      ]
    },
    {
      id: 'pres-002',
      title: 'Family Resort Experience',
      presenter: 'Maria Garcia',
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      status: 'scheduled',
      roomNumber: 'Room B',
      waveTime: '2:00 PM',
      clients: [
        {
          id: '3',
          names: 'Emma & David Chen',
          status: 'away' as const,
          department: 'finance',
          roomNumber: '6392',
          assignedAgent: 'Maria Garcia',
          presentationTime: '2:00 PM',
          location: 'Los Angeles, CA',
          city: 'Los Angeles',
          state: 'California',
          image: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'
        }
      ]
    }
  ] as ActivePresentation[],

  sales: [
    {
      id: 'sale-001',
      presentationId: 'pres-001',
      clientId: '1',
      clientNames: 'John & Sarah Mitchell',
      packageType: 'Premium',
      paymentMethod: 'Credit Card',
      salesExecutive: 'Alex Johnson',
      toManager: 'Sarah Wilson',
      amount: 4500,
      transactionNotes: 'Upgraded to premium suite',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      waveTime: '10:00 AM',
      roomNumber: 'Room A'
    }
  ] as Sale[],

  teamMembers: [
    {
      id: 'team-001',
      name: 'Alex Johnson',
      role: 'Senior Sales Executive',
      department: 'Sales',
      status: 'active',
      avatar: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
      performance: {
        salesThisMonth: 15,
        conversionRate: 68,
        avgDealSize: 3200
      }
    },
    {
      id: 'team-002',
      name: 'Maria Garcia',
      role: 'Sales Executive',
      department: 'Sales',
      status: 'active',
      avatar: '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
      performance: {
        salesThisMonth: 12,
        conversionRate: 72,
        avgDealSize: 2800
      }
    }
  ] as TeamMember[]
};

// Simulated API endpoints
export const demoBackendApi = {
  // Client endpoints
  async getClients(): Promise<Client[]> {
    await simulateApiDelay();
    console.log('🌐 Demo API: Fetching clients');
    return [...demoData.clients];
  },

  async updateClientStatus(clientId: string, status: Client['status']): Promise<Client> {
    await simulateApiDelay();
    console.log(`🌐 Demo API: Updating client ${clientId} status to ${status}`);
    
    const client = demoData.clients.find(c => c.id === clientId);
    if (!client) throw new Error('Client not found');
    
    client.status = status;
    return { ...client };
  },

  // Presentation endpoints
  async getPresentations() {
    await simulateApiDelay();
    console.log('🌐 Demo API: Fetching presentations');
    return [...demoData.presentations];
  },

  async createPresentation(presentation: Omit<ActivePresentation, 'id'>): Promise<ActivePresentation> {
    await simulateApiDelay();
    console.log('🌐 Demo API: Creating new presentation');
    
    const newPresentation = {
      ...presentation,
      id: `pres-${Date.now()}`,
      clients: []
    } as ActivePresentation;
    
    demoData.presentations.push(newPresentation);
    return newPresentation;
  },

  // Sales endpoints
  async getSales(): Promise<Sale[]> {
    await simulateApiDelay();
    console.log('🌐 Demo API: Fetching sales');
    return [...demoData.sales];
  },

  async createSale(sale: Omit<Sale, 'id' | 'timestamp'>): Promise<Sale> {
    await simulateApiDelay();
    console.log('🌐 Demo API: Creating new sale');
    
    const newSale = {
      ...sale,
      id: `sale-${Date.now()}`,
      timestamp: new Date()
    };
    
    demoData.sales.push(newSale);
    return newSale;
  },

  // Team endpoints
  async getTeamMembers(): Promise<TeamMember[]> {
    await simulateApiDelay();
    console.log('🌐 Demo API: Fetching team members');
    return [...demoData.teamMembers];
  },

  // Analytics endpoints
  async getAnalytics() {
    await simulateApiDelay();
    console.log('🌐 Demo API: Fetching analytics');
    
    return {
      totalSales: demoData.sales.length,
      totalRevenue: demoData.sales.reduce((sum, sale) => sum + sale.amount, 0),
      activePresentations: demoData.presentations.filter(p => p.status === 'active').length,
      engagedClients: demoData.clients.filter(c => c.status === 'engaged').length,
      conversionRate: 65,
      avgDealSize: 3000
    };
  }
};

// Simulated WebSocket connection for real-time updates
export class DemoWebSocketService {
  private listeners: Array<(data: any) => void> = [];
  private intervalId: NodeJS.Timeout | null = null;

  connect() {
    console.log('🌐 Demo WebSocket: Connected');
    
    // Simulate real-time client status updates
    this.intervalId = setInterval(() => {
      const randomClient = demoData.clients[Math.floor(Math.random() * demoData.clients.length)];
      const statuses: Client['status'][] = ['engaged', 'distracted', 'away'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      if (randomClient.status !== newStatus) {
        randomClient.status = newStatus;
        
        this.notifyListeners({
          type: 'CLIENT_STATUS_UPDATE',
          data: { ...randomClient }
        });
      }
    }, 10000); // Update every 10 seconds
  }

  disconnect() {
    console.log('🌐 Demo WebSocket: Disconnected');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onMessage(callback: (data: any) => void) {
    this.listeners.push(callback);
  }

  private notifyListeners(data: any) {
    this.listeners.forEach(listener => listener(data));
  }
}

export const demoWebSocket = new DemoWebSocketService();
