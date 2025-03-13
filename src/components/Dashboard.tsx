
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import StatsCard from './dashboard/StatsCard';
import ActivePresentationCard from './dashboard/ActivePresentationCard';
import UpcomingPresentationList from './dashboard/UpcomingPresentationList';
import RecentTransfersList from './dashboard/RecentTransfersList';
import EngagementMetrics from './EngagementMetrics';
import { ActivePresentation, Client } from '@/types/dashboard';
import { 
  demoActivePresentations, 
  demoUpcomingPresentations, 
  demoRecentTransfers 
} from '@/utils/demoData';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  // State for active presentations with auto-updating client statuses
  const [activePresentations, setActivePresentations] = useState<ActivePresentation[]>(demoActivePresentations);
  
  // Simulate real-time status updates
  useEffect(() => {
    const statusUpdateInterval = setInterval(() => {
      setActivePresentations(prevPresentations => {
        return prevPresentations.map(presentation => {
          // Update random client statuses to simulate real activity
          const updatedClients = presentation.clients.map(client => {
            // 20% chance to change status
            if (Math.random() < 0.2) {
              const statuses: ('engaged' | 'distracted' | 'away')[] = ['engaged', 'distracted', 'away'];
              const newStatusIndex = Math.floor(Math.random() * statuses.length);
              return { ...client, status: statuses[newStatusIndex] };
            }
            return client;
          });
          
          return { ...presentation, clients: updatedClients };
        });
      });
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(statusUpdateInterval);
  }, []);

  // Get all clients from all active presentations
  const getAllClients = (): Client[] => {
    return activePresentations.flatMap(presentation => presentation.clients);
  };
  
  // Calculate engagement stats
  const calculateEngagementStats = () => {
    const clients = getAllClients();
    const engaged = clients.filter(c => c.status === 'engaged').length;
    const totalClients = clients.length;
    return `${engaged} of ${totalClients} clients currently engaged`;
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
          <StatsCard 
            title="Active Presentations" 
            value={activePresentations.length} 
            description={calculateEngagementStats()} 
          />
          
          <StatsCard 
            title="Today's Schedule" 
            value={demoUpcomingPresentations.length + activePresentations.length} 
            description={`${demoUpcomingPresentations.length} more presentations today`} 
          />
          
          <StatsCard 
            title="Conversion Rate" 
            value="32%" 
            description="5% increase from last week" 
          />
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
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
        </div>
        
        <div className="lg:col-span-1">
          <EngagementMetrics clients={getAllClients()} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Upcoming Presentations</h3>
          
          <UpcomingPresentationList presentations={demoUpcomingPresentations} />
        </section>
        
        <section>
          <h3 className="text-2xl font-semibold text-brio-navy mb-4">Recent Transfers</h3>
          
          <RecentTransfersList transfers={demoRecentTransfers} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
