
/**
 * Service for analyzing video streams to determine client engagement
 */

// Engagement thresholds
const ENGAGEMENT_THRESHOLD = 0.7;
const DISTRACTION_THRESHOLD = 0.4;

type VideoAnalysisResult = {
  attentionScore: number;
  facingCamera: boolean;
  eyesVisible: boolean;
  movement: 'none' | 'low' | 'high';
};

/**
 * Analyze video frame to determine client engagement
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

  // In a real implementation, we would:
  // 1. Use face detection to determine if client is facing camera
  // 2. Use eye tracking to see if they are looking at the screen
  // 3. Measure movement to determine fidgeting or distractions
  
  // For demo purposes, we'll simulate analysis with pseudorandom data
  // that's somewhat consistent per client
  const clientId = videoElement.getAttribute('data-client-id') || '';
  const timeNow = Date.now();
  
  // Create a seeded "random" number based on client ID and time
  // This makes the engagement pattern somewhat consistent per client
  // but still changing over time
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
