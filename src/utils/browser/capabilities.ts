
/**
 * Browser capabilities detection utilities
 */
import { isBrowser } from './core';

// Check for WebGL support
export const checkWebGLSupport = (): boolean => {
  if (!isBrowser) return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Check for canvas support
export const checkCanvasSupport = (): boolean => {
  if (!isBrowser) return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  } catch (e) {
    return false;
  }
};

// Check for touch device
export const isTouchDevice = (): boolean => {
  if (!isBrowser) return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - MSMaxTouchPoints is not in the standard type definitions
    navigator.msMaxTouchPoints > 0
  );
};
