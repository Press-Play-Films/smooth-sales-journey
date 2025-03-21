
// Mock TensorFlow lazy loading 
// This prevents actual TensorFlow from loading in preview environments

// Flag to track loading status
let tfLoaded = false;
let loadPromise: Promise<void> | null = null;

export const isTensorFlowLoaded = () => {
  return tfLoaded;
};

// Mock loadTensorFlow function
export const loadTensorFlow = async () => {
  // Do not attempt to load TensorFlow in preview or lovable environments
  if (window.location.hostname.includes('lovable.ai') || 
      window.location.hostname.includes('lovable.app') ||
      window.location.hostname.includes('lovableproject.com')) {
    console.log('Skipping TensorFlow loading in preview environment');
    tfLoaded = true;
    return Promise.resolve();
  }
  
  // Use a shared loading promise to prevent multiple loads
  if (loadPromise) {
    return loadPromise;
  }
  
  loadPromise = new Promise<void>((resolve) => {
    // Simulate successful loading without actually loading TensorFlow
    console.log('Simulating TensorFlow loading...');
    
    // Simulate a delay to mimic loading
    setTimeout(() => {
      tfLoaded = true;
      console.log('TensorFlow loading simulation complete');
      resolve();
    }, 500);
  });
  
  return loadPromise;
};

// Export a fake TensorFlow object to prevent errors
export const getFakeTensorFlow = () => {
  return {
    ready: () => Promise.resolve(),
    dispose: () => {},
    browser: {
      fromPixels: () => ({ dispose: () => {} })
    }
  };
};
