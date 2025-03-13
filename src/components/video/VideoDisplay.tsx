
import React, { useRef, useEffect, useState } from 'react';

interface VideoDisplayProps {
  clientId: string;
  clientName: string;
  sourceId?: string;
  onVideoReady: (videoElement: HTMLVideoElement) => void;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  clientId,
  clientName,
  sourceId,
  onVideoReady
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupVideoStream = async () => {
      if (videoRef.current) {
        try {
          // Create a simulated video
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Create a gradient background based on client ID for visualization
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            
            // Generate colors based on client ID to make each client's video visually distinct
            const clientIdSum = clientId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
            ctx.fillText(clientName, canvas.width / 2, canvas.height / 2);
            
            // Convert canvas to video stream
            const stream = canvas.captureStream(15); // 15 fps
            
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.setAttribute('data-client-id', clientId);
              videoRef.current.setAttribute('playsinline', '');
              videoRef.current.setAttribute('autoplay', '');
              videoRef.current.muted = true;
              
              const playPromise = videoRef.current.play();
              
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    setIsStreaming(true);
                    setError(null);
                    if (videoRef.current) {
                      onVideoReady(videoRef.current);
                    }
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
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [clientId, clientName, sourceId, onVideoReady]);
  
  // Handle manual play for browsers that block autoplay
  const handleVideoClick = () => {
    if (videoRef.current && !isStreaming) {
      videoRef.current.play()
        .then(() => {
          setIsStreaming(true);
          setError(null);
          if (videoRef.current) {
            onVideoReady(videoRef.current);
          }
        })
        .catch(err => {
          console.error('Error playing video on click:', err);
          setError(`Unable to play video: ${err.message}`);
        });
    }
  };
  
  return (
    <>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        onClick={handleVideoClick}
      />
      
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-sm p-2 cursor-pointer"
             onClick={handleVideoClick}>
          {error}
        </div>
      )}
    </>
  );
};

export default VideoDisplay;
