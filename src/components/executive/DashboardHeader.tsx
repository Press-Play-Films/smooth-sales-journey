
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

interface DashboardHeaderProps {
  selectedReport: 'overview' | 'sales' | 'team';
  setSelectedReport: (value: 'overview' | 'sales' | 'team') => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  selectedReport, 
  setSelectedReport 
}) => {
  const handleExportData = () => {
    // In a real app, this would generate and download CSV data
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    alert(`Brio Sales Report ${currentDate}.xlsx would be downloaded in a production environment.`);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-brio-navy">Executive Dashboard</h2>
      <div className="flex space-x-4">
        <Tabs 
          value={selectedReport} 
          onValueChange={(v: any) => setSelectedReport(v)}
          className="border rounded-lg overflow-hidden"
        >
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button 
          onClick={handleExportData}
          className="bg-brio-navy hover:bg-brio-navy/90"
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
