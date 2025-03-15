
/**
 * Lazy loader for TensorFlow.js and associated models
 * Only loads these heavy dependencies when explicitly requested
 */

// Track loading state to avoid duplicate loading
let tensorflowLoading = false;
let tensorflowLoaded = false;

// Export a function to check if TensorFlow is loaded
export const isTensorFlowLoaded = (): boolean => {
  return tensorflowLoaded;
};

// Load TensorFlow.js and models on demand
export const loadTensorFlow = async (): Promise<void> => {
  // Prevent multiple simultaneous loading attempts
  if (tensorflowLoading || tensorflowLoaded) {
    return;
  }
  
  tensorflowLoading = true;
  
  try {
    console.log('Loading TensorFlow.js and face detection models...');
    
    // Dynamic imports to prevent loading at startup
    const tf = await import('@tensorflow/tfjs');
    await tf.ready();
    console.log('TensorFlow.js loaded successfully');
    
    // Successfully loaded
    tensorflowLoaded = true;
    tensorflowLoading = false;
  } catch (error) {
    console.error('Error loading TensorFlow.js:', error);
    tensorflowLoading = false;
    throw error;
  }
};
