
import React, { useEffect, useState, Profiler, ProfilerOnRenderCallback } from 'react';
import { debug, LogLevel } from '@/utils/debugUtils';

interface RenderTimingEntry {
  id: string;
  phase: string;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  timestamp: number;
}

interface RenderProfilerProps {
  id: string;
  children: React.ReactNode;
  logToConsole?: boolean;
  triggerWarningMs?: number;
}

// Store for collecting render timings
const renderTimings: Record<string, RenderTimingEntry[]> = {};

// Export the collected timings
export const getRenderTimings = (): Record<string, RenderTimingEntry[]> => {
  return { ...renderTimings };
};

// Clear stored timings
export const clearRenderTimings = (): void => {
  Object.keys(renderTimings).forEach(key => {
    renderTimings[key] = [];
  });
  debug('Render timings cleared', null, LogLevel.INFO);
};

// Callback for the Profiler component
const handleProfilerRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  const entry: RenderTimingEntry = {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    timestamp: Date.now()
  };
  
  // Initialize the array if it doesn't exist
  if (!renderTimings[id]) {
    renderTimings[id] = [];
  }
  
  // Add the entry
  renderTimings[id].push(entry);
  
  // Cap the array at 100 entries per component
  if (renderTimings[id].length > 100) {
    renderTimings[id].shift();
  }
};

const RenderProfiler: React.FC<RenderProfilerProps> = ({ 
  id, 
  children, 
  logToConsole = false,
  triggerWarningMs = 100 
}) => {
  const [renderCount, setRenderCount] = useState(0);
  
  // Increment render count
  useEffect(() => {
    setRenderCount(count => count + 1);
    debug(`Component ${id} rendered`, { renderCount: renderCount + 1 }, LogLevel.DEBUG);
    
    return () => {
      debug(`Component ${id} unmounted after ${renderCount} renders`, null, LogLevel.DEBUG);
    };
  }, [id, renderCount]);
  
  // Custom callback that optionally logs to console and checks for slow renders
  const profilerCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    // Log to console if enabled
    if (logToConsole) {
      debug(`Render timing for ${id}`, {
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime
      }, LogLevel.DEBUG);
    }
    
    // Check for slow renders
    if (actualDuration > triggerWarningMs) {
      debug(`Slow render detected for ${id}`, {
        actualDuration,
        baseDuration,
        phase
      }, LogLevel.WARN);
    }
    
    // Call the main handler to store the data
    handleProfilerRender(id, phase, actualDuration, baseDuration, startTime, commitTime);
  };
  
  return (
    <Profiler id={id} onRender={profilerCallback}>
      {children}
    </Profiler>
  );
};

export default RenderProfiler;
