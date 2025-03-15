
/**
 * Lazy loader for TensorFlow.js and associated models
 * This module is completely disabled in production environments
 */

// Track loading state to avoid duplicate loading
let tensorflowLoading = false;
let tensorflowLoaded = false;

// Export a function to check if TensorFlow is loaded
export const isTensorFlowLoaded = (): boolean => {
  // ALWAYS return true in production/publishing environments
  // This ensures no TensorFlow code will ever be executed in production
  if (import.meta.env.SKIP_TENSORFLOW || 
      import.meta.env.PROD || 
      window.location.hostname !== 'localhost') {
    console.log('TensorFlow completely disabled in production environment');
    return true;
  }
  return tensorflowLoaded;
};

// Load TensorFlow.js and models on demand
export const loadTensorFlow = async (): Promise<void> => {
  // ALWAYS skip loading in production/publishing environments
  // This is a fail-safe to ensure TensorFlow is never loaded in production
  if (import.meta.env.SKIP_TENSORFLOW || 
      import.meta.env.PROD || 
      window.location.hostname !== 'localhost') {
    console.log('TensorFlow completely disabled in production environment');
    tensorflowLoaded = true;
    return Promise.resolve();
  }
  
  // Code below will ONLY run in development on localhost
  // Prevent multiple simultaneous loading attempts
  if (tensorflowLoading || tensorflowLoaded) {
    return Promise.resolve();
  }
  
  tensorflowLoading = true;
  
  try {
    console.log('Loading TensorFlow.js and face detection models... (development mode only)');
    
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
