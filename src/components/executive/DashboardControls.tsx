
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { BellRing, ChevronDown, FileDown, RefreshCw } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { defaultMetricThresholds, MetricThreshold } from '@/utils/demoData/presentations';

interface DashboardControlsProps {
  selectedTimeframe: 'day' | 'week' | 'month' | 'quarter' | 'year';
  setSelectedTimeframe: (value: 'day' | 'week' | 'month' | 'quarter' | 'year') => void;
  realTimeUpdates: boolean;
  setRealTimeUpdates: (value: boolean) => void;
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  refreshData: () => void;
  exportData: () => void;
  alerts: { metric: string; value: number; threshold: MetricThreshold }[];
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  selectedTimeframe,
  setSelectedTimeframe,
  realTimeUpdates,
  setRealTimeUpdates,
  alertsEnabled,
  setAlertsEnabled,
  refreshData,
  exportData,
  alerts
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-6">
      <div>
        <Tabs 
          value={selectedTimeframe} 
          onValueChange={(v: any) => setSelectedTimeframe(v)}
          className="border rounded-lg overflow-hidden"
        >
          <TabsList className="grid grid-cols-5 w-full sm:w-[400px]">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center space-x-2">
          <Switch 
            id="realtime" 
            checked={realTimeUpdates}
            onCheckedChange={setRealTimeUpdates}
          />
          <Label htmlFor="realtime">Real-time updates</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="alerts" 
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
          <Label htmlFor="alerts">Alerts</Label>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <BellRing className="h-4 w-4 mr-2" />
              Alerts
              {alerts.length > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                >
                  {alerts.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2 max-h-80 overflow-auto">
              <h4 className="font-medium text-sm">Alert Thresholds</h4>
              {defaultMetricThresholds.map((threshold, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm capitalize">
                    {threshold.metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      {threshold.direction === 'below' ? '<' : '>'} {threshold.warning}%
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                      {threshold.direction === 'below' ? '<' : '>'} {threshold.critical}%
                    </span>
                  </div>
                </div>
              ))}
              
              {alerts.length > 0 ? (
                <>
                  <h4 className="font-medium text-sm mt-4">Active Alerts</h4>
                  {alerts.map((alert, index) => (
                    <div key={index} className="p-2 border rounded-md bg-red-50">
                      <p className="text-sm font-medium capitalize">
                        {alert.metric.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-red-600">
                        Current: {alert.value}% | Threshold: {alert.threshold.critical}%
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-gray-500 mt-4">No active alerts</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={refreshData}
          title="Refresh Data"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={exportData}
          className="bg-brio-navy hover:bg-brio-navy/90"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default DashboardControls;
