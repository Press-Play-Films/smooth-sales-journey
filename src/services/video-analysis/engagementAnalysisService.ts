
/**
 * Service for analyzing client engagement based on face detection
 */
import * as faceDetection from '@tensorflow-models/face-detection';
import { VideoAnalysisResult } from './types';

// Engagement thresholds
export const ENGAGEMENT_THRESHOLD = 0.7;
export const DISTRACTION_THRESHOLD = 0.4;

// Configuration for small video feeds from Zoom
export const MIN_FACE_SIZE = 30; // Minimum face size in pixels to detect
export const ZOOM_THUMBNAIL_AVG_WIDTH = 180; // Average width of Zoom thumbnails in gallery view

/**
 * Calculate how centered the face is in the frame
 * Returns a value between 0-1, where 1 is perfectly centered
 */
export const calculateFaceCenteredness = (
  face: faceDetection.Face, 
  videoElement: HTMLVideoElement
): number => {
  const box = face.box || { xMin: 0, yMin: 0, width: 0, height: 0, xMax: 0, yMax: 0 };
  
  // Calculate the center of the face
  const faceCenterX = box.xMin + box.width / 2;
  const faceCenterY = box.yMin + box.height / 2;
  
  // Calculate the center of the video
  const videoCenterX = videoElement.videoWidth / 2;
  const videoCenterY = videoElement.videoHeight / 2;
  
  // Calculate distance from center (normalized)
  const maxDistanceX = videoElement.videoWidth / 2;
  const maxDistanceY = videoElement.videoHeight / 2;
  const distanceX = Math.abs(faceCenterX - videoCenterX) / maxDistanceX;
  const distanceY = Math.abs(faceCenterY - videoCenterY) / maxDistanceY;
  
  // Average distance (0 = center, 1 = edge)
  const avgDistance = (distanceX + distanceY) / 2;
  
  // Convert to centeredness (1 = center, 0 = edge)
  return 1 - avgDistance;
};

/**
 * Determine movement level based on face position
 */
export const determineMovement = (face: faceDetection.Face, faceRatio: number): 'none' | 'low' | 'high' => {
  // In a real implementation, we would compare current face position with previous frames
  // For this implementation, we'll use the face ratio as a heuristic
  
  if (faceRatio < 0.05) {
    // Small or distant face might indicate movement
    return 'high';
  } else if (faceRatio < 0.1) {
    return 'low';
  }
  
  return 'none';
};

/**
 * Determine client status based on video analysis
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
 * Fallback to pseudo-random analysis when face detection fails
 */
export const fallbackAnalysis = (videoElement: HTMLVideoElement): VideoAnalysisResult => {
  // For demo purposes, we're using a simulation
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
