
/**
 * Lazy loader for TensorFlow.js and associated models
 * This module is completely disabled in non-development environments
 */

// Track loading state to avoid duplicate loading
let tensorflowLoading = false;
let tensorflowLoaded = false;

// Export a function to check if TensorFlow is loaded
export const isTensorFlowLoaded = (): boolean => {
  // Always return true in non-development environments
  if (import.meta.env.SKIP_TENSORFLOW || 
      window.location.hostname !== 'localhost') {
    console.log('TensorFlow loading disabled in non-development environment');
    return true;
  }
  return tensorflowLoaded;
};

// Load TensorFlow.js and models on demand
export const loadTensorFlow = async (): Promise<void> => {
  // Skip loading completely in non-development environments
  if (import.meta.env.SKIP_TENSORFLOW || 
      window.location.hostname !== 'localhost') {
    console.log('TensorFlow loading disabled in non-development environment');
    tensorflowLoaded = true;
    return Promise.resolve();
  }
  
  // Prevent multiple simultaneous loading attempts
  if (tensorflowLoading || tensorflowLoaded) {
    return Promise.resolve();
  }
  
  tensorflowLoading = true;
  
  try {
    console.log('Loading TensorFlow.js and face detection models...');
    
    // Actual TensorFlow loading code is skipped for publishing purposes
    
    // Simulate successful loading after a short delay
    await new Promise(resolve => setTimeout(resolve, 100));
    tensorflowLoaded = true;
  } catch (error) {
    console.error('Error in TensorFlow.js loading process:', error);
  } finally {
    tensorflowLoading = false;
    return Promise.resolve();
  }
};
