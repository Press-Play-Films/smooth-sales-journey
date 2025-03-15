
import React, { useEffect, useState } from 'react';
import { analyzeVideoFrame, determineClientStatus } from '@/services/video-analysis';
import { loadTensorFlow, isTensorFlowLoaded } from '@/utils/lazyTensorflow';

interface VideoAnalysisProps {
  videoElement: HTMLVideoElement | null;
  clientId: string;
  currentStatus: 'engaged' | 'distracted' | 'away';
  onStatusChange: (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => void;
}

const VideoAnalysis: React.FC<VideoAnalysisProps> = ({
  videoElement,
  clientId,
  currentStatus,
  onStatusChange
}) => {
  const [isAnalysisEnabled, setIsAnalysisEnabled] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const analysisInterval = 2000; // Check every 2 seconds
  
  // Force simulation mode for preview and production
  const forceSimulation = true;
  
  // Initialize analysis
  useEffect(() => {
    let isMounted = true;
    
    const initializeAnalysis = async () => {
      try {
        if (forceSimulation) {
          console.log('Using simulated analysis in preview/production mode');
          if (isMounted) {
            setIsAnalysisEnabled(true);
          }
          return;
        }
        
        // Skip actual loading in preview/production
        await loadTensorFlow();
        if (isMounted) {
          setIsAnalysisEnabled(true);
        }
      } catch (err) {
        console.error('Failed to initialize video analysis:', err);
        if (isMounted) {
          setLoadFailed(true);
        }
      }
    };
    
    initializeAnalysis();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Start analyzing video frames once enabled
  useEffect(() => {
    if (!videoElement || (!isAnalysisEnabled && !forceSimulation)) return;
    
    let analyzeInterval: number;
    
    analyzeInterval = window.setInterval(async () => {
      try {
        // Always use simulated analysis mode
        if (forceSimulation) {
          // Generate a random status for simulation
          const statuses: ['engaged', 'distracted', 'away'] = ['engaged', 'distracted', 'away'];
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          
          // Only update if status has changed
          if (newStatus !== currentStatus) {
            onStatusChange(clientId, newStatus);
          }
          return;
        }
        
        // Use real analysis in development if enabled
        const analysisResult = await analyzeVideoFrame(videoElement);
        const newStatus = determineClientStatus(analysisResult);
        
        // Only update if status has changed
        if (newStatus !== currentStatus) {
          onStatusChange(clientId, newStatus);
        }
      } catch (err) {
        console.error('Error analyzing video frame:', err);
      }
    }, analysisInterval);
    
    return () => {
      clearInterval(analyzeInterval);
    };
  }, [videoElement, clientId, currentStatus, onStatusChange, isAnalysisEnabled, forceSimulation]);
  
  // This component doesn't render anything visible
  return null;
};

export default VideoAnalysis;
