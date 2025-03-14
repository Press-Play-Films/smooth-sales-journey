
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
  selectedRoom: string | null;
  setSelectedRoom: (value: string | null) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
}

const PresentationFilters: React.FC<PresentationFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRoom,
  setSelectedRoom,
  dateRange,
  setDateRange,
  statusFilter,
  setStatusFilter
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
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="room">Room Number</Label>
              <Select 
                value={selectedRoom || "all"} 
                onValueChange={(value) => setSelectedRoom(value === "all" ? null : value)}
              >
                <SelectTrigger id="room">
                  <SelectValue placeholder="All Rooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="101">Room 101</SelectItem>
                  <SelectItem value="102">Room 102</SelectItem>
                  <SelectItem value="103">Room 103</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={statusFilter || "all"} 
                onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedRoom(null);
                setStatusFilter(null);
                setDateRange([null, null]);
              }} 
              className="mr-2"
            >
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
