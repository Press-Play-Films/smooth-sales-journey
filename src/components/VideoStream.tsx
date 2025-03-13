
import React, { useState } from 'react';
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
  
  return (
    <div className="relative rounded-md overflow-hidden w-full h-full">
      <VideoDisplay 
        clientId={client.id}
        clientName={client.names}
        sourceId={sourceId}
        onVideoReady={handleVideoReady}
      />
      
      {videoElement && (
        <VideoAnalysis
          videoElement={videoElement}
          clientId={client.id}
          currentStatus={client.status}
          onStatusChange={onStatusChange}
        />
      )}
      
      <StatusIndicator status={client.status} />
    </div>
  );
};

export default VideoStream;
