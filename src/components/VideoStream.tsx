
import React, { useRef, useEffect, useState } from 'react';
import { analyzeVideoFrame, determineClientStatus } from '@/services/videoAnalysisService';
import { Client } from '@/types/dashboard';

interface VideoStreamProps {
  client: Client;
  onStatusChange: (clientId: string, newStatus: 'engaged' | 'distracted' | 'away') => void;
}

const VideoStream: React.FC<VideoStreamProps> = ({ client, onStatusChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // In a real application, this would be an actual video stream
  // For demo purposes, we'll use a simulated video feed
  useEffect(() => {
    // Simulate connecting to a video stream
    const simulateVideoStream = () => {
      if (videoRef.current) {
        // In a real implementation, we would connect to an actual stream
        // For demo purposes, we'll set the video to a solid color
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
            videoRef.current.play().catch(err => {
              setError(`Error playing video: ${err.message}`);
            });
            setIsStreaming(true);
          }
        }
      }
    };
    
    simulateVideoStream();
    
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
  }, [client.id, client.status, isStreaming, onStatusChange]);
  
  return (
    <div className="relative rounded-md overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
      />
      
      <div className="absolute bottom-2 right-2">
        <div className={`h-3 w-3 rounded-full ${
          client.status === 'engaged' ? 'bg-green-500' :
          client.status === 'distracted' ? 'bg-amber-500' : 'bg-red-500'
        }`} />
      </div>
      
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-sm p-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default VideoStream;
