
import React, { useRef, useEffect, useState } from 'react';
import { 
  analyzeVideoFrame, 
  determineClientStatus, 
  connectToExternalVideoSource 
} from '@/services/videoAnalysisService';
import { Client } from '@/types/dashboard';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Set up video stream from external source (e.g., Zoom)
  useEffect(() => {
    const setupVideoStream = async () => {
      if (videoRef.current) {
        try {
          // Try to connect to an external video source if sourceId is provided
          if (sourceId) {
            const connected = await connectToExternalVideoSource(videoRef.current, sourceId);
            if (connected) {
              setIsStreaming(true);
              setError(null);
              return;
            }
          }
          
          // Fallback to simulated video if external source connection fails or no sourceId
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Create a gradient background based on client ID for visualization
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            
            // Generate colors based on client ID to make each client's video visually distinct
            const clientIdSum = client.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hue1 = clientIdSum % 360;
            const hue2 = (clientIdSum + 180) % 360;
            
            gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
            gradient.addColorStop(1, `hsl(${hue2}, 70%, 60%)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add client name to the video
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(client.names, canvas.width / 2, canvas.height / 2);
            
            // Convert canvas to video stream
            const stream = canvas.captureStream(15); // 15 fps
            
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.setAttribute('data-client-id', client.id);
              videoRef.current.setAttribute('playsinline', '');
              videoRef.current.setAttribute('autoplay', '');
              videoRef.current.muted = true;
              
              const playPromise = videoRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsStreaming(true);
                    setError(null);
                  })
                  .catch(err => {
                    console.warn('Autoplay was prevented:', err);
                    setError('Click to enable video');
                  });
              }
            }
          }
        } catch (err) {
          console.error('Error setting up video stream:', err);
          setError('Error setting up video stream');
        }
      }
    };
    
    setupVideoStream();
    
    // Start analyzing video frames
    let analyzeInterval: number;
    if (videoRef.current) {
      analyzeInterval = window.setInterval(async () => {
        if (videoRef.current && isStreaming) {
          try {
            const analysisResult = await analyzeVideoFrame(videoRef.current);
            const newStatus = determineClientStatus(analysisResult);
            
            // Only update if status has changed
            if (newStatus !== client.status) {
              onStatusChange(client.id, newStatus);
            }
          } catch (err) {
            console.error('Error analyzing video frame:', err);
          }
        }
      }, 2000); // Check every 2 seconds
    }
    
    return () => {
      clearInterval(analyzeInterval);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [client.id, client.names, client.status, isStreaming, onStatusChange, sourceId]);
  
  // Handle manual play for browsers that block autoplay
  const handleVideoClick = () => {
    if (videoRef.current && !isStreaming) {
      videoRef.current.play()
        .then(() => {
          setIsStreaming(true);
          setError(null);
        })
        .catch(err => {
          console.error('Error playing video on click:', err);
          setError(`Unable to play video: ${err.message}`);
        });
    }
  };
  
  return (
    <div className="relative rounded-md overflow-hidden w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        onClick={handleVideoClick}
      />
      
      <div className="absolute bottom-2 right-2">
        <div className={`h-3 w-3 rounded-full ${
          client.status === 'engaged' ? 'bg-green-500' :
          client.status === 'distracted' ? 'bg-amber-500' : 'bg-red-500'
        }`} />
      </div>
      
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-sm p-2 cursor-pointer"
             onClick={handleVideoClick}>
          {error}
        </div>
      )}
    </div>
  );
};

export default VideoStream;
