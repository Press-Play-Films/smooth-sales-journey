
/**
 * Service for detecting faces in video frames
 */
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';

// Face detection model instance
let faceDetector: faceDetection.FaceDetector | null = null;

/**
 * Initialize the face detection model
 * Optimized for small video feeds like Zoom thumbnails
 */
export const initializeFaceDetection = async (): Promise<faceDetection.FaceDetector | null> => {
  if (!faceDetector) {
    try {
      await tf.ready();
      // Using SSD MobileNet model - optimized for small faces and faster performance
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: 'tfjs', // Use TensorFlow.js runtime
        modelType: 'short', // Use lightweight model for better performance
        maxFaces: 1, // Optimize for single face detection in thumbnails
      } as const;
      
      faceDetector = await faceDetection.createDetector(model, detectorConfig);
      console.log('Face detection model loaded successfully');
    } catch (error) {
      console.error('Error initializing face detection:', error);
    }
  }
  return faceDetector;
};

/**
 * Detect faces in a video element
 * @param videoElement The video element to analyze
 * @returns Array of detected faces or empty array if none found
 */
export const detectFaces = async (
  videoElement: HTMLVideoElement
): Promise<faceDetection.Face[]> => {
  // Ensure face detector is initialized
  const detector = await initializeFaceDetection();
  if (!detector) {
    console.error('Face detector not available');
    return [];
  }
  
  try {
    // Detect faces in the video frame
    const faces = await detector.estimateFaces(videoElement);
    return faces;
  } catch (error) {
    console.error('Error detecting faces:', error);
    return [];
  }
};

/**
 * Check if eyes are visible based on face landmarks
 */
export const checkEyesVisible = (face: faceDetection.Face): boolean => {
  // If keypoints are available, use them to check eye visibility
  if (face.keypoints && face.keypoints.length >= 6) {
    // MediaPipe face detector provides these keypoints
    const leftEye = face.keypoints.find(point => point.name === 'leftEye');
    const rightEye = face.keypoints.find(point => point.name === 'rightEye');
    
    // If both eyes are detected with reasonable confidence
    if (leftEye && rightEye) {
      return true;
    }
  }
  
  // Fallback: use a heuristic approach based on face orientation
  if (face.box) {
    // If face is detected and appears to be facing forward
    // (Assumption: if the face is reasonably square, it's likely facing forward)
    const aspectRatio = face.box.width / face.box.height;
    return aspectRatio > 0.7 && aspectRatio < 1.3;
  }
  
  return false;
};
