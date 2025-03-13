
import React, { useState, useEffect } from 'react';
import { connectToExternalVideoSource } from '@/services/video-analysis';
import { Client } from '@/types/dashboard';
import VideoDisplay from './video/VideoDisplay';
import VideoAnalysis from './video/VideoAnalysis';
import StatusIndicator from './video/StatusIndicator';

interface VideoStreamProps {
  client: Client;
  onStatusChange: (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => void;
  sourceId?: string; // ID of the external video source (e.g., Zoom participant ID)
}

const VideoStream: React.FC<VideoStreamProps> = ({ 
  client, 
  onStatusChange,
  sourceId 
}) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [analysisEnabled, setAnalysisEnabled] = useState<boolean>(() => {
    // Read initial setting from localStorage
    const savedSetting = localStorage.getItem('enableAnalysis');
    return savedSetting ? savedSetting === 'true' : true; // Default to enabled
  });
  
  // Set up video stream from external source if needed
  const handleVideoReady = async (video: HTMLVideoElement) => {
    if (sourceId) {
      try {
        await connectToExternalVideoSource(video, sourceId);
      } catch (err) {
        console.error('Error connecting to external video source:', err);
      }
    }
    setVideoElement(video);
  };
  
  // Listen for changes to the analysis setting
  useEffect(() => {
    const handleAnalysisSettingChange = (event: Event) => {
      const customEvent = event as CustomEvent<{enabled: boolean}>;
      setAnalysisEnabled(customEvent.detail.enabled);
    };
    
    window.addEventListener('analysisSettingChanged', handleAnalysisSettingChange as EventListener);
    
    return () => {
      window.removeEventListener('analysisSettingChanged', handleAnalysisSettingChange as EventListener);
    };
  }, []);
  
  return (
    <div className="relative rounded-md overflow-hidden w-full h-full">
      <VideoDisplay 
        clientId={client.id}
        clientName={client.names}
        sourceId={sourceId}
        onVideoReady={handleVideoReady}
      />
      
      {/* Only render VideoAnalysis component if analysis is enabled */}
      {videoElement && analysisEnabled && (
        <VideoAnalysis
          videoElement={videoElement}
          clientId={client.id}
          currentStatus={client.status}
          onStatusChange={onStatusChange}
        />
      )}
      
      <StatusIndicator status={client.status} />
      
      {/* Show notice when analysis is disabled */}
      {!analysisEnabled && (
        <div className="absolute bottom-6 left-0 right-0 mx-auto text-center">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            Analysis disabled
          </span>
        </div>
      )}
    </div>
  );
};

export default VideoStream;
