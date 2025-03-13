
/**
 * Utilities for face detection parameters
 */

// Analysis configuration
export const ANALYSIS_INTERVAL = 2000; // How often to analyze frames (ms)

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
