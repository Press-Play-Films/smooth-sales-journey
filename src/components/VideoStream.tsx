
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@/types/dashboard'; // Import the Client type from dashboard types
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
  const isMounted = useRef(true);
  const [analysisEnabled, setAnalysisEnabled] = useState<boolean>(() => {
    // In preview mode, always disable real analysis
    if (window.location.hostname.includes('lovable.ai')) {
      return false;
    }
    // Read initial setting from localStorage
    try {
      const savedSetting = localStorage.getItem('enableAnalysis');
      return savedSetting ? savedSetting === 'true' : true; // Default to enabled
    } catch (e) {
      return true; // Default to enabled if localStorage fails
    }
  });
  
  // Set up cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Set up video stream from external source if needed
  const handleVideoReady = (video: HTMLVideoElement) => {
    if (isMounted.current) {
      setVideoElement(video);
    }
  };
  
  // Listen for changes to the analysis setting
  useEffect(() => {
    const handleAnalysisSettingChange = (event: Event) => {
      if (isMounted.current) {
        try {
          const customEvent = event as CustomEvent<{enabled: boolean}>;
          setAnalysisEnabled(customEvent.detail.enabled);
        } catch (error) {
          console.error('Error handling analysis setting change:', error);
        }
      }
    };
    
    // Safe event listener addition
    try {
      window.addEventListener('analysisSettingChanged', handleAnalysisSettingChange as EventListener);
    } catch (error) {
      console.error('Error adding event listener:', error);
    }
    
    return () => {
      // Safe event listener removal
      try {
        window.removeEventListener('analysisSettingChanged', handleAnalysisSettingChange as EventListener);
      } catch (error) {
        // Silently handle removal errors
      }
    };
  }, []);
  
  // Determine if we're in a preview environment
  const isPreviewEnvironment = window.location.hostname.includes('lovable.ai');
  
  return (
    <div className="relative rounded-md overflow-hidden w-full h-full">
      <VideoDisplay 
        clientId={client.id}
        clientName={client.names}
        sourceId={sourceId}
        onVideoReady={handleVideoReady}
      />
      
      {/* Only render VideoAnalysis component if analysis is enabled and we have a video element */}
      {videoElement && isMounted.current && (analysisEnabled || isPreviewEnvironment) && (
        <VideoAnalysis
          videoElement={videoElement}
          clientId={client.id}
          currentStatus={client.status}
          onStatusChange={onStatusChange}
        />
      )}
      
      <StatusIndicator status={client.status} />
      
      {/* Show notice when analysis is disabled */}
      {!analysisEnabled && !isPreviewEnvironment && (
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
