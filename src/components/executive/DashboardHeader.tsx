
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { CalendarIcon, Edit2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DashboardHeaderProps {
  selectedReport: 'overview' | 'sales' | 'team';
  setSelectedReport: (value: 'overview' | 'sales' | 'team') => void;
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  selectedReport, 
  setSelectedReport,
  date = new Date(),
  setDate = () => {}
}) => {
  const [showEditMode, setShowEditMode] = useState(false);
  
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-3xl font-bold text-brio-navy">Executive Dashboard</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-brio-navy hover:bg-gray-100"
            onClick={() => setShowEditMode(!showEditMode)}
          >
            <Edit2 className="h-4 w-4" />
            <span className="ml-1 text-xs">{showEditMode ? 'Exit Edit Mode' : 'Edit Mode'}</span>
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Brio Vacations • Asheville, NC Headquarters
        </p>
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Tabs 
          value={selectedReport} 
          onValueChange={(v: any) => setSelectedReport(v)}
          className="border rounded-lg overflow-hidden"
        >
          <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardHeader;
