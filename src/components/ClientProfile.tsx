import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientNotes from './ClientNotes';
import ClientTransfer from './ClientTransfer';
import ClientEngagementMetrics from './ClientEngagementMetrics';

interface ClientProfileProps {
  clientId: string;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const { toast } = useToast();
  
  // Mock client data (in a real app, this would come from an API)
  const client = {
    id: clientId,
    names: 'George & Lyn Whitehead',
    location: 'North Carolina',
    email: 'whiteheads@example.com',
    phone: '(555) 123-4567',
    status: 'engaged',
    presentationHistory: [
      { id: 'pres-001', title: 'Brio Vacations Premium Package', date: new Date(), result: 'In Progress' },
      { id: 'pres-002', title: 'Brio Summer Special', date: new Date(Date.now() - 7776000000), result: 'Declined' } // 90 days ago
    ],
    keyInformation: [
      { category: 'Vacation Frequency', value: 'Twice a year' },
      { category: 'Favorite Destinations', value: 'Beach resorts, Europe' },
      { category: 'Retirement Status', value: 'Planning to retire in 2 years' },
      { category: 'Travel Companions', value: 'Adult children, grandchildren' },
      { category: 'Budget Range', value: '$5,000 - $8,000 per trip' },
      { category: 'Dream Destinations', value: 'Mediterranean cruise, Japanese tour' }
    ],
    engagementData: {
      engaged: 75,
      distracted: 20,
      away: 5
    }
  };
  
  // Status styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'engaged':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'Engaged'
        };
      case 'distracted':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          border: 'border-amber-200',
          label: 'Distracted'
        };
      case 'away':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          label: 'Away'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          label: 'Unknown'
        };
    }
  };
  
  const statusStyle = getStatusStyles(client.status);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brio-navy to-brio-navy/80 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <span>{client.names}</span>
              <Badge className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg} border ${statusStyle.border}`}>
                {statusStyle.label}
              </Badge>
            </CardTitle>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  toast({
                    title: "Email Client",
                    description: "Opening email composer...",
                  });
                }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  toast({
                    title: "Call Client",
                    description: "Initiating call...",
                  });
                }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{client.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{client.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Presentation History</h3>
              <div className="space-y-3">
                {client.presentationHistory.map(presentation => (
                  <div key={presentation.id} className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{presentation.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(presentation.date)}</p>
                    </div>
                    <Badge className={
                      presentation.result === 'Purchased' ? 'bg-green-100 text-green-800 border border-green-200' :
                      presentation.result === 'Declined' ? 'bg-red-100 text-red-800 border border-red-200' :
                      presentation.result === 'In Progress' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                      'bg-gray-100 text-gray-800 border border-gray-200'
                    }>
                      {presentation.result}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <ClientEngagementMetrics clientData={client.engagementData} />
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`text-center p-4 rounded-lg ${statusStyle.bg} ${statusStyle.text}`}>
                <p className="text-xl font-semibold">{statusStyle.label}</p>
                <p className="text-sm mt-1">Last updated: Just now</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="key-info" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="key-info">Key Information</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="key-info" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Client Key Information</h3>
                <button
                  onClick={() => {
                    toast({
                      title: "Edit Key Information",
                      description: "This feature will be available soon!",
                    });
                  }}
                  className="text-brio-navy hover:text-brio-teal text-sm transition-colors"
                >
                  Edit Information
                </button>
              </div>
              
              <div className="space-y-4">
                {client.keyInformation.map((info, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                    <p className="text-sm text-gray-500">{info.category}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <ClientNotes clientId={client.id} clientNames={client.names} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transfer" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <ClientTransfer clientId={client.id} clientNames={client.names} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
