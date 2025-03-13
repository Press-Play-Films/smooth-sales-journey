
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/executive/DashboardHeader';
import OverviewContent from '@/components/executive/OverviewContent';
import SalesContent from '@/components/executive/SalesContent';
import TeamContent from '@/components/executive/TeamContent';
import DashboardControls from '@/components/executive/DashboardControls';
import { useToast } from "@/hooks/use-toast";
import { 
  demoDepartmentStats, 
  generateHistoricData, 
  defaultMetricThresholds, 
  MetricThreshold 
} from '@/utils/demoData';
import { generateExcelReport } from '@/utils/exportUtils';
import { format } from 'date-fns';

const ExecutiveDashboard: React.FC = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<'overview' | 'sales' | 'team'>('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('week');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [realTimeUpdates, setRealTimeUpdates] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [alerts, setAlerts] = useState<{ metric: string; value: number; threshold: MetricThreshold }[]>([]);
  
  // Department data with time-based values
  const [departmentStats, setDepartmentStats] = useState(demoDepartmentStats);
  const [historicData, setHistoricData] = useState(generateHistoricData(selectedTimeframe));

  // Function to refresh data (simulates API fetch)
  const refreshData = useCallback(() => {
    // Update with new data based on timeframe
    const newHistoricData = generateHistoricData(selectedTimeframe);
    setHistoricData(newHistoricData);
    
    // Update department stats with slight variations
    const updatedDepartmentStats = departmentStats.map(dept => ({
      ...dept,
      clientCount: Math.max(15, dept.clientCount + Math.floor(Math.random() * 5) - 2),
      engagementRate: Math.min(100, Math.max(40, dept.engagementRate + Math.floor(Math.random() * 6) - 3)),
      conversionRate: Math.min(100, Math.max(10, dept.conversionRate + Math.floor(Math.random() * 4) - 2))
    }));
    setDepartmentStats(updatedDepartmentStats);
    
    toast({
      title: "Data Refreshed",
      description: `Dashboard updated with latest ${selectedTimeframe} data`,
    });
  }, [selectedTimeframe, departmentStats, toast]);

  // Export data function
  const exportData = useCallback(() => {
    // Prepare data for export based on the current report type
    let reportData;
    let reportName;
    
    if (selectedReport === 'overview') {
      reportData = historicData;
      reportName = 'overview';
    } else if (selectedReport === 'sales') {
      reportData = historicData.map(item => ({
        period: item.label,
        engagementRate: item.engagementRate,
        conversionRate: item.conversionRate,
        revenue: (item.conversionRate * item.clientCount * 250).toFixed(2)
      }));
      reportName = 'sales';
    } else {
      // Team report data
      reportData = [
        { name: "Craig Boure", sales: 42, conversion: 72, performance: "Excellent" },
        { name: "Sarah Miller", sales: 38, conversion: 68, performance: "Good" },
        { name: "Michael Johnson", sales: 35, conversion: 66, performance: "Good" },
        { name: "Emily Davis", sales: 31, conversion: 62, performance: "Average" },
        { name: "Robert Brown", sales: 29, conversion: 58, performance: "Average" }
      ];
      reportName = 'team';
    }
    
    // Generate Excel report
    generateExcelReport(reportData, {
      filename: `brio-${reportName}-report-${format(new Date(), 'yyyy-MM-dd')}`,
      timeframe: selectedTimeframe
    });
  }, [selectedReport, selectedTimeframe, historicData]);

  // Set up real-time updates
  useEffect(() => {
    let updateInterval: ReturnType<typeof setInterval>;
    
    if (realTimeUpdates) {
      toast({
        title: "Real-time Updates Enabled",
        description: "Dashboard will refresh automatically every 30 seconds",
      });
      
      updateInterval = setInterval(() => {
        refreshData();
      }, 30000); // Update every 30 seconds
    }
    
    return () => {
      if (updateInterval) clearInterval(updateInterval);
    };
  }, [realTimeUpdates, refreshData, toast]);

  // Update data when timeframe changes
  useEffect(() => {
    setHistoricData(generateHistoricData(selectedTimeframe));
  }, [selectedTimeframe]);

  // Check for metric alerts
  useEffect(() => {
    if (!alertsEnabled) {
      setAlerts([]);
      return;
    }
    
    // Get the most recent data point
    const latestData = historicData[historicData.length - 1];
    if (!latestData) return;
    
    // Check each metric against thresholds
    const newAlerts = defaultMetricThresholds
      .filter(threshold => {
        const value = latestData[threshold.metric];
        if (threshold.direction === 'below') {
          return value <= threshold.critical;
        } else {
          return value >= threshold.critical;
        }
      })
      .map(threshold => ({
        metric: threshold.metric,
        value: latestData[threshold.metric],
        threshold
      }));
    
    // If new alerts appear, notify the user
    if (newAlerts.length > alerts.length) {
      newAlerts.forEach(alert => {
        const existingAlert = alerts.find(a => a.metric === alert.metric);
        if (!existingAlert) {
          toast({
            title: "Critical Alert",
            description: `${alert.metric.replace(/([A-Z])/g, ' $1').trim()} is at ${alert.value}%, which is ${alert.threshold.direction} critical threshold`,
            variant: "destructive"
          });
        }
      });
    }
    
    setAlerts(newAlerts);
  }, [historicData, alertsEnabled, alerts, toast]);

  // Calculate totals for overview
  const totalClients = departmentStats.reduce((sum, dept) => sum + dept.clientCount, 0);
  const avgEngagementRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.engagementRate * dept.clientCount, 0) / totalClients
  );
  const avgConversionRate = Math.round(
    departmentStats.reduce((sum, dept) => sum + dept.conversionRate * dept.clientCount, 0) / totalClients
  );

  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader 
          selectedReport={selectedReport} 
          setSelectedReport={setSelectedReport}
          date={date}
          setDate={setDate}
        />
        
        <DashboardControls
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          realTimeUpdates={realTimeUpdates}
          setRealTimeUpdates={setRealTimeUpdates}
          alertsEnabled={alertsEnabled}
          setAlertsEnabled={setAlertsEnabled}
          refreshData={refreshData}
          exportData={exportData}
          alerts={alerts}
        />

        {selectedReport === 'overview' && (
          <OverviewContent 
            totalClients={totalClients}
            avgEngagementRate={avgEngagementRate}
            avgConversionRate={avgConversionRate}
            departments={departmentStats}
            timeframe={selectedTimeframe}
            historicData={historicData}
          />
        )}

        {selectedReport === 'sales' && (
          <SalesContent 
            timeframe={selectedTimeframe}
            historicData={historicData}
          />
        )}

        {selectedReport === 'team' && (
          <TeamContent 
            timeframe={selectedTimeframe}
          />
        )}
      </div>
    </Layout>
  );
};

export default ExecutiveDashboard;
