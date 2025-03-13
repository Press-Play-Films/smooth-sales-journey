
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoActivePresentations, demoUpcomingPresentations, waveTimes } from '@/utils/demoData';
import { searchPresentations } from '@/utils/searchUtils';
import { format } from 'date-fns';

const PresentationsPage: React.FC = () => {
  const { toast } = useToast();
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedWave, setSelectedWave] = useState('');
  const [selectedPresenter, setSelectedPresenter] = useState('');

  // Get unique list of rooms
  const allRooms = [
    ...new Set([
      ...demoActivePresentations.map(p => p.roomNumber),
      ...demoUpcomingPresentations.map(p => p.roomNumber)
    ])
  ].sort();

  // Get unique list of presenters
  const allPresenters = [
    ...new Set([
      ...demoActivePresentations.map(p => p.presenter),
      ...demoUpcomingPresentations.map(p => p.presenter)
    ])
  ].sort();

  // Filter presentations based on search and filters
  const filteredPresentations = searchPresentations(
    demoActivePresentations,
    demoUpcomingPresentations,
    searchTerm,
    {
      presenter: selectedPresenter,
      room: selectedRoom,
      waveTime: selectedWave
    }
  );

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRoom('');
    setSelectedWave('');
    setSelectedPresenter('');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Presentations</h2>
          <Button 
            onClick={() => {
              toast({
                title: "New Presentation",
                description: "This feature will be available soon!",
              });
            }}
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            <span className="mr-2">+</span> New Presentation
          </Button>
        </div>
        
        {/* Search and filters */}
        <Card>
          <CardHeader>
            <CardTitle>Find Presentations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search by presentation title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="wave">Wave Time</Label>
                  <Select value={selectedWave} onValueChange={setSelectedWave}>
                    <SelectTrigger id="wave">
                      <SelectValue placeholder="All Wave Times" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Wave Times</SelectItem>
                      {waveTimes.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="room">Room Number</Label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger id="room">
                      <SelectValue placeholder="All Rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Rooms</SelectItem>
                      {allRooms.map((room) => (
                        <SelectItem key={room} value={room}>Room {room}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="presenter">Presenter</Label>
                  <Select value={selectedPresenter} onValueChange={setSelectedPresenter}>
                    <SelectTrigger id="presenter">
                      <SelectValue placeholder="All Presenters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Presenters</SelectItem>
                      {allPresenters.map((presenter) => (
                        <SelectItem key={presenter} value={presenter}>{presenter}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={clearFilters} className="mr-2">
                  Clear Filters
                </Button>
                <Button className="bg-brio-navy hover:bg-brio-navy/90">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Active Presentations */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-brio-navy">Active Presentations</h3>
          
          {filteredPresentations.active.length > 0 ? (
            <div className="grid gap-4">
              {filteredPresentations.active.map((presentation) => (
                <Card key={presentation.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{presentation.title}</h4>
                        <p className="text-gray-500">
                          Presenter: {presentation.presenter} • Room: {presentation.roomNumber} • 
                          Wave: {presentation.waveTime || 'N/A'} •
                          Started: {format(presentation.startTime, 'h:mm a')}
                        </p>
                        <p className="mt-2">
                          {presentation.clients.length} clients attending
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Live
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "View Presentation",
                            description: "Opening detailed presentation view",
                          });
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-6 text-center text-gray-500">
                No active presentations found matching your criteria.
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Upcoming Presentations */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-brio-navy">Upcoming Presentations</h3>
          
          {filteredPresentations.upcoming.length > 0 ? (
            <div className="grid gap-4">
              {filteredPresentations.upcoming.map((presentation) => (
                <Card key={presentation.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold">{presentation.title}</h4>
                        <p className="text-gray-500">
                          Presenter: {presentation.presenter} • Room: {presentation.roomNumber} • 
                          Wave: {presentation.waveTime || 'N/A'} •
                          Starts: {format(presentation.startTime, 'h:mm a')}
                        </p>
                        <p className="mt-2">
                          {presentation.clients} clients scheduled
                        </p>
                      </div>
                      <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        Scheduled
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Edit Presentation",
                            description: "Opening presentation editor",
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardContent className="p-6 text-center text-gray-500">
                No upcoming presentations found matching your criteria.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PresentationsPage;
