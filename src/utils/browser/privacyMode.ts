
/**
 * Utilities for detecting browser privacy/incognito mode
 */
import { isBrowser } from './core';

// Define interface for RequestFileSystem
interface RequestFileSystemFunction {
  (type: number, size: number, 
   successCallback: () => void, 
   errorCallback?: (error: Error) => void): void;
}

// Check if browser is in private/incognito mode
export const isPrivateMode = async (): Promise<boolean> => {
  if (!isBrowser) return false;
  
  return new Promise((resolve) => {
    try {
      // Try to use localStorage as a test
      const testKey = 'test-private-mode';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      
      // If we get here, localStorage works, but let's check quota
      // Define the TEMPORARY constant value
      const TEMPORARY = 0;
      
      // Get the RequestFileSystem API with proper type assertion
      const fs = (window as any).RequestFileSystem || (window as any).webkitRequestFileSystem as RequestFileSystemFunction | undefined;
      
      if (!fs) {
        // Can't use this method, assume not private
        resolve(false);
        return;
      }
      
      // Try to allocate 1MB of storage - often restricted in private mode
      fs(TEMPORARY, 1024 * 1024, 
        () => resolve(false),  // Storage quota allowed - not private mode
        () => resolve(true)    // Storage quota denied - likely private mode
      );
    } catch (e) {
      // If localStorage fails, likely in private mode
      resolve(true);
    }
  });
};
