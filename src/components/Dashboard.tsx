
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import StatsCard from './dashboard/StatsCard';
import ActivePresentationCard from './dashboard/ActivePresentationCard';
import UpcomingPresentationList from './dashboard/UpcomingPresentationList';
import RecentTransfersList from './dashboard/RecentTransfersList';
import { ActivePresentation, UpcomingPresentation, Transfer } from '@/types/dashboard';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  // Example data for active presentations
  const activePresentations: ActivePresentation[] = [
    {
      id: 'pres-001',
      title: 'Brio Vacations Premium Package',
      presenter: 'Craig Boure',
      startTime: new Date(),
      status: 'active',
      clients: [
        { id: 'client-001', names: 'George & Lyn Whitehead', location: 'North Carolina', status: 'engaged' },
        { id: 'client-002', names: 'Malinda & Larry Jones', location: 'Florida', status: 'distracted' },
        { id: 'client-003', names: 'Philip & Traci Naegele', location: 'Georgia', status: 'engaged' },
        { id: 'client-004', names: 'Scott & Renee White', location: 'Texas', status: 'engaged' }
      ]
    }
  ];
  
  // Example data for upcoming presentations
  const upcomingPresentations: UpcomingPresentation[] = [
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
  const recentTransfers: Transfer[] = [
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
          <StatsCard 
            title="Active Presentations" 
            value={activePresentations.length} 
            description="4 clients currently attending" 
          />
          
          <StatsCard 
            title="Today's Schedule" 
            value={upcomingPresentations.length + activePresentations.length} 
            description="2 more presentations today" 
          />
          
          <StatsCard 
            title="Conversion Rate" 
            value="32%" 
            description="5% increase from last week" 
          />
        </div>
      </section>
      
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-brio-navy">Active Presentations</h3>
        
        {activePresentations.map(presentation => (
          <ActivePresentationCard 
            key={presentation.id} 
            presentation={presentation} 
          />
        ))}
        
        {activePresentations.length === 0 && (
          <div className="bg-gray-50 border-dashed rounded-lg p-10">
            <div className="text-center">
              <p className="text-gray-500">No active presentations</p>
            </div>
          </div>
        )}
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Upcoming Presentations</h3>
          
          <UpcomingPresentationList presentations={upcomingPresentations} />
        </section>
        
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Recent Transfers</h3>
          
          <RecentTransfersList transfers={recentTransfers} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
