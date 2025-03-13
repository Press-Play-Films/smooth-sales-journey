
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ClientCard from './ClientCard';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  // Example data for active presentations
  const activePresentations = [
    {
      id: 'pres-001',
      title: 'Brio Vacations Premium Package',
      presenter: 'Craig Boure',
      startTime: new Date(),
      status: 'active',
      clients: [
        { id: 'client-001', names: 'George & Lyn Whitehead', location: 'North Carolina', status: 'engaged' as 'engaged' },
        { id: 'client-002', names: 'Malinda & Larry Jones', location: 'Florida', status: 'distracted' as 'distracted' },
        { id: 'client-003', names: 'Philip & Traci Naegele', location: 'Georgia', status: 'engaged' as 'engaged' },
        { id: 'client-004', names: 'Scott & Renee White', location: 'Texas', status: 'engaged' as 'engaged' }
      ]
    }
  ];
  
  // Example data for upcoming presentations
  const upcomingPresentations = [
    {
      id: 'pres-002',
      title: 'Brio Summer Special',
      presenter: 'Craig Boure',
      startTime: new Date(Date.now() + 3600000), // 1 hour from now
      status: 'scheduled',
      clients: 6
    },
    {
      id: 'pres-003',
      title: 'Brio Holiday Package',
      presenter: 'Sarah Miller',
      startTime: new Date(Date.now() + 7200000), // 2 hours from now
      status: 'scheduled',
      clients: 4
    }
  ];
  
  // Example data for recent transfers
  const recentTransfers = [
    {
      id: 'transfer-001',
      clientNames: 'John & Jane Smith',
      fromDepartment: 'Presentation',
      toDepartment: 'Sales',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 'transfer-002',
      clientNames: 'Robert & Mary Johnson',
      fromDepartment: 'Sales',
      toDepartment: 'Finance',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 'transfer-003',
      clientNames: 'David & Lisa Brown',
      fromDepartment: 'Finance',
      toDepartment: 'Exit Survey',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    
    return Math.floor(seconds) + ' seconds ago';
  };
  
  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brio-navy">Dashboard</h2>
          <div>
            <button 
              onClick={() => {
                toast({
                  title: "New Presentation",
                  description: "This feature will be available soon!",
                });
              }}
              className="bg-brio-navy hover:bg-brio-navy/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Presentation</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Active Presentations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brio-navy">1</div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-sm text-gray-500">4 clients currently attending</p>
            </CardFooter>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brio-navy">3</div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-sm text-gray-500">2 more presentations today</p>
            </CardFooter>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brio-teal">32%</div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-sm text-gray-500">5% increase from last week</p>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-brio-navy">Active Presentations</h3>
        
        {activePresentations.map(presentation => (
          <Card key={presentation.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-brio-navy to-brio-navy/80 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{presentation.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    Presenter: {presentation.presenter} • Started: {formatTime(presentation.startTime)}
                  </CardDescription>
                </div>
                <Badge className="bg-brio-teal text-brio-navy hover:bg-brio-teal/90">
                  Live
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {presentation.clients.map(client => (
                  <ClientCard 
                    key={client.id} 
                    client={client} 
                  />
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 flex justify-between items-center">
              <button 
                onClick={() => {
                  toast({
                    title: "Full View",
                    description: "Opening detailed presentation view",
                  });
                }}
                className="text-brio-navy hover:text-brio-teal text-sm font-medium flex items-center space-x-1 transition-colors"
              >
                <span>View Full Presentation</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => {
                  toast({
                    title: "End Presentation",
                    description: "This will end the presentation for all participants.",
                    variant: "destructive",
                  });
                }}
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                End Presentation
              </button>
            </CardFooter>
          </Card>
        ))}
        
        {activePresentations.length === 0 && (
          <Card className="bg-gray-50 border-dashed">
            <CardContent className="py-10">
              <div className="text-center">
                <p className="text-gray-500">No active presentations</p>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Upcoming Presentations</h3>
          
          <div className="space-y-4">
            {upcomingPresentations.map(presentation => (
              <Card key={presentation.id} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{presentation.title}</h4>
                      <p className="text-sm text-gray-500">
                        {presentation.presenter} • {formatTime(presentation.startTime)}
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                      {presentation.clients} clients
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {upcomingPresentations.length === 0 && (
              <Card className="bg-gray-50 border-dashed">
                <CardContent className="py-6">
                  <div className="text-center">
                    <p className="text-gray-500">No upcoming presentations</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
        
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Recent Transfers</h3>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentTransfers.map(transfer => (
                  <div key={transfer.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{transfer.clientNames}</p>
                      <p className="text-sm text-gray-500">
                        {transfer.fromDepartment} → {transfer.toDepartment}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTimeAgo(transfer.timestamp)}
                    </div>
                  </div>
                ))}
                
                {recentTransfers.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No recent transfers</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <button 
                onClick={() => {
                  toast({
                    title: "Transfer History",
                    description: "Viewing full transfer history",
                  });
                }}
                className="text-brio-navy hover:text-brio-teal text-sm font-medium flex items-center space-x-1 transition-colors"
              >
                <span>View All Transfers</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
