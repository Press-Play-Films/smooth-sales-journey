
import React, { useEffect, useState } from 'react';
import { analyzeVideoFrame, determineClientStatus } from '@/services/video-analysis';
import { loadTensorFlow } from '@/utils/lazyTensorflow';

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
  
  // Load TensorFlow when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const initializeAnalysis = async () => {
      try {
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
  
  // Start analyzing video frames once TensorFlow is loaded
  useEffect(() => {
    // Only start analysis if both the video element exists and TensorFlow is loaded
    if (!videoElement || !isAnalysisEnabled || loadFailed) return;
    
    let analyzeInterval: number;
    
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
    }, analysisInterval);
    
    return () => {
      clearInterval(analyzeInterval);
    };
  }, [videoElement, clientId, currentStatus, onStatusChange, isAnalysisEnabled, loadFailed]);
  
  // This component doesn't render anything visible
  return null;
};

export default VideoAnalysis;
