
import React, { useEffect } from 'react';
import { analyzeVideoFrame, determineClientStatus } from '@/services/video-analysis';

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
  useEffect(() => {
    // Start analyzing video frames
    let analyzeInterval: number;
    
    if (videoElement) {
      analyzeInterval = window.setInterval(async () => {
        try {
          const analysisResult = await analyzeVideoFrame(videoElement);
          const newStatus = determineClientStatus(analysisResult);
          
          // Only update if status has changed
          if (newStatus !== currentStatus) {
            onStatusChange(clientId, newStatus);
          }
        } catch (err) {
          console.error('Error analyzing video frame:', err);
        }
      }, 2000); // Check every 2 seconds
    }
    
    return () => {
      clearInterval(analyzeInterval);
    };
  }, [videoElement, clientId, currentStatus, onStatusChange]);
  
  // This component doesn't render anything visible
  return null;
};

export default VideoAnalysis;
