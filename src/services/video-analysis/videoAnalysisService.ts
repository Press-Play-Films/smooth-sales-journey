
/**
 * Service for analyzing video streams to determine client engagement
 * Optimized for thumbnail-sized video feeds from platforms like Zoom
 */

import { detectFaces, checkEyesVisible } from './faceDetectionService';
import { 
  calculateFaceCenteredness, 
  determineMovement, 
  fallbackAnalysis,
  determineClientStatus as determineStatus,
  ZOOM_THUMBNAIL_AVG_WIDTH
} from './engagementAnalysisService';
import { connectToExternalVideoSource as connectToExternal } from './utils/detectionUtils';
import { VideoAnalysisResult } from './types';

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

  try {
    // Detect faces in the video frame
    const faces = await detectFaces(videoElement);
    
    // No faces detected
    if (faces.length === 0) {
      return {
        attentionScore: 0,
        facingCamera: false,
        eyesVisible: false,
        movement: 'none',
      };
    }

    // Get the main face (first detected face)
    const face = faces[0];
    
    // 1. Determine if this is a small feed (likely from Zoom)
    const isSmallFeed = videoElement.videoWidth <= ZOOM_THUMBNAIL_AVG_WIDTH * 1.5;
    
    // Calculate face size relative to frame
    const faceBox = face.box || { xMin: 0, yMin: 0, width: 0, height: 0, xMax: 0, yMax: 0 };
    const faceWidth = faceBox.width || 0;
    const faceHeight = faceBox.height || 0;
    const frameArea = videoElement.videoWidth * videoElement.videoHeight;
    const faceArea = faceWidth * faceHeight;
    
    // Calculate face ratio (how much of the frame is occupied by the face)
    const faceRatio = frameArea > 0 ? faceArea / frameArea : 0;
    
    // Apply different processing based on feed size
    let confidenceMultiplier = 1.0;
    if (isSmallFeed) {
      // Boost confidence for small feeds where detection is more challenging
      confidenceMultiplier = 1.2;
    }
    
    // Calculate attention score based on face position and landmarks
    const faceCenteredness = calculateFaceCenteredness(face, videoElement);
    
    // Use landmarks to determine if eyes are visible
    const eyesVisible = checkEyesVisible(face);
    
    // Assume facing camera if a face was detected
    const facingCamera = faceRatio > 0.05; // Face must be at least 5% of frame
    
    // Calculate attention score based on multiple factors
    const attentionScore = Math.min(1, Math.max(0, 
      (faceCenteredness * 0.6 + (eyesVisible ? 0.4 : 0)) * confidenceMultiplier
    ));
    
    // Determine movement based on face ratio and position
    const movement = determineMovement(face, faceRatio);
    
    return {
      attentionScore,
      facingCamera,
      eyesVisible,
      movement,
    };
  } catch (error) {
    console.error('Error analyzing video frame:', error);
    return fallbackAnalysis(videoElement);
  }
};

// Re-export functions from other modules for backward compatibility
export { determineStatus as determineClientStatus };
export { connectToExternal as connectToExternalVideoSource };
