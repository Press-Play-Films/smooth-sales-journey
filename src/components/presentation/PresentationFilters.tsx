
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { waveTimes } from '@/utils/demoData/presentations';

interface PresentationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedRoom: string;
  setSelectedRoom: (value: string) => void;
  selectedWave: string;
  setSelectedWave: (value: string) => void;
  selectedPresenter: string;
  setSelectedPresenter: (value: string) => void;
  allRooms: string[];
  allPresenters: string[];
  clearFilters: () => void;
}

const PresentationFilters: React.FC<PresentationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRoom,
  setSelectedRoom,
  selectedWave,
  setSelectedWave,
  selectedPresenter,
  setSelectedPresenter,
  allRooms,
  allPresenters,
  clearFilters
}) => {
  return (
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
                  <SelectItem value="all">All Wave Times</SelectItem>
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
                  <SelectItem value="all">All Rooms</SelectItem>
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
                  <SelectItem value="all">All Presenters</SelectItem>
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
  );
};

export default PresentationFilters;
