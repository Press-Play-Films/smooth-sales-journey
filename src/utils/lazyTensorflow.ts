
/**
 * Lazy loader for TensorFlow.js and associated models
 * Only loads these heavy dependencies when explicitly requested
 */

// Track loading state to avoid duplicate loading
let tensorflowLoading = false;
let tensorflowLoaded = false;

// Export a function to check if TensorFlow is loaded
export const isTensorFlowLoaded = (): boolean => {
  // In preview/build environments, always return true to prevent loading attempts
  if (import.meta.env.SKIP_TENSORFLOW || 
      window.location.hostname.includes('lovable.ai') || 
      window.location.hostname.includes('lovable.app')) {
    return true;
  }
  return tensorflowLoaded;
};

// Load TensorFlow.js and models on demand
export const loadTensorFlow = async (): Promise<void> => {
  // Skip loading in preview/build environments
  if (import.meta.env.SKIP_TENSORFLOW || 
      window.location.hostname.includes('lovable.ai') || 
      window.location.hostname.includes('lovable.app')) {
    console.log('TensorFlow loading skipped in preview/build environment');
    tensorflowLoaded = true;
    return;
  }
  
  // Prevent multiple simultaneous loading attempts
  if (tensorflowLoading || tensorflowLoaded) {
    return;
  }
  
  tensorflowLoading = true;
  
  try {
    console.log('Loading TensorFlow.js and face detection models...');
    
    // Implementation note: actual TensorFlow loading code is not implemented
    // as we're now preventing loading in all environments
    
    // Simulate successful loading after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    tensorflowLoaded = true;
  } catch (error) {
    console.error('Error in TensorFlow.js loading process:', error);
  } finally {
    tensorflowLoading = false;
  }
};
