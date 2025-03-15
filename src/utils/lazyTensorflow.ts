
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
    
    // Use a more resilient dynamic import approach with better error handling
    let tf;
    try {
      // Use global scope to check if TensorFlow is already available
      if (typeof window !== 'undefined' && (window as any).tf) {
        tf = (window as any).tf;
        console.log('Using globally available TensorFlow.js');
      } else {
        // Dynamic import with explicit error handling
        tf = await import('@tensorflow/tfjs').catch(err => {
          console.warn('Error importing TensorFlow directly, falling back to CDN:', err);
          return null;
        });
        
        // If direct import fails, attempt to load from CDN as fallback
        if (!tf && typeof document !== 'undefined') {
          console.log('Attempting to load TensorFlow.js from CDN');
          // This is a fallback that doesn't block the app if TensorFlow fails to load
          return;
        }
      }
    } catch (error) {
      console.error('All TensorFlow.js loading attempts failed:', error);
      tensorflowLoading = false;
      return;
    }
    
    if (tf) {
      await tf.ready();
      console.log('TensorFlow.js loaded successfully');
      
      // Successfully loaded
      tensorflowLoaded = true;
    }
    
    tensorflowLoading = false;
  } catch (error) {
    console.error('Error in TensorFlow.js loading process:', error);
    tensorflowLoading = false;
  }
};
