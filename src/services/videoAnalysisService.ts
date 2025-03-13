
/**
 * Service for analyzing video streams to determine client engagement
 * Optimized for thumbnail-sized video feeds from platforms like Zoom
 */

// Engagement thresholds
const ENGAGEMENT_THRESHOLD = 0.7;
const DISTRACTION_THRESHOLD = 0.4;

// Configuration for small video feeds from Zoom
const MIN_FACE_SIZE = 30; // Minimum face size in pixels to detect
const ANALYSIS_INTERVAL = 2000; // How often to analyze frames (ms)
const ZOOM_THUMBNAIL_AVG_WIDTH = 180; // Average width of Zoom thumbnails in gallery view

type VideoAnalysisResult = {
  attentionScore: number;
  facingCamera: boolean;
  eyesVisible: boolean;
  movement: 'none' | 'low' | 'high';
};

/**
 * Analyze video frame to determine client engagement
 * Optimized for small video feeds from conferencing platforms like Zoom
 * 
 * @param videoElement The video element to analyze
 */
export const analyzeVideoFrame = async (
  videoElement: HTMLVideoElement
): Promise<VideoAnalysisResult> => {
  if (!videoElement || videoElement.readyState < 2) {
    console.log('Video not ready for analysis');
    return {
      attentionScore: 0,
      facingCamera: false,
      eyesVisible: false,
      movement: 'none',
    };
  }

  // Create a canvas to process the video frame
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    console.error('Could not get canvas context');
    return {
      attentionScore: 0,
      facingCamera: false,
      eyesVisible: false, 
      movement: 'none',
    };
  }

  // Set canvas dimensions to match video
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  // Draw the current video frame on the canvas
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Note: This is where the actual face detection and analysis would occur
  // For thumbnail-sized Zoom feeds, we need specialized handling:
  
  // 1. Determine if this is a small feed (likely from Zoom)
  const isSmallFeed = canvas.width <= ZOOM_THUMBNAIL_AVG_WIDTH * 1.5;
  
  // 2. Apply different processing based on feed size
  if (isSmallFeed) {
    // Use algorithms optimized for small faces in thumbnails
    // console.log('Using small feed optimizations for Zoom thumbnail');
    
    // In production, you would use:
    // - MediaPipe Face Mesh (works well on smaller images, ~30 FPS on mobile)
    // - TensorFlow.js face-landmarks-detection with SSD MobileNet model (lightweight)
    // - Or a custom model trained specifically for thumbnail analysis
  }
  
  // For demo purposes, we're using a simulation
  // In production, replace with actual face detection and eye tracking
  const clientId = videoElement.getAttribute('data-client-id') || '';
  const timeNow = Date.now();
  
  // Create a seeded "random" number based on client ID and time
  const seedValue = clientId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pseudoRandom = Math.sin(seedValue + timeNow / 10000) * 0.5 + 0.5;
  
  // Calculate attention score (0-1)
  const attentionScore = Math.min(1, Math.max(0, pseudoRandom * 1.2));
  
  // Determine if client is facing camera (more likely when attention score is high)
  const facingCamera = pseudoRandom > 0.3;
  
  // Determine if eyes are visible (more likely when facing camera)
  const eyesVisible = facingCamera && pseudoRandom > 0.4;
  
  // Determine movement level
  let movement: 'none' | 'low' | 'high' = 'none';
  if (pseudoRandom < 0.3) {
    movement = 'high';
  } else if (pseudoRandom < 0.7) {
    movement = 'low';
  }
  
  return {
    attentionScore,
    facingCamera,
    eyesVisible,
    movement,
  };
};

/**
 * Determine client status based on video analysis
 * @param analysisResult The result of video analysis
 */
export const determineClientStatus = (
  analysisResult: VideoAnalysisResult
): 'engaged' | 'distracted' | 'away' => {
  const { attentionScore, facingCamera, eyesVisible } = analysisResult;
  
  if (!facingCamera) {
    return 'away';
  }
  
  if (attentionScore >= ENGAGEMENT_THRESHOLD && eyesVisible) {
    return 'engaged';
  }
  
  if (attentionScore >= DISTRACTION_THRESHOLD) {
    return 'distracted';
  }
  
  return 'away';
};

/**
 * Connect to external video source (e.g., Zoom)
 * This will connect to Zoom SDK API or use browser APIs to capture Zoom feed
 * 
 * @param videoElement The video element to connect
 * @param sourceId Optional source ID for the video feed (e.g., Zoom participant ID)
 */
export const connectToExternalVideoSource = async (
  videoElement: HTMLVideoElement,
  sourceId?: string
): Promise<boolean> => {
  console.log('Connecting to Zoom video feed:', sourceId);
  
  try {
    // In a real implementation, this would:
    // 1. Connect to the Zoom SDK API (https://marketplace.zoom.us/docs/sdk/native-sdks/)
    // 2. Request access to meeting participant video feeds
    // 3. Request appropriate permissions via browser APIs
    // 4. Use desktop sharing APIs to select Zoom window/app if needed
    
    // For browser-based detection, we might use:
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      // Option 1: Screen capture API for capturing Zoom window
      // const stream = await navigator.mediaDevices.getDisplayMedia({
      //   video: { cursor: "always" },
      //   audio: false
      // });
      
      // Option 2: Camera capture if Zoom is being used on the same device
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      //   audio: false
      // });
      
      // videoElement.srcObject = stream;
      // return true;
    }
    
    // If we reach here, we'll use the simulated feed for demo purposes
    return true;
    
  } catch (error) {
    console.error('Failed to connect to external video source:', error);
    return false;
  }
};

/**
 * Optimize video analysis for small thumbnail feeds
 * @param videoWidth Width of the video feed
 */
export const getOptimalFaceDetectionParams = (videoWidth: number) => {
  // Adjust parameters based on video size
  if (videoWidth < 200) {
    return {
      scaleFactor: 0.5,      // Scale down for faster processing
      minNeighbors: 3,       // Lower threshold for detection
      minSize: [15, 15],     // Smaller minimum face size
      maxSize: [100, 100]    // Smaller maximum face size
    };
  } else {
    return {
      scaleFactor: 0.7,
      minNeighbors: 5,
      minSize: [30, 30],
      maxSize: [300, 300]
    };
  }
};
